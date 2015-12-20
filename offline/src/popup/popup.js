/* POPUP AU CLICK SUR LA CARTE */
var serviceForPopUp = [];
if(typeof localStorage != 'undefined' &&
    localStorage.getItem("service") != null) {
    serviceForPopUp = JSON.parse(localStorage.getItem('service')).feature;
}

function onEachFeaturePopup(feature, layer, e) {
    var props = feature.properties;
	
	// si c'est une surface
    if(feature.geometry.type == "Polygon") {
        // tkt = contenu de la popup, faire la mise en page ici
        var txt = "";
        var display = false;

        // si c'est un batiment et qu'il a un nom
        if(props.hasOwnProperty("building") && props.hasOwnProperty("name")) {
            display = true;
            txt += "<strong>"+props.name+"</strong><br>";
            txt += "<em>"+props.building+"</em><br>";
            for(var i=0; i < serviceForPopUp.length; i++){
                if (serviceForPopUp[i].idBatiment == feature.id){
                    var lienService = serviceForPopUp[i].lienService.toLowerCase();
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

                    txt += serviceForPopUp[i].nomService + "<br>" + serviceForPopUp[i].descriptionService + 
                        "<br>" + lien;
                }
            }
            txt += "<br><br><a class='popupStyle' onClick='remplirItineraireDepart("+'"'+feature.id+'"'+")'>Itinéraire depuis ce lieu</a><br>"
            txt += "<a class='popupStyle' onClick='remplirItineraireDestination("+'"'+feature.id+'"'+")'>Itinéraire vers ce lieu</a>"
        }
        // si c'est un parking
        if(props.hasOwnProperty("parking")) {
            display = true;
            txt += "Parking";
        }

        if(display) {
            L.popup().setLatLng(e.latlng).setContent(txt).openOn(mapTot);
        }
    }
}
