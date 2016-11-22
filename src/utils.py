import struct
import pyproj
import datetime
import dateutil.parser


ecef = pyproj.Proj(proj='geocent', ellps='WGS84', datum='WGS84')
lla = pyproj.Proj(proj='latlong', ellps='WGS84', datum='WGS84')


def hex2rgb(hexstr, alpha=255):
    # return struct.unpack('BBB', hexstr[1:].decode('hex'))
    return struct.unpack('BBB', bytes.fromhex(hexstr[1:])) + (alpha, )


def ecef2lla(x, y, z):
    return pyproj.transform(ecef, lla, x, y, z, radians=True)


def lla2ecef(lon, lat, alt):
    return pyproj.transform(lla, ecef, lon, lat, alt, radians=True)


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
