<?php

  require_once '../conn.php';

  $user = $_POST['user'];
  $campains = $_POST['campains'];


  $sql = "UPDATE users SET campains = '{$campains}' WHERE id = '{$user}' ";
  if (mysqli_query($conn, $sql)) {
    $response->status = true;
    $response->message = "Se ha modificado el diagnóstico correctamente";
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = "Ha ocurrido un error al modificar el estado del diagnóstico";
    echo json_encode($response);
  }
