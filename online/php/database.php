<?php
class Database {

	private $db;

	function __construct() {
		$this->db = new PDO('pgsql:dbname=gis;host=localhost;user=sig;password=sig');
	}

	function getAllServices() {
		try{
			$stmt = $this->db->prepare("Select b.name as buildings_name, s.id , s.buildings_id , s.name, s.url, s.description from services s join osm_new_buildings b on s.buildings_id = b.id");
			$stmt->execute();
			$res = $stmt->fetchAll();

			return $res;
		} catch( PDOExecption $e ) {
			http_response_code(400);
			return "Error!: " . $e->getMessage() . "</br>"; 
		} 
	}

	function getAllBuildings($search) {
		try{
			$search = "%".$search."%";
			$stmt = $this->db->prepare("Select id, name from osm_new_buildings where upper(name) like :search");
			$stmt->bindParam(':search', $search);
			$stmt->execute();
			$res = $stmt->fetchAll();

			return $res;
		} catch( PDOExecption $e ) {
			http_response_code(400);
			return "Error!: " . $e->getMessage() . "</br>"; 
		}
	}

	function addService($buildings_id, $name, $url, $description){
		try{
			$stmt = $this->db->prepare("INSERT INTO services (buildings_id, name, url, description) VALUES (:buildings_id, :name, :url, :description)");
			$stmt->bindParam(':buildings_id', $buildings_id);
			$stmt->bindParam(':name', $name);
			$stmt->bindParam(':url', $url);
			$stmt->bindParam(':description', $description);
			$stmt->execute();

			if($stmt->rowCount() > 0){
				return "Success</br>";
			}else{
				http_response_code(400);
				return "Error!: Bad request</br>"; 
			}
		} catch( PDOExecption $e ) {
			http_response_code(400);
			return "Error!: " . $e->getMessage() . "</br>"; 
		} 
	}

	function deleteService($id){
		try{
			$stmt = $this->db->prepare("Delete from services where id=:id");
			$stmt->bindParam(':id', $id); 
			$stmt->execute();
		} catch( PDOExecption $e ) {
			http_response_code(400);
			return "Error!: " . $e->getMessage() . "</br>"; 
		} 
	}

	function deleteAllServices($id){
		try{
			$stmt = $this->db->prepare("Delete from services");
			$stmt->execute();
		} catch( PDOExecption $e ) {
			http_response_code(400);
			return "Error!: " . $e->getMessage() . "</br>"; 
		} 
	}

}
?>
