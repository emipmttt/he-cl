<?php 

  require_once '../conn.php';
  require_once 'read.php';

  $id = $_POST['id'];
  $title = $_POST['title'];
  $aspects = $_POST['aspects'];

  $sqlUpdateCondensed = "UPDATE condensed SET title = '{$title}', aspects = '{$aspects}' WHERE id = '{$id}' ";
  if (mysqli_query($conn, $sqlUpdateCondensed)) {
    $response->status = true;
    $response->message = 'Aspecto actualizado correctamente';
    $response->condensed = readCondensed($sqlReadCondensed,$conn);
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = 'Algo salió mal, intentalo nuevamente más tarde';
    echo json_encode($response);
  }
