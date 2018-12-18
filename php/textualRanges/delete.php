<?php 

  require_once '../conn.php';
  require_once 'read.php';

  $id = $_POST['id'];

  $sqlDeleteTextualRanges = "DELETE FROM textualRanges WHERE id = '{$id}' ";
  if (mysqli_query($conn, $sqlDeleteTextualRanges)) {
    $response->status = true;
    $response->message = 'Rango eliminado correctamente';
    $response->textualRanges = readTextualRanges($sqlReadTextualRanges,$conn);
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = 'Algo salió mal, intentalo nuevamente más tarde';
    echo json_encode($response);
  }
