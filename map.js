var map = null;

function doOnload() {
  map = new MyMap()
}

var MyMap = function () {
	features = [];
	
	this.addPolyline = function(polyline, color, description)
	{
		var route = new ol.format.Polyline({factor: 1e5}).readGeometry(polyline, {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'})
		var routeFeature = new ol.Feature({
			geometry: route,
			ECO_NAME: description,
		});

    style = new ol.style.Style({
      stroke: new ol.style.Stroke({
        width: 4,
        color: color,
      lineDash: [5, 10],
      })
    })
		routeFeature.setStyle(style)

		features.push(routeFeature)
	}

  drawPolylines(this)

  var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: features
    }),
  });

  var olMap = new ol.Map({
    target: 'map',
    view: new ol.View(),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer,
    ]
  });

  olMap.getView().fit(
      vectorLayer.getSource().getExtent(), olMap.getSize(),
      {padding: [130, 5, 5, 5]});

}
