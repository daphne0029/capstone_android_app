<?php

require('config.inc');
date_default_timezone_set('America/Vancouver');

class dataService {
  public function __construct() {
  }
  public function initialLoad() {
    $output = array();
    $output['plantSpecs'] = $this->getPlantSpecs();
    //$output['setting'] = $this->getSetting();
    //$output['status'] = $this->getStatus();
    return $output;
  }
  public function getPlantSpecs() {
    $output = json_decode(file_get_contents(ROOTPATH . '/html/ajax/PlantSpecs.json'), true);
    return $output;
  }
  public function report($data) {
    //Load the previous report
    //compare changes + write to log file
    //overwrite (save) the report file
    $this->updatereport($data);

    $returnData = array(
      "status" => 1,
      "profile" => array(
        "commonName" => "",
        "autoMode" => true,
        "day" => true,
        "lastTimeWater" => date("Y-m-d H:i:s")
      ),
      "action" => array(
        "pump" => false,
        "heat" => false,
        "lightB" => false,
        "lightR "=> false
      )
    );

    //check if time is night time, after 21:00 and before 05:00
    if ((int)date("H") >= 21 || (int)date("H") <= 5 ){
      echo "Current hour = " . date("H") . "<br>";
      echo "Light shoulf be off! <br>";
      $returnData["profile"]["day"] = false;
    };

    //check if the pump status is true, if yes then save a timestamp
    if ($data["status"]["pumping"] == true){
      $returnData["profile"]["lastTimeWater"] = date("Y-m-d H:i:s");
    };


    return $returnData;//has to be a php array
  }
  public function updatereport($data){
  //Load the previous report
  //compare changes + write to log file
  //overwrite the report file
    $preReport = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    $diff["waterTankLevel"] = array_diff_assoc($data["waterTankLevel"], $preReport["waterTankLevel"]);
    //$diff["reading"] = array_diff_assoc($data["reading"], $preReport["reading"]);
    $diff["status"] = array_diff_assoc($data["status"], $preReport["status"]);
    //write the difference of the 2 reports to the log file
    $LOG = fopen(INCLUDE_PATH . "/log.txt", "r+") or die("Unable to open log.txt!");
    //fread($LOG,filesize(INCLUDE_PATH . "/log.txt"));
    $logarray = json_decode(file_get_contents(INCLUDE_PATH . "/log.txt"), true);
    //check array size before appending,
    //if >= 300, the shift out the first element in array
    echo "count of the log array = " . count($logarray) . "<br>";
    if (count($logarray) >= 300 ){
      echo "Delet the following <br>";
      echo json_encode(array_shift($logarray)) ."<br>";
    }
    echo "count of the log array = " . count($logarray) . "<br>";
    //append a new element to the logarray
    $logarray[] = array(
      'timestamp' => date("Y-m-d H:i:s"),
      'action' => array($diff["status"]),
      'status' => array($data["status"]),
      'waterTankLevel' => array($data["waterTankLevel"]),
      'reading' => array($data["reading"])
    );
    //only update if STATUS changes
    if (empty($diff["status"])){
      echo "Sataus remain the same. Not pushing to log file. <br>";
    }else{
      file_put_contents(INCLUDE_PATH . "/log.txt", "");
      $log_txt = json_encode($logarray);
      fwrite($LOG, $log_txt);
    };

    fclose($LOG);
    //overwrite the report
    $freport = fopen(ROOTPATH . "/html/ajax/report.json", "w+") or die("Unable to open report.json!");
    $fdata = json_encode($data);
    fwrite($freport, $fdata);
    fclose($freport);
    return;
  }
}


?>
