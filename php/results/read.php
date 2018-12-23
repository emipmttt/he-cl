<?php

  require_once '../conn.php';

  $category = $_POST['category'];
  $title = $_POST['title'];
  $user = $_POST['user'];

  $sql = "SELECT * FROM questionnaires WHERE user = '{$user}' AND title = '{$title}' AND category = {$category} "; 
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $questionnaires = array();
    while($row = mysqli_fetch_assoc($result)) {
      array_push($questionnaires,$row);
    }
    $response->status = true;
    $response->questionnaires = $questionnaires;
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = "Este diagnóstico aún no recibe respuestas";
    echo json_encode($response);
  }