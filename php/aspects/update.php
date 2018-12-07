<?php 

  require_once '../conn.php';
  require_once 'read.php';

  $id = $_POST['id'];
  $title = $_POST['title'];

  $sqlUpdateAspects = "UPDATE aspects SET title = '{$title}' WHERE id = '{$id}' ";
  if (mysqli_query($conn, $sqlUpdateAspects)) {
    $response->status = true;
    $response->message = 'Aspecto actualizado correctamente'; 
    $response->aspects = readAspects($sqlReadAspects,$conn);
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = 'Algo salió mal, intentalo nuevamente más tarde';
    echo json_encode($response);
  }