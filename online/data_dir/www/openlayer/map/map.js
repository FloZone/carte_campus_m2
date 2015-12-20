/* MAP */


var mapProjection = 'EPSG:3857';


var mapLayers = [ new ol.layer.Image({
    source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://localhost:8080/geoserver/sig/wms',
        params: { 
            LAYERS: 'sig:campus',
            STYLES: ''
        }
    })
})];


var map = new ol.Map({
    layers: mapLayers,
    target: 'map',
    overlays: [popupOverlay],
    view: new ol.View({
        center: ol.proj.transform([1.933355, 47.844930], 'EPSG:4326', mapProjection),
        rotation: - Math.PI / 6.8,
        zoom: 15
    })
});


// lorsque l'on click sur la map
function mapClick(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      });
  if (feature) {
    //Cas d'un clic sur un marker (départ/arrivé)
    var coord = feature.getGeometry().getCoordinates();
    popupPop(null, feature.get('name'), coord);
  } else {
    // récupérer les infos de la carte
    var view = map.getView();
    var viewResolution = view.getResolution();
    var source = mapLayers[0].getSource();
    // récupérer la position
    var coordinate = evt.coordinate;

    // récupérer l'url
    var url = source.getGetFeatureInfoUrl(
        coordinate,
        viewResolution,
        view.getProjection(),
        {'INFO_FORMAT': 'application/json'}
    );

    $.ajax({
        url: url,
        datatype: 'json',
        success: function(json) {
            var output = "";
            var displayPopup = false;
            var type, name;

            // pour chaque info récupérée
            json.features.forEach(function(feature) {

                // s'il y a un nom, l'afficher
                if(feature.properties.name != null) {
                    displayPopup = true;

                    type = feature.properties.type;
                    name = feature.properties.name;
                }
            });

            if(displayPopup) {
                popupPop(type, name, coordinate);
            }
            else {
                popupHide();
            }
        }
    });
    }
};
