/* SEARCH */


var searchClear = document.getElementById('search-clear');


searchClear.onclick = function(event) {
    $("#search-input").val("");
    $( "#search-input" ).autocomplete( "close" );
};

function searchCenter(center, type, name) {
    sidebar.close();
    map.getView().setCenter(center);

    popupSetContent(type, name);
    popupOpen(center);
}

$( "#search-input" ).autocomplete({
	minLength: 1,
	source: searchTerm,
	select: function( event, ui ) {
		$( "#search-input" ).val( ui.item.label ).autocomplete( "close" );
		searchCenter(ui.item.value , ui.item.type, ui.item.label);
		return false;
	},
	open: function(event, ui) {
            $(".ui-autocomplete").css("z-index", 10000);
        }
})

/* RECHERCHE */
function searchTerm(request, callback) {
    var url = "http://localhost:8080/geoserver/sig/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sig:search_buildings&maxFeatures=50&outputFormat=application/json&viewparams=search:" + request.term.toUpperCase();
    
    $.ajax({
        url: url,
        datatype: 'json',
        success: function(json){
        	var data = $.map(json.features, function (item) {
			if(item.hasOwnProperty('geometry') && item.geometry){
                         return {
                             // following property gets displayed in drop down
                             label: item.properties.name,
                             // following property gets entered in the textbox
                             value: item.geometry.coordinates,
                             // following property is added for our own use
                             type: item.properties.type
                         };
			}
               	});
        	console.log(data);
        	callback(data);
       	}
    });
};


/* MENU ACCORDEON */
// Remplir le menu accordeon
function searchPopulateAccordion(container) {

    // url webservice pour récupérer tous les batiments
    var url = "http://localhost:8080/geoserver/sig/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sig:search_buildings&outputFormat=application/json";

    // url webservice pour récupérer tous les services
    var url2 = "http://localhost:8080/geoserver/sig/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sig:get_all_services&outputFormat=application/json";
    
    // récupérer la liste des batiments
    $.ajax({
        url: url,
        datatype: 'json',
        success: function(json1) {
		$.ajax({
			url: url2,
			datatype: 'json',
			success: function(json2){
				var output = "";
				var liste = {};

				json1.features.forEach(function(feature) {
					var type = feature.properties.type;
					var name = feature.properties.name;
					var coordinates = (feature.geometry == null) ? undefined : '[' + feature.geometry.coordinates + ']';

					if(liste[type] == undefined) {
					    liste[type] = [];
					}
					liste[type].push({name, coordinates});

					});

					// remplir le menu accordéon
					for(category in liste) {
					output += "<h3>" + category + "</h3>"
					output += "<div>";
					for(var i = 0; i < liste[category].length; ++i) {
					    var type = category;
					    var name = liste[category][i].name.replace("'", "&lsquo;");
					    var coordinates = liste[category][i].coordinates;

					    output += "<div class='objet'><a onClick=\"popupPop('" + type + "', '" + name + "', " + coordinates + ")\">" + name + "</a></div>";
					}
					output += "</div>";
				}

				//Remplir le menu accordéon pour les services
				output += "<h3>Services</h3>"
				output += "<div>";
				json2.features.forEach(function(feature){
					var type = feature.properties.buildings_type.replace("'", "&lsquo;");
					var name = feature.properties.buildings_name.replace("'", "&lsquo;");
					var coordinates = (feature.geometry == null) ? undefined : '[' + feature.geometry.coordinates + ']';

					output += "<div class='objet'><a onClick=\"popupPop('" + type + "', '" + name + "', " + coordinates + ")\">" + name + "</a>";
					var lienService = feature.properties.url.toLowerCase();
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

					output += "<br>" + feature.properties.name.replace("'", "&lsquo;");
					if(feature.properties.description && feature.properties.description.length > 0)
						output += "<br>" + feature.properties.description.replace("'", "&lsquo;");
					output +="<br>" + lien;

					output += "</div>";
				});
				output += "</div>";

				$("#" + container).html(output);

				// Activer le menu accordéon
				$(function() {
				$("#" + container).accordion({
				    active: true,
				    collapsible: true,
				    heightStyle: "content"
				});
				});
			}
		});
        }
    });

}
