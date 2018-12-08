<?php 

  require_once '../conn.php';
  require_once 'read.php';

  $title = $_POST['title'];
  $aspects = $_POST['aspects'];

  $sqlCreateCondensed = "INSERT INTO condensed (title,aspects) VALUES ('{$title}','{$aspects}')";
  if (mysqli_query($conn, $sqlCreateCondensed)) {
    $response->status = true;
    $response->message = 'Condensado creado correctamente';
    $response->condensed = readCondensed($sqlReadCondensed,$conn);
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = 'Algo salió mal, intentalo nuevamente más tarde';
    echo json_encode($response);
  }
