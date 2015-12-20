var PolylineMyWay = [];

function remplirItineraireDestination(id){
	for(category in searchBuildingsList){
		for(j=0; j < searchBuildingsList[category].length; j++){
			if (searchBuildingsList[category][j].id == id){
				$( "input:text[name=arrivee]" ).val(searchBuildingsList[category][j].name);
				sidebar.open('itineraire');
				break;
			}
		}
	}
}

function remplirItineraireDepart(id){
	for(category in searchBuildingsList){
		for(j=0; j < searchBuildingsList[category].length; j++){
			if (searchBuildingsList[category][j].id == id){
				$( "input:text[name=depart]" ).val(searchBuildingsList[category][j].name);
				sidebar.open('itineraire');
				break;
			}
		}
	}
}

Number.prototype.toRad = function() {
	return this * Math.PI / 180;
}

function distanceParking(lat1, lon1, lat2, lon2) {
	return Math.sqrt((lat2-lat1)*(lat2-lat1) + (lon2-lon1)*(lon2-lon1) );
}

function parkingLePlusProche(latPlusProche, longPlusProche) {
	// Trouver le parking le plus proche de la variable latLong
	var parkingLePlusProcheDistanceMin;
	var distanceLePlusProche;
	var parkingLePlusProcheLngLat = null;
	for ( i=0 ; i < searchParking.length ; i++){
		distanceLePlusProche = distanceParking(latPlusProche, longPlusProche, searchParking[i].center.lat, searchParking[i].center.lng);
		if(parkingLePlusProcheLngLat == null){
			parkingLePlusProcheLngLat = searchParking[i].center;
			parkingLePlusProcheDistanceMin = distanceLePlusProche;
		}else{
			if (distanceLePlusProche < parkingLePlusProcheDistanceMin){
				parkingLePlusProcheDistanceMin = distanceLePlusProche;
				parkingLePlusProcheLngLat = searchParking[i].center;
			}
		}
	}
	return parkingLePlusProcheLngLat;
}

function trouverRoute(){
	var trouverRouteDepart = $( "input:text[name=depart]" ).val();
	var trouverRouteArrivee = $( "input:text[name=arrivee]" ).val();
	var centerDepart = ""; var centerArrivee = "";
	if (trouverRouteDepart == "Ma Position"){
		centerDepart = new L.LatLng(latLong.lng, latLong.lat);
	}
	if (trouverRouteArrivee == "Ma Position"){
		centerArrivee = new L.LatLng(latLong.lng, latLong.lat);
	}
	for(category in searchBuildingsList){
		for(j=0; j < searchBuildingsList[category].length; j++){
			if (searchBuildingsList[category][j].name == trouverRouteDepart){
				centerDepart = searchBuildingsList[category][j].center;
			}
			if (searchBuildingsList[category][j].name == trouverRouteArrivee){
				centerArrivee = searchBuildingsList[category][j].center;
			}

			if (centerArrivee != "" && trouverRouteDepart == "Parking"){
				centerDepart = parkingLePlusProche(centerArrivee.lat, centerArrivee.lng);
			}

			if (centerDepart != "" && trouverRouteArrivee == "Parking"){
				centerArrivee = parkingLePlusProche(centerDepart.lat, centerDepart.lng);
			}

			if (centerDepart != "" && centerArrivee != ""){
				break;
			}
		}
	}

	if (centerDepart == "") {
		centerDepart = whatMyService(trouverRouteDepart);
	}
	if (centerArrivee == ""){
		centerArrivee = whatMyService(trouverRouteArrivee);
	}

	if (centerDepart != "" && centerArrivee != ""){
		var nodesWay = calculItineraire({x: centerDepart.lat, y: centerDepart.lng}, {x: centerArrivee.lat, y: centerArrivee.lng})
		colorMyWay(nodesWay);
		sidebar.close();
	}
}

function whatMyService(nameOfPoint){
    var listeMyService = [];

    if(typeof localStorage != 'undefined' &&
        localStorage.getItem("service") != null) {
        listeMyService = JSON.parse(localStorage.getItem('service')).feature;
    }

    for(var j = 0; j < listeMyService.length ; j++){
    	if (listeMyService[j].nomService == nameOfPoint){
	        for(category in searchBuildingsList) {
	            for(var i = 0; i < searchBuildingsList[category].length; ++i) {
	                if (listeMyService[j].idBatiment == searchBuildingsList[category][i].id){
	                    return searchBuildingsList[category][i].center;
	                }
	            }
	        }
	    }
    }
    return "";
}

var departIcon = L.icon({
    iconUrl: 'itineraire/greenmarker.png',
  	iconAnchor: [10, 40]
});

var arriveeIcon = L.icon({
    iconUrl: 'itineraire/redmarker.png',
  	iconAnchor: [10, 40]
});

function colorMyWay(tableau){
	var latLongTabMyWay = [];
	for(var i=0; i < tableau.length; i++){
		latLongTabMyWay.push(new L.LatLng(tableau[i].y, tableau[i].x));
	}
	for(var i=0; i < PolylineMyWay.length ; i++){
		mapTot.removeLayer(PolylineMyWay[i]);
	}

	PolylineMyWay[0] = L.polyline(latLongTabMyWay, {color: 'red'});
	PolylineMyWay[0].addTo(mapTot);
	PolylineMyWay[1] =L.marker(latLongTabMyWay[0], {icon: arriveeIcon});
	PolylineMyWay[1].addTo(mapTot);
	PolylineMyWay[2] = L.marker(latLongTabMyWay[latLongTabMyWay.length -1], {icon: departIcon});
	PolylineMyWay[2].addTo(mapTot);
}

function retourneDestination(){
	var retourneDest = $( "input:text[name=depart]" ).val();
	$( "input:text[name=depart]" ).val($( "input:text[name=arrivee]" ).val());
	$( "input:text[name=arrivee]" ).val(retourneDest);
}

$.widget( "custom.catcomplete", $.ui.autocomplete, {
	_create: function() {
		this._super();
		this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
	},
	_renderMenu: function( ul, items ) {
		var that = this,
			currentCategory = "";
		$.each( items, function( index, item ) {
			var li;
			if ( item.category != currentCategory ) {
				ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
				currentCategory = item.category;
			}
			li = that._renderItemData( ul, item );
			if ( item.category ) {
				li.attr( "aria-label", item.category + " : " + item.label );
			}
		});
	}
});

$(function() {
	var data = [
		{ label: "Ma Position", category: ""},
		{ label: "Parking", category: ""}
	];

	var category = "";
	for(category in searchBuildingsList){
		for(j=0; j < searchBuildingsList[category].length; j++){
			data.push({ label: searchBuildingsList[category][j].name, category: category});
		}
	}

	 // Les services
    var listeServiceAccordion = [];
    if(typeof localStorage != 'undefined' && localStorage.getItem("service") != null) {
        listeServiceAccordion = JSON.parse(localStorage.getItem('service')).feature;
    }
    for(var j = 0; j < listeServiceAccordion.length ; j++){
    	data.push({ label: listeServiceAccordion[j].nomService, category: "Services"});
    }

	$( "#search1" ).catcomplete({
		delay: 0,
		source: data
	});

	$( "#search2" ).catcomplete({
		delay: 0,
		source: data
	});
});
