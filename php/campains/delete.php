<?php

  require_once '../conn.php';

  $user = $_POST['user'];

  $sqlFindUsers= "SELECT campains FROM users WHERE id = '{$user}' ";
  $resultFindUsers= mysqli_query($conn, $sqlFindUsers;
  if (mysqli_num_rows($resultFindUsers > 0) {
      $rowFindUsers= mysqli_fetch_assoc($resultFindUsers;
      $campains = json_decode($rowFindUsers'campains']);
      $tablesToDelete = array();
      foreach ($campains as &$campain) {
        $md5 = md5($user.'secretcodepez'.mb_strtolower($campain->title));
        array_push($tablesToDelete,'reactives_'+$md5);
      }
      unset($campain);

      $sqlUpdateCampains = "UPDATE users SET campains='{$campains}' WHERE id = '{$user}' ";
      if (mysqli_query($conn, $sqlUpdateCampains)) {
        $sqlCreateTable = "CREATE TABLE reactives_{$md5} LIKE reactives";
        if (mysqli_query($conn, $sqlCreateTable)) {

          $sqlInsertDataToNewTable = "INSERT INTO reactives_{$md5} SELECT * FROM reactives";
          if (mysqli_query($conn, $sqlInsertDataToNewTable)) {
            $response->status = true;
            $response->message = "Se ha creado la campaña con exito";
            $response->user = $user;
            echo json_encode($response);
          }
          else {
            $response->status = false;
            $response->message = "No pudo ingresar los datos, intentelo de nuevo más tarde";
            echo json_encode($response);
          }

        } else {
          $response->status = false;
          $response->message = "No pudo clonar el cuestionario, intentelo de nuevo más tarde";
          echo json_encode($response);
        }
      } else {
        $response->status = false;
        $response->message = "No se pudo actualizar el listado de campañas";
        echo json_encode($response);
      }
  } else {
      $response->status = false;
      $response->message = "No existe este usuario";
      echo json_encode($response);
  }
