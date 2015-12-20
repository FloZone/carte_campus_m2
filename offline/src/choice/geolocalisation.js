var img = null;
var marker;
var latLong = null;


function onLocationFound(e) {
  var radius = e.accuracy;
  latLong = e.latlng;
  if (img != null){
    var myIcon = L.icon({
      iconUrl: img,
      iconAnchor:   [20, 20]
    });
    marker = L.marker(e.latlng, {icon: myIcon}).addTo(mapTot);
  }else{
    marker = L.marker(e.latlng).addTo(mapTot);
  }
  L.circle(e.latlng, radius).addTo(mapTot);
}

function myRide(ride){
  sidebar.close();
  
  img = document.getElementById(ride);
  var width = img.clientWidth;
  var height = img.clientHeight;
  var myIcon = L.icon({
    iconUrl: 'choice/'+ride,
    iconSize: [width, height],
    iconAnchor: [20, 20]
  });
  marker.setIcon(myIcon);
}

function geoLocMe(){
  if (latLong != null)
    mapTot.panTo(latLong);
}