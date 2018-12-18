<?php 

  require_once '../conn.php';
  require_once 'read.php';

  $id = $_POST['id'];

  $sqlDeleteReactives = "DELETE FROM reactives WHERE id = '{$id}' ";
  if (mysqli_query($conn, $sqlDeleteReactives)) {
    $response->status = true;
    $response->message = 'Reactivo eliminado correctamente';
    $response->reactives = readReactives($sqlReadReactives,$conn);
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = 'Algo salió mal, intentalo nuevamente más tarde';
    echo json_encode($response);
  }
