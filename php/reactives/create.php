<?php 

  require_once '../conn.php';
  require_once 'read.php';

  $title = $_POST['title'];
  $answersList = $_POST['answersList'];
  $timer = $_POST['timer'];

  $sqlCreateReactives = "INSERT INTO reactives (title, answersList, timer) VALUES ('{$title}', '{$answersList}', '{$timer}')";
  if (mysqli_query($conn, $sqlCreateReactives)) {
    $response->status = true;
    $response->message = 'Reactivo creado correctamente';
    $response->reactives = readReactives($sqlReadReactives,$conn);
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = 'Algo salió mal, intentalo nuevamente más tarde';
    echo json_encode($response);
  }
