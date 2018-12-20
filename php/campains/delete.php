<?php

  require_once '../conn.php';

  $user = $_POST['user'];
  $campain = $_POST['campain'];
  $newCampains = json_encode($_POST['newCampains'],JSON_UNESCAPED_UNICODE);

  $sqlDeleteQuestionnaires = "DELETE FROM questionnaires WHERE user = '{$user}' AND campain = '{$campain}' ";
  if (mysqli_query($conn, $sqlDeleteQuestionnaires)) {
    $md5 = md5($user.'secretcodepez'.mb_strtolower($campain));

    $sqlDeleteTables = "DROP TABLE IF EXISTS {$md5}";
      if (mysqli_query($conn, $sqlDeleteTables)) {

        $sqlUpdateUserCampains = "UPDATE users SET campains='{$newCampains}' WHERE id = '{$user}' ";
        if (mysqli_query($conn, $sqlUpdateUserCampains)) {
          $response->status = true;
          $response->message = "Se ha eliminado el diagnóstico correctamente";
          echo json_encode($response);  
        } else {
          $response->status = false;
          $response->message = "No se ha podido actualizar la lista de diagnósticos";
          echo json_encode($response);
        }     

      } else {
        $response->status = false;
        $response->message = "Ha ocurrido un error al intentar eliminar las tablas del usuario";
        $response->tables = $sqlDeleteTables;
        echo json_encode($response);
      }

  } else {
    $response->status = false;
    $response->message = "No se han podido eliminar los datos";
    $response->message = "No se han podido eliminar los datos";
    echo json_encode($response);

  }