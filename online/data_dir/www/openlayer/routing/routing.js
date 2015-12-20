var routingLayerVector = new ol.layer.Vector({source: new ol.source.Vector()});
map.addLayer(routingLayerVector);

var routingLayerVectorStartMarker = new ol.layer.Vector({source: new ol.source.Vector()});
map.addLayer(routingLayerVectorStartMarker);

var routingLayerVectorEndMarker = new ol.layer.Vector({source: new ol.source.Vector()});
map.addLayer(routingLayerVectorEndMarker);

//Variables pour stocker le point de départ et d'arrivé de l'itinéraire
var depart, arrivee;

//Fonction pour mettre à jour le point de départ (depuis une popup ne mettre que le premier paramètre)
function setDepart(name, latlon, dontComputedPath){
	//Affichage du nom dans l'interface
	$( "input:text[name=depart]" ).val(name);
	
	//Delete marker
	routingLayerVectorStartMarker.getSource().clear();

	//Sauvegarde la postion
	depart = latlon || popupOverlay.getPosition();
	
	if(depart && depart != "parking"){
		//Affichage d'un repère sur la map
		iconDepart = new ol.Feature({
		  geometry: new ol.geom.Point(depart),
		  name: 'Départ: ' + name,
		});

		var iconStyle = new ol.style.Style({
		  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		    anchor: [0.5, 41],
		    anchorXUnits: 'fraction',
		    anchorYUnits: 'pixels',
		    src: 'routing/greenmarker.png'
		  }))
		});
	
		iconDepart.setStyle(iconStyle);
		routingLayerVectorStartMarker.getSource().addFeature(iconDepart);

		//Si l'appel est éffectué depuis une poup, on cache la popup
		if(!latlon) popupHide();
	}

	//Calcul de la route
	if(!dontComputedPath)
		trouverRoute();
};

//Fonction pour mettre à jour le point d'arrivé (depuis une popup ne pas mettre le second paramètre)
function setArrivee(name, latlon, dontComputedPath){
	//Sauvegarde la postion
	arrivee = latlon || popupOverlay.getPosition();
	
	//Affichage du nom dans l'interface
	$( "input:text[name=arrivee]" ).val(name);
	
	//Delete marker
	routingLayerVectorEndMarker.getSource().clear();

	if(arrivee && arrivee != "parking"){
		//Affichage d'un repère sur la map
		var iconArrivee = new ol.Feature({
		  geometry: new ol.geom.Point(arrivee),
		  name: 'Arrivée: ' + name,
		});

		var iconStyle = new ol.style.Style({
		  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		    anchor: [0.5, 41],
		    anchorXUnits: 'fraction',
		    anchorYUnits: 'pixels',
		    src: 'routing/redmarker.png'
		  }))
		});

		iconArrivee.setStyle(iconStyle);
		routingLayerVectorEndMarker.getSource().addFeature(iconArrivee);
	
		//Si l'appel est éffectué depuis une poup, on cache la popup
		if(!latlon) popupHide();
	}
	
	//Calcul de la route
	if(!dontComputedPath)
		trouverRoute();
};


Number.prototype.toRad = function() {
	return this * Math.PI / 180;
}

function distanceParking(lat1, lon1, lat2, lon2) {
	return Math.sqrt((lat2-lat1)*(lat2-lat1) + (lon2-lon1)*(lon2-lon1) );
}

//Autocomplétion départ
$( "input:text[name=depart]" ).autocomplete({
	minLength: 1,
	source: searchTermRouting,
	select: function( event, ui ) {
		if(ui.item.type == "my-position"){
			setDepart(ui.item.label, geolocation.getPosition());
		}else if(ui.item.type == "parking"){
			setDepart(ui.item.label, "parking");
		}else{
			setDepart(ui.item.label, ui.item.value);
		}
		return false;
	},
	open: function(event, ui) {
            $(".ui-autocomplete").css("z-index", 10000);
        }
})

//Autocomplétion arrivée
$( "input:text[name=arrivee]" ).autocomplete({
	minLength: 1,
	source: searchTermRouting,
	select: function( event, ui ) {
		if(ui.item.type == "my-position"){
			setArrivee(ui.item.label, geolocation.getPosition());
		}else if(ui.item.type == "parking"){
			setArrivee(ui.item.label, "parking");
		}else{
			setArrivee(ui.item.label, ui.item.value);
		}
		return false;
	},
	open: function(event, ui) {
            $(".ui-autocomplete").css("z-index", 10000);
        }
})

//Fonction de recherche pour l'itinéraire
function searchTermRouting(request, callback){
	return searchTerm(request, function(data){
		data.push({label:"Ma position", type:"my-position"},{label: "Parking", type: "parking"});
		callback(data);
	});
}

// Search the nearest parking from a coord and launch the callback function
function nearestParking(lon, lat, callback){
	var url = "http://localhost:8080/geoserver/sig/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sig:search_nearest_parking&maxFeatures=1&outputFormat=application/json&viewparams=lon:" + lon + ";lat:" + lat;
	
	$.ajax({
        url: url,
        datatype: 'json',
        success: function(json){
        	callback(json.features[0].geometry.coordinates);
       	}
	});
}

//Lance le calcul d'itineraire si possible, et affiche l'itinéraire sur la map
function trouverRoute(){
	//Clear previous path
	routingLayerVector.getSource().clear();
	
	if(depart == 'parking' && arrivee != depart && arrivee){
		nearestParking(arrivee[0], arrivee[1], function(newCoord){
			setDepart($( "input:text[name=depart]" ).val(), newCoord);
		});
	}else if(arrivee == 'parking' && arrivee != depart && depart){
		nearestParking(depart[0], depart[1], function(newCoord){
			setArrivee($( "input:text[name=arrivee]" ).val(), newCoord);
		});
	}
	
	if (depart && arrivee && depart != "parking" && arrivee != "parking"){
		var nodesWay = calculItineraire(depart, arrivee);
		var feature = new ol.Feature(new ol.geom.LineString(nodesWay));
		feature.setStyle(new ol.style.Style({
				stroke : new ol.style.Stroke({
					color: "#CC0000",
					width: 2
				})
			})
		);
		routingLayerVector.getSource().addFeature(feature);
	}
}

//Inverse départ et arrivée
function retourneDestination(){
	var tempArrivee = arrivee;
	var tempArriveeName = $( "input:text[name=arrivee]" ).val();
	
	var tempDepart = depart;
	var tempDepartName = $( "input:text[name=depart]" ).val();
	
	setDepart(tempArriveeName, tempArrivee, true);
	setArrivee(tempDepartName, tempDepart, true);
}
