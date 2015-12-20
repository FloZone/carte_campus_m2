/* RECHERCHE */

// données de la recherche/autocomplétion
// contenu [{"loc": [10,2], "title": "fac info"}, ...]
var searchData = [];

// tableau des routes
var roadList = [];

// tableau des segments
var segList = [];

// liste des batiments pour la recherche manuelle
var searchBuildingsList = {};
var searchParking = [];
searchBuildingsList["Universite"] = [];
searchBuildingsList["Administration"] = [];
searchBuildingsList["Residence"] = [];
searchBuildingsList["Restaurant"] = [];


// pour chaque feature, charger les listes pour la recherche
function onEachFeatureSearch(feature, layer) {
    var props = feature.properties;

    // créer un tableau avec les batiments valides et leur centre
    if(props.hasOwnProperty("building") && props.hasOwnProperty("name")) {
        var polygon = L.polygon(feature.geometry.coordinates);
        var center = polygon.getBounds().getCenter();

        // remplir la recherche
        searchData.push({"loc": [center.lng, center.lat], "title": props.name});
        var listeServiceSearch = [];
        if(typeof localStorage != 'undefined' && localStorage.getItem("service") != null) {
            listeServiceSearch = JSON.parse(localStorage.getItem('service')).feature;
        }
        for(var j = 0; j < listeServiceSearch.length ; j++){
            if (listeServiceSearch[j].idBatiment == feature.id){
                searchData.push({"loc": [center.lng, center.lat], "title": listeServiceSearch[j].nomService});
            }
        }

        // remplir la liste des batiments
        searchBuildingsList[props.building].push({"center":center, "name":props.name, "id":props.id});
    }

    // créer une liste avec les parking
    if(props.hasOwnProperty("parking")){
        polygon = L.polygon(feature.geometry.coordinates);
        center = polygon.getBounds().getCenter();
        searchParking.push({"center": center});
    }

    color(feature);
}


// Fonction de recherche
function searchDataFunction(text, callResponse) {
    // rechercher dans le tableau
    callResponse(searchData);
    return {
        // arrêter la recherche
        abort: function() {
            return false;
        }
    };
}


// paramétrage de la recherche
var searchControl = new L.Control.Search({
    sourceData: searchDataFunction,
    circleLocation: true,
    markerLocation: true,
    collapsed: false,
    autoCollapse: false,
    autoResize: false,
    container: 'containerSearch'
});


// cacher le marker affiché par la recherche
function searchHideMarker() {
    searchControl._markerLoc.hide();
}



// Activer le menu accordéon
$(function() {
    $("#accordion").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content"
    });
});



// Click sur un élément dans la liste
function searchCenterLink(center, id) {
    // centrer la map sur l'élément
    mapTot.panTo(center);

    // simuler un click pour ouvrir la popup
    mapTot._layers[id].fire('click', {latlng: center});

    // fermer la sidebar
    sidebar.close();
}


// Remplir le menu accordeon
function searchPopulateAccordion(container) {
    // Pour chaque catégorie de batiment
    var searchBuildingsListText = "";
    for(category in searchBuildingsList) {
        searchBuildingsListText += "<h3>" + category + "</h3>";
        searchBuildingsListText += "<div>";

        // pour chaque batiment de la catégorie
        for(var i = 0; i < searchBuildingsList[category].length; ++i) {
            var center = "[" + searchBuildingsList[category][i].center.lng + ", " + searchBuildingsList[category][i].center.lat + "]";
            var name = searchBuildingsList[category][i].name;
            var id = "'" + searchBuildingsList[category][i].id + "'";

            searchBuildingsListText += "<div class='objet'>";
            searchBuildingsListText += '<a onClick="searchCenterLink(' + center + ', ' + id + ')">' + name + '</a>';
            searchBuildingsListText += "</div>";
        }
       
        searchBuildingsListText += "</div>";
    }

    // Les services
    var listeServiceAccordion = [];

    if(typeof localStorage != 'undefined' &&
        localStorage.getItem("service") != null) {
        listeServiceAccordion = JSON.parse(localStorage.getItem('service')).feature;
        searchBuildingsListText += "<h3> Services </h3>";
        searchBuildingsListText += "<div>";
    }

    for(var j = 0; j < listeServiceAccordion.length ; j++){
        for(category in searchBuildingsList) {
            for(var i = 0; i < searchBuildingsList[category].length; ++i) {
                if (listeServiceAccordion[j].idBatiment == searchBuildingsList[category][i].id){
                    var center = "[" + searchBuildingsList[category][i].center.lng + ", " + searchBuildingsList[category][i].center.lat + "]";
                    var id = "'" + searchBuildingsList[category][i].id + "'";
                    searchBuildingsListText += "<div class='objet'>";
                    searchBuildingsListText += '<a onClick="searchCenterLink(' + center + ', ' + id + ')">' + listeServiceAccordion[j].nomService + '</a>';
                    searchBuildingsListText += "</div>";
                    break;
                }
            }
        }
    }
    if (listeServiceAccordion.length != 0)
        searchBuildingsListText += "<div>";

    $("#" + container).html(searchBuildingsListText);
}
