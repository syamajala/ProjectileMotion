#!/usr/bin/env python
from flask import Flask, render_template, session
from flask_socketio import SocketIO, emit
from flask_session import Session
from bokeh import palettes
from plotly.offline import plot
from plotly import tools
import plotly.graph_objs as go
import numpy as np
import json
import itertools
import utils
from modules.czml import czml
from projectile import Projectile


app = Flask(__name__)
socketio = SocketIO(app)


def n(rows, i, j):
    return (rows-1)*i+j-(rows-1)


@app.route("/<path:path>")
def serve_static(path):
    print("Serving static file: %s" % path)
    return app.send_static_file(path)


@app.route("/")
def home():
    cols = 6
    rows = 21

    mcs = itertools.product(range(1, cols), range(1, rows))
    mcs = itertools.starmap(lambda i, j: "<a href='/mc%d'>MC%d</a>" % (n(rows, i, j), n(rows, i, j)), mcs)

    fig = tools.make_subplots(rows=rows-1, cols=cols-1, subplot_titles=list(mcs))

    tofs = []
    xs = []
    ys = []

    for i, j in itertools.product(range(1, cols), range(1, rows)):
        idx = n(rows, i, j)

        vel = np.random.uniform(1, 10000)
        angle = np.random.uniform(1, 90)
        p = Projectile(vel, angle)
        session[idx] = p

        tof = np.ceil(p.timeOfFlight())
        tofs.append(tof)
        time = np.arange(0, tof)
        x, y = p.pos(time)
        xs.append(x)
        ys.append(y)

        plt = go.Scatter(x=time, y=y, mode='lines')
        fig.append_trace(plt, j, i)

        height, time = p.height()
        plt = go.Scatter(x=[time, time], y=[0, height], mode='lines', text='Maximum Height')
        fig.append_trace(plt, j, i)

        fig['layout']['xaxis%d' % idx].update(title="Time", fixedrange=True)
        fig['layout']['yaxis%d' % idx].update(title="Position", fixedrange=True)

    fig['layout'].update(height=4000, width=1800, showlegend=False,
                         hovermode="closest")

    plots = plot(fig, output_type='div', include_plotlyjs=False, show_link=False)

    tof = max(tofs)
    time = np.arange(tof)
    pos = zip(xs, ys)
    trajs = itertools.starmap(lambda idx, pos: go.Scatter3d(x=time, y=pos[0], z=pos[1], text='MC%d' % idx,
                                                            mode='lines', showlegend=False),
                              enumerate(pos))

    fig = {'data': list(trajs), 'layout': go.Layout(title='Projectile Motion', height=500)}
    trajs = plot(fig, output_type='div', include_plotlyjs=False, show_link=False)

    return render_template('home.html',
                           trajs=trajs,
                           plots=plots)


def point_pkt(pos):
    time, x, y, z, pid, color = pos
    start = utils.build_start("2000-01-01T11:58:55Z", time)
    interval = utils.build_interval(start, session['tof'])

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

    p = session[num]
    tof = np.ceil(p.timeOfFlight())
    time = np.arange(0, tof, 0.1)
    x, y = p.pos(time)
    y = (20925646.3255*.3048) + y
    z = np.zeros(time.size)

    session['tof'] = tof
    vx, vy = p.vel(time)

    speed = list(map(np.linalg.norm, zip(vx, vy)))
    p.make_plot(time, speed, title="Speed vs Time", xaxis_label="Time", yaxis_label="Speed")
    p.make_plot(time, y, title="Alt vs Time", xaxis_label="Time", yaxis_label="Alt")
    p.make_plot(time, x, y-(20925646.3255*.3048), "Trajectory", "Time", "X", "Y")

    doc = czml.CZML()
    packet1 = czml.CZMLPacket(id='document', version='1.0')
    doc.packets.append(packet1)

    interval = utils.build_interval("2000-01-01T11:58:55Z", tof)

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
                                    name="Path",
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
