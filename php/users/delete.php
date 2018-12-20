<?php

  require '../conn.php';

  $user = $_POST['user'];

  $sqlFindUsers= "SELECT * FROM users WHERE id = '{$user}' ";
  $resultFindUsers = mysqli_query($conn, $sqlFindUsers);
  if (mysqli_num_rows($resultFindUsers) > 0) {
      $rowFindUsers = mysqli_fetch_assoc($resultFindUsers);
      $campains = json_decode($rowFindUsers['campains']);
      $tablesToDelete = array();
      foreach ($campains as $campain) {
        $md5 = md5($user.'secretcodepez'.mb_strtolower($campain['title']));
        array_push($tablesToDelete,('reactives_'.$md5));
        mysqli_query($conn, "DELETE FROM questionnaires WHERE user = '{$user}' AND campain = '{$campain}' ");
      }
      unset($campain);
      $tablesToDelete = implode(",",$tablesToDelete);

      $sqlDeleteTables = "DROP TABLE IF EXISTS {$tablesToDelete}";
      if (mysqli_query($conn, $sqlDeleteTables)) {

        $sqlDeleteUsers = "DELETE FROM users WHERE id = '{$user}'";
        if (mysqli_query($conn, $sqlDeleteUsers)) {
          $response->status = true;
          $response->message = "Se ha eliminado el usuario correctamente";
          echo json_encode($response);
        } else {
          $response->status = false;
          $response->message = "Ha ocurrido un error al intentar eliminar el usuario";
          $response->Users = $sqlDeleteUsers;
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
      $response->message = "No existe este usuario";
      $response->sql = $sqlFindUsers;
      echo json_encode($response);
  }
