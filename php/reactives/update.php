<?php 

  require_once '../conn.php';
  require_once 'read.php';

  $id = $_POST['id'];
  $title = $_POST['title'];
  $answersList = $_POST['answersList'];
  $timer = $_POST['timer'];

  $sqlUpdateReactives = "UPDATE reactives SET title = '{$title}', answersList = '{$answersList}', timer = '{$timer}' WHERE id = '{$id}' ";
  if (mysqli_query($conn, $sqlUpdateReactives)) {
    $response->status = true;
    $response->message = 'Reactivo actualizado correctamente'; 
    $response->reactives = readReactives($sqlReadReactives,$conn);
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = 'Algo salió mal, intentalo nuevamente más tarde';
    echo json_encode($response);
  }