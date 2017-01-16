import json
import collections
import numpy as np
import colorlover as cl
import plotly.graph_objs as go
from plotly import utils


G = 9.8


class Plot():

    plot_id = 0

    def __init__(self, title, x, y, z=None,
                 xaxis_label="", yaxis_label="", zaxis_label="", color=""):

        self.title = title
        self.plot_id = Plot.plot_id
        Plot.plot_id += 1

        layout = go.Layout(title=title,
                           xaxis={'title': xaxis_label},
                           yaxis={'title': yaxis_label},
                           margin={'l': 50, 'r': 0, 't': 25, 'b': 40},
                           showlegend=True,
                           legend={'x': 0.02, 'y': 1})

        if z is not None:
            line = go.Scatter3d(x=x, y=y, z=z, line={'color': color}, mode='lines')
        else:
            line = go.Scatter(x=x, y=y, line={'color': color})

        data = json.dumps(line, cls=utils.PlotlyJSONEncoder)
        layout = json.dumps(layout, cls=utils.PlotlyJSONEncoder)
        config = json.dumps({'show_link': False})

        self.plot = {'title': title, 'div': 'plot%d' % self.plot_id,
                     'data': data, 'layout': layout, 'config': config}


class Projectile():

    def __init__(self, v0, theta, color=""):

        self.v0 = v0
        theta = np.radians(theta)
        self.ct = np.cos(theta)
        self.st = np.sin(theta)
        self.tof = None
        self.h = None
        self.toh = None

        self.color = cl.scales['12']['qual']['Set3'][0]

        self.plots = collections.OrderedDict()

    def pos(self, t):

        x = self.v0*t*self.ct
        y = self.v0*t*self.st - 0.5*G*t**2

        return (x, y)

    def vel(self, t):

        x = self.v0*t*self.ct
        y = self.v0*t*self.st - G*t

        return (x, y)

    def accel(self, t):

        return (0, -G)

    def timeOfFlight(self):

        if self.tof is None:
            self.tof = 2*self.v0*self.st/G

        return self.tof

    def height(self):

        if self.h is None:
            self.h = (self.v0**2*self.st**2)/(2*G)
            self.toh = self.v0*self.st/G

        return (self.h, self.toh)

    def make_plot(self, title, x, y, z=None, xaxis_label="", yaxis_label="", zaxis_label=""):
        p = Plot(title, x, y, z=z,
                 xaxis_label=xaxis_label, yaxis_label=yaxis_label, zaxis_label=zaxis_label,
                 color=self.color)

        self.plots[p.plot_id] = p.plot
