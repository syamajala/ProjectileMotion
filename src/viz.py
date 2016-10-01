#!/usr/bin/env python
from flask import Flask, render_template, session
from flask_socketio import SocketIO, emit
from flask.ext.session import Session
from bokeh import palettes
import numpy as np
import json
import itertools
import utils
import datetime
import dateutil.parser
from modules.czml import czml
from projectile import Projectile


app = Flask(__name__)
socketio = SocketIO(app)


def build_start(start, seconds):
    begin = dateutil.parser.parse(start)
    delta = datetime.timedelta(seconds=seconds)
    new_start = (begin + delta).isoformat()[:-6]

    return new_start+'Z'


def build_interval(start, seconds):
    begin = dateutil.parser.parse(start)
    delta = datetime.timedelta(seconds=seconds)
    end = (begin + delta).isoformat()[:-6]

    time = start+'/'+end+'Z'
    return time


@app.route("/<path:path>")
def serve_static(path):
    print("Serving static file: %s" % path)
    return app.send_static_file(path)


@app.route("/")
def home():
    runs = range(1, 101)
    return render_template('home.html',
                           runs=runs)


def point_pkt(pos):
    time, x, y, z, pid, color = pos
    start = build_start("2000-01-01T11:58:55Z", time)
    interval = build_interval(start, session['tof'])

    glider_packet = czml.CZMLPacket(id="point" + str(pid),
                                    name="point" + str(pid),
                                    availability=interval)

    position_pack = czml.Position(epoch="2000-01-01T11:58:55Z")
    position_pack.cartesian = [x, y, z]
    glider_packet.position = position_pack

    color_pack = czml.Color(rgba=color)
    point = czml.Point(color=color_pack,
                       show=True,
                       pixelSize=5)
    glider_packet.point = point

    return glider_packet


@app.route("/mc<int:num>")
def monte_carlo_data(num):

    p = Projectile(4000, 45)
    tof = np.ceil(p.timeOfFlight())
    time = np.arange(0, tof, 0.1)
    x, y = p.pos(time)
    y = (20925646.3255*.3048) + y
    z = np.zeros(time.size)

    session['tof'] = tof
    vx, vy = p.vel(time)

    p.make_plot(time, y, "Alt vs Time", "Time", "Alt")

    speed = list(map(np.linalg.norm, zip(vx, vy)))
    p.make_plot(time, speed, "Speed vs Time", "Time", "Speed")

    doc = czml.CZML()
    packet1 = czml.CZMLPacket(id='document', version='1.0')
    doc.packets.append(packet1)

    interval = build_interval("2000-01-01T11:58:55Z", tof)

    clock_packet = czml.CZMLPacket(id="document",
                                   name="CZML Path",
                                   version="1.0",
                                   clock={"interval": interval,
                                          "currentTime:": "2000-01-01T11:58:50Z",
                                          "multiplier": 1,
                                          "range": "CLAMPED"})
    color = utils.hex2rgb(p.color)
    pos = zip(time, x, y, z, range(0, len(x)), [color]*len(x))
    pkts = list(map(point_pkt, pos))

    doc.append(clock_packet)
    for pkt in pkts:
        doc.append(pkt)

    glider_packet = czml.CZMLPacket(id="path",
                                    name="path",
                                    availability=interval)

    color_pack = czml.Color(rgba=utils.hex2rgb(palettes.Set3_12[3]))
    polylineOutline_pack = czml.PolylineOutline(color=color_pack)
    material_pack = czml.Material(polylineOutline=polylineOutline_pack)
    path_pack = czml.Path(material=material_pack,
                          width=5,
                          leadTime=0,
                          show=True)
    glider_packet.path = path_pack

    position_pack = czml.Position(epoch="2000-01-01T11:58:55Z")
    pos = zip(time, x, y, z)

    position_pack.cartesian = list(itertools.chain.from_iterable(pos))
    glider_packet.position = position_pack

    doc.append(glider_packet)

    session['doc'] = doc

    return render_template('viz.html',
                           plots=p.plots)


@socketio.on('loadCesiumData')
def handle_loadCesiumData():
    doc = session.get('doc', None)
    emit('loadCesiumData', doc.dumps())


@socketio.on('loadMessageData')
def handle_loadMessageData(mc_num):

    msgData = [{"id": 0, "name": "MT-230", "from": "CND", "to": "WCS", "time": 3.0},
               {"id": 1, "name": "MT-071", "from": "WCS", "to": "CND", "time": 5.0}]

    emit('loadMessageData', json.dumps(msgData))


if __name__ == '__main__':
    app.config['SESSION_TYPE'] = 'redis'
    app.config['SECRET_KEY'] = 'mysecretkey1'
    sess = Session()
    sess.init_app(app)

    socketio.run(app, host='0.0.0.0', port=8081, debug=True)
