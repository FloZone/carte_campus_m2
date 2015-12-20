var routingGraph = new Graph();

function intersectRoad(beginNode, endNode){
	/*
	Cette fonction cherche les intersections entre la route (beginNode, endNode) et les autres routes.
	Elle modifie le graphe en conséquence (création de nouveaux noeuds pour les points d'intersection,
	relie les points d'intersections aux noeuds existants).
	*/
	// Liste d'intersection
	var intersectList = [];
	routingGraph.forEachEdge(function(edgeObject) {
		// Pour chaque route avec un point d'arrivé ou de départ différent de notre route actuel
		if(edgeObject.fromId != beginNode._id && edgeObject.fromId != endNode._id && edgeObject.toId != beginNode._id && edgeObject.toId != endNode._id){
			// On cherche à savoir si cette route et notre route actuelle on une intersection
			var beginNodeTemp = routingGraph.getNode(edgeObject.fromId);
			var endNodeTemp = routingGraph.getNode(edgeObject.toId);

			var intersectNode = intersection(beginNode._coord, endNode._coord, beginNodeTemp._coord, endNodeTemp._coord);
			if(intersectNode != undefined){
				intersectList.push({node: intersectNode, fromId: edgeObject.fromId, toId: edgeObject.toId});
			}
		}
	});

	// On tri la liste d'intersection : les noeuds d'intersection par rapport à beginNode
	intersectList.sort(function(a, b){
		var distA = norme(beginNode, a.node);
		var distB = norme(beginNode, b.node);

		if (distA < distB)
			return -1;
		if (distA > distB)
			return 1;
		// a doit être à même distance que b
		return 0;
	});

	// On ajoute les points d'intersections au graphe, et on modifie les segments en conséquence
	var previousNode = beginNode;
	routingGraph.removeEdge(beginNode._id, endNode._id);
	intersectList.forEach(function(element){
		// On ajoute le noeud d'intersection au graphe
		var node = routingGraph.addNodeAutoId(element.node);
		// On relit le noeud à notre route si les noeuds sont différents
		if(previousNode._id != node._id){
			routingGraph.addEdge(previousNode._id, node._id);
		}

		// On supprime la seconde route avec laquelle est éffectué l'intersection si les noeuds sont différents
		if(element.fromId != node._id && element.toId != node._id){
			routingGraph.removeEdge(element.fromId, element.toId);
			// Ceci dans le but d'ajouter le noeud d'intersection à cette route
			routingGraph.addEdge(element.fromId, node._id);
			routingGraph.addEdge(node._id, element.toId);
		}

		previousNode = node;
	});
	// Le dernier arc mais pas des moindre :)
	routingGraph.addEdge(previousNode._id, endNode._id);
};

// Fonction appelé pour chaque route si le fichier routingGraph.json n'est pas chargé
// Ajoute la route au graphe et vérifie les intersections avec les autres routes
function onEachFeatureRoutingGraph(feature){
	if (feature.geometry.type == "LineString" && feature.geometry.coordinates.length > 0) {
		// Ajout du premier noeud
		var previousNode = routingGraph.addNodeAutoId({x:feature.geometry.coordinates[0][0], y:feature.geometry.coordinates[0][1]});
		// Ajout de tout les noeuds et des routes (edges) entre les noeuds
		for (var i = 1; i < feature.geometry.coordinates.length; i++) {
			// Ajout du nouveau noeud
			var node = routingGraph.addNodeAutoId({x:feature.geometry.coordinates[i][0], y:feature.geometry.coordinates[i][1]});
			// Ajout de la route entre les deux noeuds
			routingGraph.addEdge(previousNode._id, node._id);

			// Vérification des intersections avec les autres routes
			intersectRoad(previousNode, node);

			previousNode = node;
		}
	}
};

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


/*
Les paramètres sont de la forme {x:1.25, y:54.5}
beginNodeCoord1 le debut du segment 1
endNodeCoord1 la fin du segment 1
beginNodeCoord2 le debut du segment 2
endNodeCoord2 la fin du segment 2
*/
function produitVectoriel(beginNodeCoord1, endNodeCoord1, beginNodeCoord2, endNodeCoord2) {
  return (endNodeCoord1.x - beginNodeCoord1.x) * (endNodeCoord2.y - beginNodeCoord2.y) - (endNodeCoord1.y - beginNodeCoord1.y)
      * (endNodeCoord2.x - beginNodeCoord2.x);
};

// NON TESTEE
/*
Les paramètres sont de la forme {x:1.25, y:54.5}
beginNodeCoord1 le debut du segment 1
endNodeCoord1 la fin du segment 1
beginNodeCoord2 le debut du segment 2
endNodeCoord2 la fin du segment 2
*/
function produitScalaire(beginNodeCoord1, endNodeCoord1, beginNodeCoord2, endNodeCoord2) {
  return (endNodeCoord1.x - beginNodeCoord1.x) * (endNodeCoord2.x - beginNodeCoord2.x) + (endNodeCoord1.y - beginNodeCoord1.y)
      * (endNodeCoord2.y - beginNodeCoord2.y);
};

/*
Les paramètres sont de la forme {x:1.25, y:54.5}
beginNodeCoord1 le debut du segment 1
endNodeCoord1 la fin du segment 1
beginNodeCoord2 le debut du segment 2
endNodeCoord2 la fin du segment 2
*/
function intersection (beginNodeCoord1, endNodeCoord1, beginNodeCoord2, endNodeCoord2) {
  var pvs2s1 = produitVectoriel(beginNodeCoord2, endNodeCoord2, beginNodeCoord1, endNodeCoord1);
  var pvs1s2 = produitVectoriel(beginNodeCoord1, endNodeCoord1, beginNodeCoord2, endNodeCoord2);

  if (pvs2s1 == 0 || pvs1s2 == 0)
    return null;

  var a = -(produitVectoriel(beginNodeCoord2, endNodeCoord2, beginNodeCoord2, beginNodeCoord1))
      / pvs2s1;
  var b = -(produitVectoriel(beginNodeCoord1, endNodeCoord1, beginNodeCoord1, beginNodeCoord2))
      / pvs1s2;

  if (a < 0 || a > 1 || b < 0 || b > 1)
    return null;
  else
    return {"x" : (beginNodeCoord1.x + a * (endNodeCoord1.x - beginNodeCoord1.x)),
            "y" : (beginNodeCoord1.y + a * (endNodeCoord1.y - beginNodeCoord1.y))};
};

function norme(beginNodeCoord, endNodeCoord){
  return Math.sqrt(Math.pow(endNodeCoord.x - beginNodeCoord.x,2)
                  + Math.pow(endNodeCoord.y - beginNodeCoord.y,2));
};
