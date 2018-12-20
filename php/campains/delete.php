<?php

  require_once '../conn.php';

  $user = $_POST['user'];
  $campain = $_POST['campain'];

  $sqlDeleteQuestionnaires = "DELETE FROM questionnaires WHERE user = '{$user}' AND campain = '{$campain}' ";
  if (mysqli_query($conn, $sql)) {
    $md5 = md5($user.'secretcodepez'.mb_strtolower($campain));

    $sqlDeleteTables = "DROP TABLE IF EXISTS {$md5}";
      if (mysqli_query($conn, $sqlDeleteTables)) {

          $response->status = true;
          $response->message = "Se ha eliminado el diagnóstico correctamente";
          echo json_encode($response);    

      } else {
        $response->status = false;
        $response->message = "Ha ocurrido un error al intentar eliminar las tablas del usuario";
        $response->tables = $sqlDeleteTables;
        echo json_encode($response);
      }

  } else {
    $response->status = false;
    $response->message = "No se han podido eliminar los datos";
    echo json_encode($response);

  }