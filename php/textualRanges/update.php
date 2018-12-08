<?php 

  require_once '../conn.php';
  require_once 'read.php';

  $id = $_POST['id'];
  $diagnosis = $_POST['diagnosis'];
  $recommendations = $_POST['recommendations'];
  $rangeNum = $_POST['rangeNum'];
  $typeDependency = $_POST['typeDependency'];
  $dependency = $_POST['dependency'];


  $sqlFindDoubleTextualRange = "SELECT * FROM textualRanges WHERE typeDependency = '{$typeDependency}' AND dependency = '{$dependency}' AND rangeNum = '{$rangeNum}' ";
  $resultFindDoubleTextualRange = mysqli_query($conn, $sqlFindDoubleTextualRange);
  if (mysqli_num_rows($resultFindDoubleTextualRange) > 0) {
    $response->status = false;
    $response->message = "Campos repetidos, revisa la información";
    echo json_encode($response);
  } else {
    $sqlUpdateTextualRanges = "UPDATE textualRanges SET diagnosis = '{$diagnosis}', recommendations = '{$recommendations}', rangeNum='{$rangeNum}' WHERE id = '{$id}' ";
    if (mysqli_query($conn, $sqlUpdateTextualRanges)) {
      $response->status = true;
      $response->message = 'Rango actualizado correctamente';
      $response->textualRanges = readTextualRanges($sqlReadTextualRanges,$conn);
      echo json_encode($response);
    } else {
      $response->status = false;
      $response->message = 'Algo salió mal, intentalo nuevamente más tarde';
      echo json_encode($response);
    }
  }
