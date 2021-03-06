var Graph,
__hasProp = {}.hasOwnProperty;

Graph = (function() {
	function Graph() {
		//Change projection of each node coord
		for(id in routingGraphJSON._nodes){
			var nodeCoord = [routingGraphJSON._nodes[id]._coord.x, routingGraphJSON._nodes[id]._coord.y];
			routingGraphJSON._nodes[id]._coord = ol.proj.transform(nodeCoord, 'EPSG:4326', mapProjection);
		}
		
		// We load graph from JSON
		this._nodes = routingGraphJSON._nodes;
		this.nodeSize = routingGraphJSON.nodeSize;
		this.edgeSize = routingGraphJSON.edgeSize;
	}

	Graph.prototype.getNode = function(id) {
		/*
		  _Returns:_ the node object. Feel free to attach additional custom properties
		  on it for graph algorithms' needs.
		*/

		return this._nodes[id];
	};

	Graph.prototype.getNodeCoord = function(id) {
		/*
		  _Returns:_ the coord object, or undefined if the nodes of id aren't found.
		*/

		var node = this._nodes[id];
		if(node){
			return node._coord;
		}
	};

	Graph.prototype.getNodeSize = function() {
	  return this.nodeSize;
	};

	Graph.prototype.getEdgeSize = function() {
	  return this.edgeSize;
	};

	Graph.prototype.removeNode = function(id) {
		/*
		  _Returns:_ the node object removed, or undefined if it didn't exist in the
		  first place.
		*/

		var inEdgeId, nodeToRemove, outEdgeId, _ref, _ref1;
		nodeToRemove = this._nodes[id];
		if (!nodeToRemove) {
		return;
		} else {
		_ref = nodeToRemove._outEdges;
		for (outEdgeId in _ref) {
			if (!__hasProp.call(_ref, outEdgeId)) continue;
			this.removeEdge(id, outEdgeId);
		}
		_ref1 = nodeToRemove._inEdges;
		for (inEdgeId in _ref1) {
			if (!__hasProp.call(_ref1, inEdgeId)) continue;
			this.removeEdge(inEdgeId, id);
		}
		this.nodeSize--;
		delete this._nodes[id];
		}
		return nodeToRemove;
	};

	Graph.prototype.getEdge = function(fromId, toId) {
		/*
		  _Returns:_ the edge object, or undefined if the nodes of id `fromId` or
		  `toId` aren't found.
		*/

		var fromNode, toNode;
		fromNode = this._nodes[fromId];
		toNode = this._nodes[toId];
		if (!fromNode || !toNode) {

		} else {
		return fromNode._outEdges[toId];
		}
	};

	Graph.prototype.removeEdge = function(fromId, toId) {
		/*
		  _Returns:_ the edge object removed, or undefined of edge wasn't found.
		*/

		var edgeToDelete, fromNode, toNode;
		fromNode = this._nodes[fromId];
		toNode = this._nodes[toId];
		edgeToDelete = this.getEdge(fromId, toId);
		if (!edgeToDelete) {
		return;
		}
		delete fromNode._outEdges[toId];
		delete toNode._inEdges[fromId];
		this.edgeSize--;
		return edgeToDelete;
	};

	Graph.prototype.getInEdgesOf = function(nodeId) {
		/*
		  _Returns:_ an array of edge objects that are directed toward the node, or
		  empty array if no such edge or node exists.
		*/

		var fromId, inEdges, toNode, _ref;
		toNode = this._nodes[nodeId];
		inEdges = [];
		_ref = toNode != null ? toNode._inEdges : void 0;
		for (fromId in _ref) {
		if (!__hasProp.call(_ref, fromId)) continue;
		inEdges.push(this.getEdge(fromId, nodeId));
		}
		return inEdges;
	};

	Graph.prototype.getOutEdgesOf = function(nodeId) {
		/*
		  _Returns:_ an array of edge objects that go out of the node, or empty array
		  if no such edge or node exists.
		*/

		var fromNode, outEdges, toId, _ref;
		fromNode = this._nodes[nodeId];
		outEdges = [];
		_ref = fromNode != null ? fromNode._outEdges : void 0;
		for (toId in _ref) {
		if (!__hasProp.call(_ref, toId)) continue;
		outEdges.push(this.getEdge(nodeId, toId));
		}
		return outEdges;
	};

	Graph.prototype.getAllEdgesOf = function(nodeId) {
		/*
		**Note:** not the same as concatenating `getInEdgesOf()` and
		`getOutEdgesOf()`. Some nodes might have an edge pointing toward itself.
		This method solves that duplication.

		_Returns:_ an array of edge objects linked to the node, no matter if they're
		outgoing or coming. Duplicate edge created by self-pointing nodes are
		removed. Only one copy stays. Empty array if node has no edge.
		*/

		var i, inEdges, outEdges, selfEdge, _i, _ref, _ref1;
		inEdges = this.getInEdgesOf(nodeId);
		outEdges = this.getOutEdgesOf(nodeId);
		if (inEdges.length === 0) {
		return outEdges;
		}
		selfEdge = this.getEdge(nodeId, nodeId);
		for (i = _i = 0, _ref = inEdges.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
		if (inEdges[i] === selfEdge) {
			_ref1 = [inEdges[inEdges.length - 1], inEdges[i]], inEdges[i] = _ref1[0], inEdges[inEdges.length - 1] = _ref1[1];
			inEdges.pop();
			break;
		}
		}
		return inEdges.concat(outEdges);
	};

	Graph.prototype.forEachNode = function(operation) {
		/*
		  Traverse through the graph in an arbitrary manner, visiting each node once.
		  Pass a function of the form `fn(nodeObject, nodeId)`.

		  _Returns:_ undefined.
		*/

		var nodeId, nodeObject, _ref;
		_ref = this._nodes;
		for (nodeId in _ref) {
		if (!__hasProp.call(_ref, nodeId)) continue;
		nodeObject = _ref[nodeId];
		operation(nodeObject, nodeId);
		}
	};

	Graph.prototype.forEachEdge = function(operation) {
		/*
		  Traverse through the graph in an arbitrary manner, visiting each edge once.
		  Pass a function of the form `fn(edgeObject)`.

		  _Returns:_ undefined.
		*/

		var edgeObject, nodeId, nodeObject, toId, _ref, _ref1;
		_ref = this._nodes;
		for (nodeId in _ref) {
		if (!__hasProp.call(_ref, nodeId)) continue;
		nodeObject = _ref[nodeId];
		_ref1 = nodeObject._outEdges;
		for (toId in _ref1) {
			if (!__hasProp.call(_ref1, toId)) continue;
			edgeObject = _ref1[toId];
			operation(edgeObject);
		}
		}
	};

	Graph.prototype.dijkstra = function (beginNodeId, endNodeId) {
		// Calcul du plus court chemin entre deux noeuds via id.
		// Retourne un tableau de l'ensemble des points du chemin le plus court.
		// Les points sont sous la forme {x:15.1, y:4.0}
		var nodes = new PriorityQueue(), //Les noeuds qui ne sont pas encore parcouru
			distances = {}, // La distance de chaque noeud
			previous = {}, // Le noeud précédent de chaque noeud
			path = [], // Le chemin le plus court à retourner
			smallest, neighbor, dist;

		// On parcours tous les noeud pour construire le tableau nodes et distances
		// et le tableau de mémoire/suivi des previous
		this.forEachNode(function(nodeElement){
			if(nodeElement._id == beginNodeId){
				distances[nodeElement._id] = 0;
				nodes.enqueue(0, nodeElement._id);
			}else{
				distances[nodeElement._id] = Infinity;
				nodes.enqueue(Infinity, nodeElement._id);
			}
			previous[nodeElement._id] = null;
		});

		// Tant que tout les noeuds n'ont pas été visité
		while(!nodes.isEmpty()) {
			//On prend le noeud le plus petit
			smallest = nodes.dequeue();

			if(smallest == endNodeId) {
				path;

				while(previous[smallest]) {
					path.push(this.getNodeCoord(smallest));
					smallest = previous[smallest];
				}

				break;
			}

			if(!smallest || distances[smallest] === Infinity){
				continue;
			}

			this.getAllEdgesOf(smallest).forEach(function(neighbor){
				dist = distances[smallest] + neighbor.weight;
		
				var idNeighbor = neighbor.toId;
				//Les arcs peuvent être dans les deux sens, on doit donc vérifier que l'on prend bien le bon point (le voisin)
				if(idNeighbor == smallest)
					idNeighbor = neighbor.fromId;

				if(dist < distances[idNeighbor]) {
					distances[idNeighbor] = dist;
					previous[idNeighbor] = smallest;

					nodes.enqueue(dist, idNeighbor);
				}
			});
		}

		return path;
	};

	return Graph;

})();

/**
 * Basic priority queue implementation.
 */
function PriorityQueue () {
  this._nodes = [];

  this.enqueue = function (priority, key) {
    this._nodes.push({key: key, priority: priority });
    this.sort();
  }
  this.dequeue = function () {
    return this._nodes.shift().key;
  }
  this.sort = function () {
    this._nodes.sort(function (a, b) {
      return a.priority - b.priority;
    });
  }
  this.isEmpty = function () {
    return !this._nodes.length;
  }
}
