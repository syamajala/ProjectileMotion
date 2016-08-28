import numpy as np
import matplotlib.pyplot as plt

G = 9.8

class Projectile:

    def __init__(self, v0, theta):

        self.v0 = v0
        theta = np.radians(theta)
        self.ct = np.cos(theta)
        self.st = np.sin(theta)
        self.tof = None
        self.h = None

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

        if self.tof == None:
            self.tof = 2*self.v0*self.st/G

        return self.tof

    def height(self):

        if self.h == None:
            self.h = (self.v0**2*self.st**2)/(2*G)

        return self.h

def test():
    p = Projectile(3000, 65)
    tof = np.ceil(p.timeOfFlight())
    time = np.arange(0, tof, 0.1)
    x, y = p.pos(time)
    z = np.zeros(time.size)
    x = (20925646.3255*.3048) - x
    y = y*.3048
    plt.clf()

    plt.subplot(2, 1, 1)
    plt.plot(time, x)
    plt.xlabel('time')
    plt.ylabel('x')

    plt.subplot(2, 1, 2)
    plt.plot(time, y)
    plt.xlabel('time')
    plt.ylabel('y')

    plt.savefig("proj.png")
