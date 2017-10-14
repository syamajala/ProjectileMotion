#!/usr/bin/env python
from flask import Flask, render_template, session
from flask_socketio import SocketIO, emit
from flask_session import Session
from plotly.offline import plot
from plotly import tools
import plotly.utils as plutils
import plotly.graph_objs as go
import numpy as np
import colorlover as cl
import json
import itertools
import utils
from modules.czml import czml
from projectile import Projectile
import time as tm

app = Flask(__name__)
socketio = SocketIO(app)


def n(cols, i, j):
    return (cols-1)*i+j


@app.route("/<path:path>")
def serve_static(path):
    print("Serving static file: %s" % path)
    return app.send_static_file(path)


@app.route("/")
def home():
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
    print "Loading MC%d." % num
    snum = session.get('num', -1)

    if snum == num:
        return render_template('viz.html')

    p = models[num]
    tof = np.ceil(p.timeOfFlight())
    session['tof'] = tof
    time = np.arange(0, tof, 0.1)
    x, y = p.pos(time)
    y = (20925646.3255*.3048) + y
    z = np.zeros(time.size)

    vx, vy = p.vel(time)

    speed = list(map(np.linalg.norm, zip(vx, vy)))
    p.make_dropdown_plot("Speed vs Time", time, speed, xaxis_label="Time", yaxis_label="Speed")
    p.make_dropdown_plot("Alt vs Time", time, y, xaxis_label="Time", yaxis_label="Alt")
    p.make_tab_plot("trajectory", "Trajectory", time, x, y-(20925646.3255*.3048), "Time", "X", "Y")

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
    color = utils.rgb2rgba(p.color)
    pos = zip(time, x, y, z, range(0, len(x)), [color]*len(x))
    pkts = list(map(point_pkt, pos))

    doc.append(clock_packet)
    for pkt in pkts:
        doc.append(pkt)

    glider_packet = czml.CZMLPacket(id="path",
                                    name="Path",
                                    availability=interval)

    color_pack = czml.Color(rgba=utils.rgb2rgba(cl.scales['12']['qual']['Set3'][3]))
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
    session['num'] = num

    models[num] = p
    return render_template('viz.html')


@socketio.on('loadCesiumData')
def handle_loadCesiumData():
    print "Serving cesium packets."
    doc = session.get('doc', None)
    emit('loadCesiumData', doc.dumps())


@socketio.on('loadDropdownPlots')
def handle_loadDropdownPlots():
    print "Serving dropdown plots."
    num = session.get('num', None)

    p = models[num]
    options = [{'title': plot['title'], 'div': plot['div']}
               for k, plot in p.dropdown_plots.iteritems()]
    div = options[0]['div']
    data = [{'div': plot['div'], 'data': plot['data'], 'layout': plot['layout'],
             'config': plot['config']} for k, plot in p.dropdown_plots.iteritems()]
    emit('loadDropdownPlots', json.dumps({'options': options, 'div': div, 'data': data},
                                         cls=plutils.PlotlyJSONEncoder))


@socketio.on('loadTabPlots')
def handle_loadTabPlots():
    print "Serving tab plots."
    num = session.get('num', None)

    p = models[num]
    options = [{'div': plot['div']} for k, plot in p.tab_plots.iteritems()]
    data = [{'div': plot['div'], 'data': plot['data'], 'layout': plot['layout'],
             'config': plot['config']} for k, plot in p.tab_plots.iteritems()]
    emit('loadTabPlots', json.dumps({'options': options, 'data': data, 'tab': 'trajectory'},
                                    cls=plutils.PlotlyJSONEncoder))


if __name__ == '__main__':
    app.config['SESSION_TYPE'] = 'redis'
    app.config['SECRET_KEY'] = 'mysecretkey1'
    sess = Session()
    sess.init_app(app)
    start = tm.time()
    cols = 6
    rows = 21

    mcs = itertools.product(range(1, rows), range(1, cols))
    mcs = itertools.starmap(lambda i, j: "<a href='/mc%d'>MC%d</a>" % (n(cols, i-1, j), n(cols, i-1, j)), mcs)

    fig = tools.make_subplots(rows=rows-1, cols=cols-1, subplot_titles=list(mcs), print_grid=False)

    tofs = []
    xs = []
    ys = []
    models = {}
    data = []

    for i, j in itertools.product(range(1, rows), range(1, cols)):
        idx = n(cols, i-1, j)
        vel = np.random.uniform(1, 10000)
        angle = np.random.uniform(1, 90)
        p = Projectile(vel, angle)
        models[idx] = p

        tof = np.ceil(p.timeOfFlight())
        tofs.append(tof)
        time = np.arange(0, tof)
        x, y = p.pos(time)
        xs.append(x)
        ys.append(y)
        plt = []
        plt.append(go.Scatter(x=time, y=y, mode='markers', marker=dict(size=2.0),
                              xaxis='x%d' % idx, yaxis='y%d' % idx))

        height, time = p.height()
        plt.append(go.Scatter(x=[time, time], y=[0, height], mode='lines', text='Maximum Height',
                              xaxis='x%d' % idx, yaxis='y%d' % idx))

        data.extend(plt)
        fig['layout']['xaxis%d' % idx].update(title="Time", fixedrange=True)
        fig['layout']['yaxis%d' % idx].update(title="Altitude", fixedrange=True)

    fig['layout'].update(height=4000, width=1800, showlegend=False,
                         hovermode="closest")
    fig['data'] = go.Data(data)
    test = 1
    plots = plot(fig, output_type='div', include_plotlyjs=False, show_link=False)
    tof = max(tofs)
    time = np.arange(tof)
    pos = zip(xs, ys)
    trajs = itertools.starmap(lambda idx, pos: go.Scatter3d(x=time, y=pos[0], z=pos[1], text='MC%d' % idx,
                                                            mode='lines', showlegend=False),
                              enumerate(pos))
    test = 1
    fig = {'data': list(trajs),
           'layout': go.Layout(title='Projectile Motion', height=600, width=1800,
                               margin={'l': 0, 'r': 0, 't': 25, 'b': 0},)}
    trajs = plot(fig, output_type='div', include_plotlyjs=False, show_link=False)

    print(tm.time() - start)
    socketio.run(app, host='0.0.0.0', port=8081, debug=False)
