<?php 

  require_once '../conn.php';
  require_once 'read.php';

  $dependency = $_POST['dependency'];
  $diagnosis = $_POST['diagnosis'];
  $recommendations = $_POST['recommendations'];
  $rangeNum = $_POST['rangeNum'];
  $typeDependency = $_POST['typeDependency'];

  $sqlFindDoubleTextualRange = "SELECT * FROM textualRanges WHERE typeDependency = '{$typeDependency}' AND dependency = '{$dependency}' AND rangeNum = '{$rangeNum}' "; 
  $resultFindDoubleTextualRange = mysqli_query($conn, $sqlFindDoubleTextualRange);
  if (mysqli_num_rows($resultFindDoubleTextualRange) > 0) {
    $response->status = false;
    $response->message = "Campos repetidos, revisa la información";
    echo json_encode($response);
  } else {
    $sqlCreateTextualRange = "INSERT INTO textualRanges (dependency,diagnosis,recommendations,rangeNum,typeDependency) VALUES ('{$dependency}','{$diagnosis}','{$recommendations}','{$rangeNum}','{$typeDependency}')";
    if (mysqli_query($conn, $sqlCreateTextualRange)) {
      $response->status = true;
      $response->message = 'Rango creado correctamente'; 
      $response->aspects = readTextualRanges($sqlReadtextualRange,$conn);
      echo json_encode($response);
    } else {
      $response->status = false;
      $response->message = 'Algo salió mal, intentalo nuevamente más tarde';
      $response->sql = $sqlCreateTextualRange;
      echo json_encode($response);
    }
  }