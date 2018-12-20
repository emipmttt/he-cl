<?php

  require_once '../conn.php';

  $user = $_POST['user'];
  $campain = $_POST['campain'];
  $index = $_POST['index'];

  $sqlDeleteQuestionnaires = "DELETE FROM questionnaires WHERE user = '{$user}' AND campain = '{$campain}' ";
  if (mysqli_query($conn, $sqlDeleteQuestionnaires)) {
    $md5 = md5($user.'secretcodepez'.mb_strtolower($campain));

    $sqlDeleteTables = "DROP TABLE IF EXISTS reactives_{$md5}";
      if (mysqli_query($conn, $sqlDeleteTables)) {

        $sqlFindUser = "SELECT campains FROM users WHERE id = '{$user}' "; 
        $resultFindUser = mysqli_query($conn, $sqlFindUser);
        if (mysqli_num_rows($resultFindUser) > 0) {
          $rowFindUser= mysqli_fetch_assoc($resultFindUser);

          $campains = json_decode($rowFindUser['campains']);
          if (is_array($campains)){
            unset($campains[$index]);
            array_values($campains);
            $campains = json_encode($campains,JSON_UNESCAPED_UNICODE);
          } else {
            $campains = json_encode(array(),JSON_UNESCAPED_UNICODE);
          }

          $sqlUpdateUserCampains = "UPDATE users SET campains='{$campains}' WHERE id = '{$user}' ";
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
          $response->message = "No se ha podido encontrar el usuario";
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
    echo json_encode($response);

  }