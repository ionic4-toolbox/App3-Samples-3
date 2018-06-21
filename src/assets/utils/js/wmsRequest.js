function getData(){
    var mapExtent = [-180.0, -90.0, 180.0, 90.0];


    var layer =  new ol.layer.Tile({
                    title: 'Faculty Data',
                    type: 'data',
                    extent: mapExtent,
                    source: new ol.source.TileWMS({
                        params: { 'LAYERS': 'idesoi:Faculty', 'TILED': true, VERSION: '1.1.1' },
                        //crossOrigin: 'anonymous',
                        url: 'http://localhost:2134/geoserver/idesoi/ows'
                    })
                });

var data = new ol.source.TileWMS({
        params: { 'LAYERS': 'idesoi:Faculty', 'TILED': true, VERSION: '1.1.1' },
        //crossOrigin: 'anonymous',
        url: 'http://localhost:2134/geoserver/idesoi/ows'
    });



}