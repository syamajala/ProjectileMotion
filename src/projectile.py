import numpy as np
from bokeh.plotting import figure
from bokeh.embed import components
from bokeh import palettes
from bs4 import BeautifulSoup


G = 9.8


class Plot():

    def __init__(self, x, y, title, plot_id,
                 xaxis_label="", yaxis_label="", color=""):
        self.plot = figure(title=title, plot_width=600, plot_height=400)
        self.plot.line(x, y, line_color=color)
        self.plot.xaxis.axis_label = xaxis_label
        self.plot.yaxis.axis_label = yaxis_label

        self.plot_id = "plot%d" % plot_id

        script, div = components(self.plot)
        self.script = script

        soup = BeautifulSoup(div, 'lxml')
        bk_root = soup.find('div', class_='bk-root')
        bk_root['id'] = self.plot_id
        bk_root['style'] = "display: none"

        if self.plot_id == 'plot0':
            bk_root['style'] = "display: block"
        self.div = str(bk_root)

        self.title = title


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

    def make_plot(self, x, y, title, xaxis_label="", yaxis_label=""):
        p = Plot(x, y,
                 title, self.plot_id,
                 xaxis_label, yaxis_label,
                 color=self.color)
        self.plot_id += 1
        self.plots[p.plot_id] = p


def test():
    p = Projectile(3000, 65)
    tof = np.ceil(p.timeOfFlight())
    time = np.arange(0, tof, 0.1)
    x, y = p.pos(time)
    z = np.zeros(time.size)
    displacement = list(map(np.linalg.norm, zip(x, y, z)))
    plot = figure(title="Displacement vs Time", plot_width=600, plot_height=400)
    plot.line(time, displacement)
    plot.xaxis.axis_label = 'Time'
    plot.yaxis.axis_label = 'Displacement'
    script, div = components(plot)
