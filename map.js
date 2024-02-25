var map = null;

function doOnload() {
  map = new MyMap()
}

var MyMap = function () {
  hikingFeatures = [];
  bicycleFeatures = [];

  this.addPolyline = function(polyline, color, description, isHiking)
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

    if (isHiking == true)
      hikingFeatures.push(routeFeature)
    else
      bicycleFeatures.push(routeFeature)
  }

  drawPolylines(this)

  var vectorHikingLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: hikingFeatures
    }),
  });

  const hikingMap = new ol.Map({
    target: 'hikingMap',
    view: new ol.View(),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorHikingLayer,
    ]
  });

  hikingMap.getView().fit(
      vectorHikingLayer.getSource().getExtent(), hikingMap.getSize(),
      {padding: [130, 5, 5, 5]});

  var vectorBicycleLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: bicycleFeatures
    }),
  });

  const bicycleMap = new ol.Map({
    target: 'bicycleMap',
    view: new ol.View(),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorBicycleLayer,
    ],
  });

  bicycleMap.getView().fit(
      vectorBicycleLayer.getSource().getExtent(), bicycleMap.getSize(),
      {padding: [130, 5, 5, 5]});
}
