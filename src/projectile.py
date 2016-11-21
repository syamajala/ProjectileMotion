import numpy as np
import plotly.graph_objs as go
from bokeh import palettes
from plotly.offline import plot
from bs4 import BeautifulSoup


G = 9.8


class Plot():

    def __init__(self, x, y, z=None, title="", plot_id=0,
                 xaxis_label="", yaxis_label="", zaxis_label="", color=""):

        self.title = title
        self.plot_id = "plot%d" % plot_id

        layout = go.Layout(title=title,
                           xaxis={'title': xaxis_label},
                           yaxis={'title': yaxis_label},
                           margin={'l': 50, 'r': 0, 't': 25, 'b': 40},
                           showlegend=True,
                           legend={'x': 0.02, 'y': 1})

        if z is not None:
            line = go.Scatter3d(x=x, y=y, z=z, line={'color': color})
        else:
            line = go.Scatter(x=x, y=y, line={'color': color})

        fig = {'data': [line], 'layout': layout}
        div = plot(fig, output_type='div', include_plotlyjs=False, show_link=False)

        soup = BeautifulSoup(div, 'lxml')
        soup.html.unwrap()
        soup.body.unwrap()
        pdiv = soup.new_tag('div', id=self.plot_id, )
        pdiv['class'] = 'plots'
        pdiv['style'] = 'visibility: hidden;'

        if self.plot_id == 'plot0':
            pdiv['style'] = 'visibility: visible;'

        pdiv.insert(1, soup)
        self.div = str(pdiv)


class Projectile():

    def __init__(self, v0, theta, color=""):

        self.v0 = v0
        theta = np.radians(theta)
        self.ct = np.cos(theta)
        self.st = np.sin(theta)
        self.tof = None
        self.h = None

        self.color = palettes.Set3_12[0]

        self.plot_id = 0
        self.plots = {}

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

        return self.h

    def make_plot(self, x, y, z=None, title="", xaxis_label="", yaxis_label="", zaxis_label=""):
        p = Plot(x, y, z=z,
                 title=title, plot_id=self.plot_id,
                 xaxis_label=xaxis_label, yaxis_label=yaxis_label, zaxis_label=zaxis_label,
                 color=self.color)
        self.plot_id += 1
        self.plots[p.plot_id] = p
