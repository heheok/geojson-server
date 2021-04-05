# GeoJSON express Server

This is a simple express project with two responsibilities.

1.  Parsing a bulk JSON file that has latitudes and longitudes as array of objects, creating geoJSON files with this data on the filesystem.

2.  Serving previously created geoJSON files from its filesystem. For the sake of diversification, it accepts a query string parameter (cnt) and reads the related geoJSON from its filesystem, and serve it.
