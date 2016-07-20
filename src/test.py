from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
from czml import czml

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route("/")
def hello():
    return render_template('hello.html')

@socketio.on('connect')
def handle_connect():
    doc = czml.CZML()
    packet1 = czml.CZMLPacket(id='document', version='1.0')
    doc.packets.append(packet1)

    packet2 = czml.CZMLPacket(id='billboard')
    bb = czml.Billboard(scale=0.05, show=True)
    bb.image = "http://dev.brokensymlink.net/images/img.jpg"
    bb.color = {'rgba': [0, 0, 0, 255]}
    packet2.billboard = bb
    pos = czml.Position(cartesian=[1216361.4096947117, -4736253.175342511, 4081267.4865667094])
    packet2.position = pos
    doc.packets.append(packet2)

    emit('loadData', list(doc.data()))

if __name__ == '__main__':
    socketio.run(app, port=8081, debug=True)
