<?php

require('config.inc');
date_default_timezone_set('America/Vancouver');
class dataService {
  public $config = array(
    'apiLogPath' =>  '/html/ajax/apiLog.txt',
    'apiLogMaxLine' => 50
  );
  public function __construct() {
    $this->config['apiLogPath'] = ROOTPATH . '/html/ajax/apiLog.txt';
  }
  public function initialLoad() {
    $output = array();
    $output['plantSpecs'] = $this->getPlantSpecs();
    //$output['setting'] = $this->getSetting();
    //$output['status'] = $this->getStatus();
    return $output;
  }
  private function log() {
    $logs = file($this->config['apiLogPath']);
    $newLine = date('Y-m-d H:i:s') . ' from ' . $_SERVER['REMOTE_ADDR'] . ': GET - ' . http_build_query($_GET);
    array_unshift($logs,$newLine);
    $newLogs = array();

    $count = 0;

    foreach($logs AS $index => $line) {
      $trimedLine = trim($line);
      if (!empty($trimedLine)) {
        $newLogs[] = $line;
        $count++;
      }
      if ($count >= $this->config['apiLogMaxLine']) {
        break;
      }
    }

    $fid = fopen($this->config['apiLogPath'],"w");
    fputs($fid,implode(PHP_EOL,$newLogs));
    fclose($fid);

    //rotate log
  }
  public function getPlantSpecs() {
    $output = json_decode(file_get_contents(ROOTPATH . '/html/ajax/PlantSpecs.json'), true);
    return $output;
  }
  public function updateselectedplant($data) {
    $serverdatabase = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    $fdatabase = fopen(ROOTPATH . "/html/ajax/report.json", "w+") or die("Unable to open report.json!");

    $serverdatabase["appdata"]["selectedplant"] = $data["name"];
    $serverdatabase["appdata"]["selectedid"] = $data["id"];

    $fdata = json_encode($serverdatabase);
    fwrite($fdatabase, $fdata);
    fclose($fdatabase);

    return true;
  }
  public function requestreport(){
    $this->log();
    $serverdatabase = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    return $serverdatabase;
  }
  public function toggleManualMode($data) {
    //http://capstone.local/ajax/data.php?function=modeswich&data=on
    //http://capstone.local/ajax/data.php?function=modeswich&data=off
    $serverdatabase = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    $fdatabase = fopen(ROOTPATH . "/html/ajax/report.json", "w+") or die("Unable to open report.json!");

    $serverdatabase["appdata"]["manualmode"] = $data["mode"];
    if (!$data["mode"]) {
      $serverdatabase["appdata"]["action"]["lightR"] = false;
      $serverdatabase["appdata"]["action"]["lightB"] = false;
      $serverdatabase["appdata"]["action"]["pump"] = false;
    }
    $fdata = json_encode($serverdatabase);
    fwrite($fdatabase, $fdata);
    fclose($fdatabase);
    /*
    if (!$data["mode"]) {
      $this->togglebluelight(array('lightB' => false));
      $this->toggleredlight(array('lightR' => false));
    }
    */
    return true;
  }
  public function togglebluelight($data) {
    $serverdatabase = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    $fdatabase = fopen(ROOTPATH . "/html/ajax/report.json", "r+") or die("Unable to open report.json!");

    $serverdatabase["appdata"]["action"]["lightB"] = $data["lightB"];

    $fdata = json_encode($serverdatabase);
    fwrite($fdatabase, $fdata);
    fclose($fdatabase);
    return true;
  }
  public function toggleredlight($data) {
    $serverdatabase = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    $fdatabase = fopen(ROOTPATH . "/html/ajax/report.json", "w+") or die("Unable to open report.json!");

    $serverdatabase["appdata"]["action"]["lightR"] = $data["lightR"];

    $fdata = json_encode($serverdatabase);
    fwrite($fdatabase, $fdata);
    fclose($fdatabase);
    return true;
  }
  public function pumpwater($data) {
    $serverdatabase = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    $fdatabase = fopen(ROOTPATH . "/html/ajax/report.json", "w+") or die("Unable to open report.json!");

    $serverdatabase["appdata"]["action"]["pump"] = $data["pump"];

    $fdata = json_encode($serverdatabase);
    fwrite($fdatabase, $fdata);
    fclose($fdatabase);
    return true;
  }
  public function report($data) {
    $this->log();
    //Load the previous report
    //compare changes + write to log file
    //overwrite (save) the report file
    $this->updatereport($data);

    $returnData = $this->getReturnInfo($data);

    return $returnData;//has to be a php array
  }
  public function getReturnInfo($data){
    $returnData = array(
      "status" => 1,
      "profile" => array(
        "manualmode" => false,
        "day" => true
      ),
      "action" => array(
        "pump" => false,
        "lightB" => false,
        "lightR "=> false
      ),
      "growing" => array(
        "commonName" => "Unknown",
        "species" => "Unknown",
        "watering" => "Unknown",
        "lightingMin" => "Unknown",
        "lightingMax"=> "Unknown",
        "humidity" => "Unknown",
        "temperatureLow" => "Unknown",
        "temperatureHigh" => "Unknown",
        "profileImg" => "Unknown"
      )
    );

    //Load selected plant parameters
    //read appdata from database
    $serverdatabase = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    $appData = $serverdatabase["appdata"];
    $plantid = $appData["selectedid"];
    $plantspecs = json_decode(file_get_contents(ROOTPATH . '/html/ajax/PlantSpecs.json'), true);
    $returnData["growing"] = $plantspecs["plantsArray"][$plantid];

    $fdatabase = fopen(ROOTPATH . "/html/ajax/report.json", "w+") or die("Unable to open report.json!");

    //check if time is night time, after 21:00 and before 05:00
    if ((int)date("H") >= 21 || (int)date("H") <= 5 ){
      //echo "Current hour = " . date("H") . "<br>";
      //echo "Light shoulf be off! <br>";
      $returnData["profile"]["day"] = false;
    };

    //check if the pump status is true, if yes then save a timestamp
    if ($data["status"]["pumping"] == true || $appData["action"]["pump"] == true){
      //$returnData["profile"]["lastTimeWater"] = date("Y-m-d H:i:s");
      $serverdatabase["appdata"]["lastTimeWater"] = date("Y-m-d H:i:s");
    };

    //echo "Last time watered = " . $serverdatabase["appdata"]["lastTimeWater"];

    //update action Array
    $returnData["action"] = $appData["action"];

    //update modeswich
    $returnData["profile"]["manualmode"] = $appData["manualmode"];

    $fdata = json_encode($serverdatabase);
    fwrite($fdatabase, $fdata);
    fclose($fdatabase);

    return $returnData;
  }
  public function updatereport($data){
  //Load the previous report
  //compare changes + write to log file
  //overwrite the report file
    $serverdatabase = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    $preReport = $serverdatabase["report"];
    /*echo "<pre>";
    echo "<h2>What we get from microprocessor:</h2>";
    var_dump($preReport);
    echo "</pre>";*/
    //$preReport = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    $diff["waterTankLevel"] = array_diff_assoc($data["waterTankLevel"], $preReport["waterTankLevel"]);
    $diff["status"] = array_diff_assoc($data["status"], $preReport["status"]);
    //write the difference of the 2 reports to the log file
    $LOG = fopen(INCLUDE_PATH . "/log.txt", "r+") or die("Unable to open log.txt!");
    //fread($LOG,filesize(INCLUDE_PATH . "/log.txt"));
    $logarray = json_decode(file_get_contents(INCLUDE_PATH . "/log.txt"), true);
    //check array size before appending,
    //if >= 300, the shift out the first element in array
    if (count($logarray) >= 300 ){
      //echo "Delete the following <br>";
      //echo json_encode(array_shift($logarray)) ."<br>";
      array_shift($logarray);
    }

    //append a new element to the logarray
    $logarray[] = array(
      'timestamp' => date("Y-m-d H:i:s"),
      'action' => array($diff["status"]),
      'status' => array($data["status"]),
      'waterTankLevel' => array($data["waterTankLevel"]),
      'reading' => array($data["reading"])
    );
    //only update if STATUS changes
    if (!empty($diff["status"])){
      file_put_contents(INCLUDE_PATH . "/log.txt", "");
      $log_txt = json_encode($logarray);
      fwrite($LOG, $log_txt);
    };

    fclose($LOG);

    //overwrite the report in the server database
    if (!empty($data)) {
      $serverdatabase["report"] = $data;
    }
    $freport = fopen(ROOTPATH . "/html/ajax/report.json", "w+") or die("Unable to open report.json!");
    $fdata = json_encode($serverdatabase);
    fwrite($freport, $fdata);
    fclose($freport);
    return;
  }
}


?>
