<?php
include_once('database.php');

if(isset($_GET['method']) && !empty($_GET['method'])){
	$db = new Database();
	switch ($_GET['method']) {
		case 'getAllServices':
			$services = $db->getAllServices();
			echo json_encode($services);
		break;

		case 'deleteAllServices':
			echo $db->deleteAllServices();
		break;

		case 'deleteService':
			if(isset($_GET['id']) && !empty($_GET['id'])){
				echo $db->deleteService($_GET['id']);
			}else{
				http_response_code(400);
				echo "Error!: Bad request (id is empty)</br>"; 
			}
		break;

		case 'getAllBuildings':
			if(isset($_GET['search']) && !empty($_GET['search'])){
				$services = $db->getAllBuildings($_GET['search']);
				echo json_encode($services);
			}else{
				http_response_code(400);
				echo "Error!: Bad request (search is empty)</br>"; 
			}
		break;
		
		case 'addService':
			if(isset($_GET['buildings_id']) && !empty($_GET['buildings_id']) && isset($_GET['name']) && !empty($_GET['name'])){
				echo $db->addService($_GET['buildings_id'], $_GET['name'], $_GET['url'], $_GET['description']);
			}else{
				http_response_code(400);
				echo "Error!: Bad request (buildings_id or name is empty)</br>"; 
			}
		break;

		default:
		break;
	}
}

?>
