<?php

  require_once '../conn.php';

  $user = $_POST['user'];
  $campains = $_POST['campains'];


  $sql = "UPDATE users SET campains = '{$campains}' WHERE id = '{$user}' ";
  if (mysqli_query($conn, $sql)) {
      $response->status = true;
      echo json_encode($response);
  } else {
    $response->status = false;
    echo json_encode($response);
  }
