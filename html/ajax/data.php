<?php
include "../../includes/global.inc";
include INCLUDE_PATH . "/dataService.inc";

$response = array(
    'status' => 1
);




try {
  ////CSRFHandler::getInstance()->validateToken();
  //read
  $service = new dataService();
  if (!empty($_GET['function'])) {
    if (method_exists('dataService',$_GET['function'])) {

      if (!empty($_GET['data'])) {
        $data = $_GET['data'];
        $data = json_decode($data,true);
        $response['data'] = $service->{$_GET['function']}($data);
      } else {
        $response['data'] = $service->{$_GET['function']}();
      }
    }
  }
  //write
  if (!empty($_POST['function'])) {
    if (method_exists('dataService',$_POST['function'])) {
    }
  }
} catch (Exception $e) {
    $response['status'] = -1;
    $response['errMsg'] = $e->getMessage();
}
echo json_encode($response);

?>
