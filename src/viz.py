#!/usr/bin/env python
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import numpy as np
import itertools
import json
import utils
from modules.czml import czml
from projectile import Projectile


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route("/<path:path>")
def serve_static(path):
    print("Serving static file: %s" % path)
    return app.send_static_file(path)


@app.route("/")
def home():
    runs = range(1, 101)
    return render_template('home.html',
                           runs=runs)


@app.route("/mc<int:num>")
def monte_carlo_data(num):
    global doc

    doc = czml.CZML()
    packet1 = czml.CZMLPacket(id='document', version='1.0')
    doc.packets.append(packet1)

    clock_packet = czml.CZMLPacket(id="document",
                                   name="CZML Path",
                                   version="1.0",
                                   clock={"interval": "2000-01-01T11:58:55Z/2000-01-01T23:58:55Z",
                                          "currentTime:":"2000-01-01T11:58:55Z",
                                          "multiplier": 1})

    glider_packet = czml.CZMLPacket(id="path",
                                    name="path with GPS flight data",
                                    availability="2000-01-01T11:58:55Z/2000-01-01T23:58:55Z")

    p = Projectile(4000, 45)

    color_pack = czml.Color(rgba=utils.hex2rgb(p.color))
    polylineOutline_pack = czml.PolylineOutline(color=color_pack)
    material_pack = czml.Material(polylineOutline=polylineOutline_pack)
    path_pack = czml.Path(material=material_pack,
                          width=8,
                          leadTime=0,
                          show=True)
    glider_packet.path = path_pack

    position_pack = czml.Position(epoch="2000-01-01T11:58:55Z")

    tof = np.ceil(p.timeOfFlight())
    time = np.arange(0, tof, 0.1)
    x, y = p.pos(time)
    y = (20925646.3255*.3048) + y
    z = np.zeros(time.size)

    vx, vy = p.vel(time)

    pos = zip(time, x, y, z)

    position_pack.cartesian = list(itertools.chain.from_iterable(pos))

    glider_packet.position = position_pack

    doc.append(clock_packet)
    doc.append(glider_packet)

    p.make_plot(time, y, "Alt vs Time", "Time", "Alt")

    speed = list(map(np.linalg.norm, zip(vx, vy)))
    p.make_plot(time, speed, "Speed vs Time", "Time", "Speed")

    return render_template('viz.html',
                           plots=p.plots)


@socketio.on('loadCesiumData')
def handle_loadCesiumData():
    emit('loadCesiumData', doc.dumps())


@socketio.on('loadMessageData')
def handle_loadMessageData(mc_num):

    msgData = [{"id": 0, "name": "MT-230", "from": "CND", "to": "WCS", "time": 3.0},
               {"id": 1, "name": "MT-071", "from": "WCS", "to": "CND", "time": 5.0}]

    emit('loadMessageData', json.dumps(msgData))


if __name__ == '__main__':

    socketio.run(app, host='0.0.0.0', port=8081, debug=True)
