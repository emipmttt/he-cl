<?php 

  require '../conn.php';

  $user = $_GET['user'];
  $campain = $_GET['campain'];

  $sql = "SELECT id FROM questionnaires WHERE user = '{$user}' AND campain = '{$campain}' "; 
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $response->status = true;
    $response->participants = mysqli_num_rows($result);
    echo json_encode($response);
  } else {
    $response->status = false;
    echo json_encode($response);
  }