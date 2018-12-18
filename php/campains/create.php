<?php

  require_once '../conn.php';

  $user = intval($_POST['user']);
  $title = $_POST['title'];
  $entities = $_POST['entities'];
  $numberOfParticipants = $_POST['numberOfParticipants'];
  $md5 = md5($user.'secretcodepez'.mb_strtolower($title));
  $userCode = date("myd") . rand(100,999);

  $sqlFindCampains = "SELECT campains FROM users WHERE id = '{$user}' ";
  $resultFindCampains = mysqli_query($conn, $sqlFindCampains);
  if (mysqli_num_rows($resultFindCampains) > 0) {
      $rowFindCampains = mysqli_fetch_assoc($resultFindCampains);
      $campains = json_decode($rowFindCampains['campains']);
      array_push($campains,array(
        "title" => $title,
        "numberOfParticipants" => $numberOfParticipants,
        "status" => false,
        "userCode" => $userCode,
        "entities"=>$entities
      ));

      $campains = json_encode($campains,JSON_UNESCAPED_UNICODE);

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
