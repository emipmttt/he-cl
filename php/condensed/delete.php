<?php 

  require_once '../conn.php';
  require_once 'read.php';

  $id = $_POST['id'];

  $sqlDeleteCondensed = "DELETE FROM condensed WHERE id = '{$id}' ";
  if (mysqli_query($conn, $sqlDeleteCondensed)) {
    $response->status = true;
    $response->message = 'Aspecto eliminado correctamente';
    $response->condensed = readCondensed($sqlReadCondensed,$conn);
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = 'Algo salió mal, intentalo nuevamente más tarde';
    echo json_encode($response);
  }
