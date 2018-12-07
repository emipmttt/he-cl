<?php 

  require_once '../conn.php';
  require_once 'read.php';

  $id = $_POST['id'];

  $sqlDeleteAspects = "DELETE FROM aspects WHERE id = '{$id}' ";
  if (mysqli_query($conn, $sqlDeleteAspects)) {
    $response->status = true;
    $response->message = 'Aspecto eliminado correctamente'; 
    $response->aspects = readAspects($sqlReadAspects,$conn);
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = 'Algo salió mal, intentalo nuevamente más tarde';
    echo json_encode($response);
  }

