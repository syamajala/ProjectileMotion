import struct
import pyproj


ecef = pyproj.Proj(proj='geocent', ellps='WGS84', datum='WGS84')
lla = pyproj.Proj(proj='latlong', ellps='WGS84', datum='WGS84')


def hex2rgb(hexstr, alpha=255):
    # return struct.unpack('BBB', hexstr[1:].decode('hex'))
    return struct.unpack('BBB', bytes.fromhex(hexstr[1:])) + (alpha, )


def ecef2lla(x, y, z):
    return pyproj.transform(ecef, lla, x, y, z, radians=True)


def lla2ecef(lon, lat, alt):
    return pyproj.transform(lla, ecef, lon, lat, alt, radians=True)
