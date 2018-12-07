<?php 

  require_once '../conn.php';
  require_once 'read.php';

  $title = $_POST['title'];

  $sqlCreateAspects = "INSERT INTO aspects (title) VALUES ('{$title}')";
  if (mysqli_query($conn, $sqlCreateAspects)) {
    $response->status = true;
    $response->message = 'Aspecto creado correctamente'; 
    $response->aspects = readAspects($sqlReadAspects,$conn);
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = 'Algo salió mal, intentalo nuevamente más tarde';
    echo json_encode($response);
  }