/* FONCTIONS GENERALES */
/* A CHARGER EN DERNIER */

// Filtre sur le GeoJSON
function filter(feature, layer) {
	// n'afficher que le routes, batiments, parking, forêts et points d'eay 
    return feature.geometry.type == "LineString" || feature.properties.hasOwnProperty("building") || feature.properties.hasOwnProperty("parking") || feature.properties.hasOwnProperty("wood") || feature.properties.hasOwnProperty("natural");
}


// A appliquer sur chaque feature (élément) du GeoJSON
function onEachFeature(feature, layer) {

	// charger les listes pour la recherche
	onEachFeatureSearch(feature, layer);
    

    // Popup au click sur un batiment
    layer.on({
        click: function(e) {
            onEachFeaturePopup(feature, layer, e);
        }
    });

    // donner un id pour pouvoir y accéder partout
    layer._leaflet_id = feature.properties.id;
    
    //Si le graphe n'est pas enregistré, on calcule le graphe
    if(!routingGraph.isSaved()){
    	onEachFeatureRoutingGraph(feature);
    }
}

function admin() {
    window.location = "admin.html";
}