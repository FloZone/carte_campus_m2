/* POPUP */


var popupContainer = document.getElementById('popup-container');
var popupContent = document.getElementById('popup-content');
var popupCloser = document.getElementById('popup-closer');


var popupOverlay = new ol.Overlay(({
    element: popupContainer,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
}));


function popupHide() {
    popupOverlay.setPosition(undefined);
    popupCloser.blur();
}


function popupOpen(coordinate) {
	//On cherche à obtenir les services pour le batiment correspondant aux coordonées
	var url = "http://localhost:8080/geoserver/sig/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sig:services_from_coord&maxFeatures=1&outputFormat=application/json&viewparams=lon:" + coordinate[0] + ";lat:" + coordinate[1];
	$.ajax({
        url: url,
        datatype: 'json',
        success: function(json){
		var html = $('#popup-content');
		json.features.forEach(function(item){
			var item = item.properties;
			var lienService = item.url.toLowerCase();
			var lien = "";

			// si le lien existe
			if(typeof lienService != 'undefined' && lienService.length > 5) {
				// si le lien ne contient pas http:// le rajouter
				if( lienService.indexOf("http://") ) {
				    lienService = "http://" + lienService;
				}

				href = "href=\"" + lienService + "\"";
				lien = " <a " + href + "> Lien vers le service</a>";
			}

			html.append("<br>" + item.name);
			if(item.description && item.description.length > 0)
				html.append("<br>" + item.description);
			html.append("<br>" + lien);
		});
        	
		popupOverlay.setPosition(coordinate);
       	},
	error: function(){
		popupOverlay.setPosition(coordinate);
	}
	});
}

function popupPop(type, name, coordinates) {
    if(coordinates == undefined) {
        popupHide();
    }
    else {
        popupSetContent(type, name);
        popupOpen(coordinates);
    }
}


function popupSetContent(type, name) {
    var escapeName = name.replace(/'/g, "&quot;")
    var content = "<div>";
    
    //Ne pas afficher pour un marker (arrivé/départ)
    if(type){
	content += "<strong>" + type + "</strong>";
	content += "<br>";
    }
    
    content += name;

    // Afficher Service
    /*for(var i=0; i < serviceForPopUp.length; i++){
        if (serviceForPopUp[i].idBatiment == id){
            content += serviceForPopUp[i].nomService+"<br>"+serviceForPopUp[i].descriptionService+
                "<br><a href='"+serviceForPopUp[i].lienService+"'> Lien </a>";
        }
    }*/
    
    //Ne pas afficher pour un marker (arrivé/départ)
    if(type){
    	content += "<br><br>";
	// onClick -> remplir destination
	content += "<a onclick=\"setArrivee('" + escapeName + "')\">Itinéraire vers ce lieu</a>";
	content += "<br>";
	content += "<a onclick=\"setDepart('" + escapeName + "')\">Itinéraire à partir de ce lieu</a>";
	content += "</div>";
    }

    popupContent.innerHTML = content;
}


popupCloser.onclick = function() {
    popupHide();
    return false;
};
