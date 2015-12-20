 /* GEOLOCALISATION */



// récupérer la position
var geolocation = new ol.Geolocation({
    projection: map.getView().getProjection(),
    tracking: true
});


var geolocAccuracy = new ol.Feature();
geolocation.on('change:accuracyGeometry', function() {
    geolocAccuracy.setGeometry(geolocation.getAccuracyGeometry());
});


var geolocImg = null;
var geolocPosition = new ol.Feature();
geolocPosition.setStyle(
    new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({ color: '#3399CC' }),
            stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
        })
    })
);


// mettre à jour la position
geolocation.on('change:position', function() {
    var coordinates = geolocation.getPosition();
    geolocPosition.setGeometry( coordinates ? new ol.geom.Point(coordinates) : null );
});


// afficher
var geolocOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({ features: [geolocAccuracy, geolocPosition] })
});


var geolocMe = document.getElementById('geolocme');
geolocMe.addEventListener('click', function() {
    var pan = ol.animation.pan({
        duration: 1000,
        source: (map.getView().getCenter())
    });
    map.beforeRender(pan);
    map.getView().setCenter(geolocation.getPosition());
}, false);




// changement d'icone
var geolocImgPath = "geolocation/";
function geolocChangeImg(img) {
    sidebar.close();

    var newIcon = new ol.style.Style({
        image: new ol.style.Icon({
            src: geolocImgPath + img
        })
    });
    geolocPosition.setStyle(newIcon);
}

function geoLocNoImg(){
    sidebar.close();
    geolocPosition.setStyle(
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({ color: '#3399CC' }),
                stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
            })
        })
    );
}