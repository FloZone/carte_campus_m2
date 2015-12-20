var geoserver = "http://localhost:8080/geoserver/www/openlayer/index.html";

//Sauvegarde de l'id du batiment choisi
var idBatiment;

//Autocompletion
$( "#batiment1" ).autocomplete({
	minLength: 1,
	source: searchTerm,
	select: function( event, ui ) {
		$( "#batiment1" ).val( ui.item.label ).autocomplete( "close" );
		idBatiment = ui.item.value;
		return false;
	}
})

/* RECHERCHE */
function searchTerm(request, callback) {
    var url = "http://localhost?method=getAllBuildings&search=" + request.term.toUpperCase();
    
    $.ajax({
        url: url,
        datatype: 'json',
        success: function(json){
        	var data = $.map(JSON.parse(json), function (item) {
                         return {
                             label: item.name,
                             value: item.id
                         };
               	});
        	console.log(data);
        	callback(data);
       	}
    });
};

// afficher les services
function adminDisplayServices(code) {
	$('#error').remove();
	if(code == 1 || code == 0) {
		if(code == 0) {
			var text = '<div class="alert alert-success" role="alert" id="error">Les services ont été supprimés.</div>';
			$("#errorMessage").prepend(text);
		}
		$('#form')[0].reset();

		var url = "http://localhost/?method=getAllServices";

		$.ajax({
			url: url,
			datatype: 'json',
			success: function(json){
				json = JSON.parse(json);
				var text = "";
				for(key in json) {
					var feature = json[key];
					text += "<b>" + feature.buildings_name + ":</b> " +feature.name + "<br>";
					text += "<i>" + feature.url + "</i><br>";
					text += feature.description + "<br>";
					text += '<button class="btn btn-xs btn-danger" onClick=supprimerService(\'' + feature.id + '\')><i class="fa fa-trash-o"></i></button>';
					text += "<br><br>";
				}
				$("#services").html(text);
			}
		});
	}
	else if(code == 2) {
		var text = '<div class="alert alert-danger" role="alert" id="error">Veuillez saisir un batiment valide.</div>';
		$("#errorMessage").prepend(text);
	}
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
	var nomService = $( "input:text[name=nomService]" ).val();
	var lienService = $( "input:text[name=lienService]" ).val();
	var descriptionService = $( "#description" ).val();
	
	if(idBatiment != null && nomService != null && nomService.length > 3) {
		//TODO renvoye une erreur si problème lors de la requête SQL?

		var url = "http://localhost/?method=addService&buildings_id=" + idBatiment + "&name=" + nomService + "&url=" + lienService + "&description=" + descriptionService;

		$.ajax({
			url: url,
			datatype: 'json',
			success: function(){
				adminDisplayServices(1);
			},
			error: function(){
				adminDisplayServices(2);
			}
		});
	}else {
		adminDisplayServices(3);
	}
	
}

// supprimer tous les services
function supprimerServices() {
	var url = "http://localhost/?method=deleteAllServices";

	$.ajax({
		url: url,
		datatype: 'json',
		success: function(){
			adminDisplayServices(0);
		}
	});
}
// supprimer un service
function supprimerService(id) {
	var url = "http://localhost/?method=deleteService&id=" + id;

	$.ajax({
		url: url,
		datatype: 'json',
		success: function(){
			adminDisplayServices(1);
		}
	});
}

function indexPage() {
    window.location = geoserver;
}
