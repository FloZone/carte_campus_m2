var routingGraph = new Graph();

// Calcul l'itinéraire depuis deux coordonnées de la map [lat, lon]
function calculItineraire(beginNodeCoord, endNodeCoord){
	var beginNodeId = nearestNode(beginNodeCoord);
	var endNodeId = nearestNode(endNodeCoord);

	var way = routingGraph.dijkstra(beginNodeId, endNodeId);

	// On ajoute le point de départ au début du tableau
	way.unshift(endNodeCoord);
	// Et le point d'arrivé à la fin du tableau
	way.push(beginNodeCoord);

	return way;
};

// Retourne le noeud le plus proche du point donné
// Simple mais efficace
function nearestNode(nodeCoord) {
	var id = -1;
	var distance = Infinity;
	routingGraph.forEachNode(function(nodeObject){
		var distanceTemp = norme(nodeCoord, nodeObject._coord);
		if(distanceTemp < distance){
			id = nodeObject._id;
			distance = distanceTemp;
		}
	});
	return id;
};

function norme(beginNodeCoord, endNodeCoord){
  return Math.sqrt(Math.pow(endNodeCoord[0] - beginNodeCoord[0],2)
                  + Math.pow(endNodeCoord[1] - beginNodeCoord[1],2));
};
