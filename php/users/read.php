<?php
  require_once '../conn.php';

  $query = $_GET['query'];

  switch ($query) {
    case '*':

      $sql = "SELECT id,name,email,campains FROM users";
      $result = mysqli_query($conn, $sql);
      if (mysqli_num_rows($result) > 0) {
        $users = array();
        while($row = mysqli_fetch_assoc($result)) {
          array_push($users,$row);
        }
        $response->status = true;
        $response->users = $users;
        echo json_encode($response);
      } else {
        $response->status = false;
        $response->message = "No hay usuarios";
        echo json_encode($response);
      }

      break;
    case 'user':
      $sql = "SELECT id,name,email,campains FROM users WHERE id = '{$_SESSION['id']}'";
      $result = mysqli_query($conn, $sql);
      if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $response->status = true;
        $response->userData = $row;
        echo json_encode($response);
      } else {
        $response->status = false;
        $response->message = "El usuario no existe";
        $response->sql = $sql;
        echo json_encode($response);
      }
      break;
  }
