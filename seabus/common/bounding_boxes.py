# bounding coords of seabus terminals and boat storage area
from collections import namedtuple
from shapely.geometry import Polygon

WATERFRONT = [
    (49.287215, -123.109222),
    (49.287107, -123.109640),
    (49.286701, -123.109305),
    (49.286815, -123.108951)
]

LONSDALE = [
    (49.309933, -123.083936),
    (49.309702, -123.084213),
    (49.309440, -123.083620),
    (49.309704, -123.083403)
]

PARKING = [
    (49.311013, -123.084720),
    (49.310844, -123.084304),
    (49.310482, -123.084663),
    (49.310668, -123.085090)
]

bounds = {}
bounds['WATERFRONT'] = Polygon(WATERFRONT)
bounds['LONSDALE'] = Polygon(LONSDALE)
bounds['PARKING'] = Polygon(PARKING)
