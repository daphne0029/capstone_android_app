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
  public function keyincrement() {
    $serverdatabase = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    $fdatabase = fopen(ROOTPATH . "/html/ajax/report.json", "w+") or die("Unable to open report.json!");
    $KEY = $serverdatabase["keydata"]["key"];

    $intkey = intval($KEY);
    $intkey += 1;
    if ($intkey>=1000){
      $intkey = 0;
    }
    $KEY = sprintf('%03d', $intkey);
    $serverdatabase["keydata"]["key"] = $KEY;
    $serverdatabase["keydata"]["confirm"] = false;

    $fdata = json_encode($serverdatabase);
    fwrite($fdatabase, $fdata);
    fclose($fdatabase);
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
    $this->keyincrement();
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
    $this->keyincrement();
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
    $this->keyincrement();
    $serverdatabase = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    $fdatabase = fopen(ROOTPATH . "/html/ajax/report.json", "w+") or die("Unable to open report.json!");

    $serverdatabase["appdata"]["action"]["lightB"] = $data["lightB"];

    $fdata = json_encode($serverdatabase);
    fwrite($fdatabase, $fdata);
    fclose($fdatabase);
    return true;
  }
  public function toggleredlight($data) {
    $this->keyincrement();
    $serverdatabase = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);
    $fdatabase = fopen(ROOTPATH . "/html/ajax/report.json", "w+") or die("Unable to open report.json!");

    $serverdatabase["appdata"]["action"]["lightR"] = $data["lightR"];

    $fdata = json_encode($serverdatabase);
    fwrite($fdatabase, $fdata);
    fclose($fdatabase);
    return true;
  }
  public function pumpwater($data) {
    $this->keyincrement();
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
    $serverdatabase = json_decode(file_get_contents(ROOTPATH . '/html/ajax/report.json'), true);

    $currentKEY= $serverdatabase["keydata"]["currentkey"];
    $confirm = $serverdatabase["keydata"]["confirm"];
    $confirmTS = $serverdatabase["keydata"]["confirmTS"];
    //Load the previous report
    //compare changes + write to log file
    //overwrite (save) the report file

    //Parse the data string to object
    //$datastr = "{0,1,low,0,0,1,0,0,27,40,10,10000}";
    $datastr = $data;
    $datastr = str_replace("{","",$datastr);
    $datastr = str_replace("}","",$datastr);
    $flattenArray = explode(",", $datastr);
    $dataArray["status"] = array();
    $dataArray["waterTankLevel"] = array();
    $dataArray["reading"] = array();

    $dataArray["status"] = array(
      "pumping"=>($flattenArray[0] === '1'),
      "heating"=>($flattenArray[1] === '1'),
      "LightW"=>$flattenArray[2],
      "LightB"=>($flattenArray[3] === '1'),
      "LightR"=>($flattenArray[4] === '1')
    );
    $dataArray["waterTankLevel"] = array(
      "below50"=>($flattenArray[5] === '1'),
      "below20"=>($flattenArray[6] === '1'),
      "empty"=>($flattenArray[7] === '1')
    );
    $dataArray["reading"] = array(
      "temperature"=>$flattenArray[8],
      "airHumidity"=>$flattenArray[9],
      "soilHumidity"=>$flattenArray[10],
      "lux"=>$flattenArray[11]
    );
    $dataArray["key"] = $flattenArray[12];

    //Comare if $dataArray["key"] is same as the key in databases
    //echo "Key received is " . (int)$dataArray["key"] . ", should be " . (int)$currentKEY . "<br>";

    if((int)$currentKEY == (int)$dataArray["key"]){
      //echo "update app <br>";
      $confirm = true;
      $confirmTS = date("Y-m-d H:i:s");
      //only update report when key matches
      $this->updatereport($dataArray);
      //Write pump action back to false
      $serverdatabase["appdata"]["action"]["pump"] = false;
    }else{
      //echo "Do NOT update app <br>";
      $confirm = false;
    }

    $fdatabase = fopen(ROOTPATH . "/html/ajax/report.json", "w+") or die("Unable to open report.json!");
    $serverdatabase["keydata"]["confirm"] = $confirm;
    $serverdatabase["keydata"]["confirmTS"] = $confirmTS;
    $fdata = json_encode($serverdatabase);
    fwrite($fdatabase, $fdata);
    fclose($fdatabase);

    /*$testarray = json_encode($dataArray);
    var_dump($testarray);
    echo "<br><br>";*/
    //================
    //$this->updatereport($data);


    //$returnData = $this->getReturnInfo($data);
    $returnData = $this->getReturnInfo($dataArray);

    return $returnData;//has to be a php array
  }
  public function getReturnInfo($data){
    //echo "KEY = " . $this->KEY . "<br>";
    $flattenData = array();
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
    $KEY = $serverdatabase["keydata"]["key"];
    $appData = $serverdatabase["appdata"];
    $plantid = $appData["selectedid"];
    $plantspecs = json_decode(file_get_contents(ROOTPATH . '/html/ajax/PlantSpecs.json'), true);
    $returnData["growing"] = $plantspecs["plantsArray"][$plantid];
    unset($returnData["growing"]["profileImg"]);
    unset($returnData["growing"]["species"]);

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

    //Save current key
    $serverdatabase["keydata"]["currentkey"] = $KEY;

    $flattenData = $this->flattenArray($returnData["profile"],$flattenData);
    $flattenData = $this->flattenArray($returnData["action"],$flattenData);
    foreach($returnData["growing"] as $value){
      $flattenData[] = $value;
    };
    //var_dump($flattenData);
    $returnStr = '{' . implode(',' , $flattenData) . "," . $serverdatabase["keydata"]["currentkey"] .'}';
    //var_dump($returnStr);

    $fdata = json_encode($serverdatabase);
    fwrite($fdatabase, $fdata);
    fclose($fdatabase);

    return $returnStr;
  }
  public function flattenArray($oldA,$newA){
    foreach($oldA as $value){
      if($value){
        $newA[] = 1;
      }else{
        $newA[] = 0;
      };
    };
    return $newA;
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
