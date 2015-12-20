// récupérer les services du local storage
function serviceGetLocalStorage() {
	return JSON.parse(localStorage.getItem("service"));
}
// insérer les services dans le local storage
function serviceSetLocalStorage() {
	localStorage.setItem("service", JSON.stringify(service));
}

// récupérer les services s'ils existent
var service = {}
if(typeof localStorage != 'undefined' &&
	localStorage.getItem("service") != null) {

	service = serviceGetLocalStorage();
}
else {
	service = {	"feature" : [] };
}


var searchBatiments = {};
searchBatiments["Universite"] = [];
searchBatiments["Administration"] = [];
searchBatiments["Residence"] = [];
searchBatiments["Restaurant"] = [];

// charger la liste pour l'autocomplétion
var features = map.features;
var feature;
for(var i=0; i < features.length ; i++){
	feature = features[i];
	if(feature.properties.hasOwnProperty("building") && feature.properties.hasOwnProperty("name")) {
	    searchBatiments[feature.properties.building].push({"name":feature.properties.name, "id":feature.properties.id});
	}
}


// Recherche Batiments
$.widget("custom.catcomplete", $.ui.autocomplete, {
	_create: function() {
		this._super();
		this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
	},
	// afficher l'autocomplétion
	_renderMenu: function( ul, items ) {
		var that = this, currentCategory = "";
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
	var data = [];
	var category = "";
	for(category in searchBatiments){
		for(j=0; j < searchBatiments[category].length; j++){
			data.push({ label: searchBatiments[category][j].name, category: category});
		}
	}

	$( "#batiment1" ).catcomplete({
		delay: 0,
		source: data
	});
});


// afficher les services
function adminDisplayServices(code) {
	$('#error').remove();
	// tous les services supprimés
	if(code == 0) {
		var text = '<div class="alert alert-success" role="alert" id="error">Les services ont été supprimés.</div>';
		$("#errorMessage").prepend(text);
		$("#services").html("");
	}
	// afficher les services
	else if(code == 1) {
		$('#form')[0].reset();

		var text = "";
		for(var i = 0;  i < service.feature.length; ++i) {
			var feature = service.feature[i];
			text += "<b>" + feature.nomBatiment + "</b> : " + feature.nomService + "<br>";
			text += "<i>" + feature.lienService + "</i><br>";
			text += feature.descriptionService + "<br>";
			text += '<button class="btn btn-xs btn-danger" onClick=supprimerService(\'' + feature.idBatiment + '\')><i class="fa fa-trash-o"></i></button>';
			text += "<br><br>";
		}
		$("#services").html(text);
	}
	// batiment invalide
	else if(code == 2) {
		var text = '<div class="alert alert-danger" role="alert" id="error">Veuillez saisir un batiment valide.</div>';
		$("#errorMessage").prepend(text);
	}
	// champs à remplir
	else if(code == 3) {
		var text = '<div class="alert alert-danger" role="alert" id="error">Veuillez remplir le batiment et le nom du service.</div>';
		$("#errorMessage").prepend(text);	
	}
}
// on commence par afficher les services
adminDisplayServices(1);

// validation du formulaire
function ajoutService(){
	// récupérer les infos
	var nomBatiment = $( "input:text[name=batiment]" ).val();
	var nomService = $( "input:text[name=nomService]" ).val();
	var lienService = $( "input:text[name=lienService]" ).val();
	var descriptionService = $( "#description" ).val();
	
	if(nomBatiment != null && nomService != null && nomService.length > 2) {
		// récupérer l'id du batiment
		var idBatiment;
		var batimentExist = false;
		for(category in searchBatiments){
			for(j=0; j < searchBatiments[category].length; j++){
				if (searchBatiments[category][j].name == nomBatiment){
					idBatiment = searchBatiments[category][j].id;
					batimentExist = true;
				}
			}
		}

		if(batimentExist) {
			service.feature.push({idBatiment: idBatiment, nomBatiment: nomBatiment, nomService: nomService, lienService: lienService, descriptionService: descriptionService});

			serviceSetLocalStorage();

			adminDisplayServices(1);
		}
		else {
			adminDisplayServices(2);
		}
	}
	else {
		adminDisplayServices(3);
	}
	
}

// supprimer tous les services
function supprimerServices() {
	localStorage.removeItem("service");
	service = {	"feature" : [] };
	adminDisplayServices(0);
}
// supprimer un service
function supprimerService(idBatiment) {
	console.log(idBatiment);
	for(var i = 0;  i < service.feature.length; ++i) {
		var feature = service.feature[i];
		if(feature.idBatiment == idBatiment) {
			service.feature.splice(i, 1);
			break;
		}
	}
	serviceSetLocalStorage();
	adminDisplayServices(1);
}

function indexPage() {
    window.location = "index.html";
}