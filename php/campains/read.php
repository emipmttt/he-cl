<?php

  require_once '../conn.php';

  $query = $_GET['query'];

  switch ($query) {
    case '*':

      $user = $_GET['user'];
      $title = $_GET['campain'];
      $md5 = md5($user."secretcodepez".mb_strtolower($title));
      $sqlReadReactives = "SELECT * FROM reactives_{$md5} ORDER BY id DESC";
      $reactives = readReactives($sqlReadReactives,$conn);
      if (!$reactives) {
        $response->status = false;
        $response->reactives = [];
        $response->campains = readUser($conn, $user);
        echo json_encode($response);
      } else{
        $response->status = true;
        $response->reactives = $reactives;
        echo json_encode($response);
      }
      break;

    default:
      // code...
      break;
  }

  function readReactives ($sqlReadReactives,$conn) {
    $resultReadReactives = mysqli_query($conn, $sqlReadReactives);
    if (mysqli_num_rows($resultReadReactives) > 0) {
      $reactives = [];
      while($rowReadReactives = mysqli_fetch_assoc($resultReadReactives)) {
        array_push($reactives,$rowReadReactives);
      }
      return $reactives;
    } else {
      return false;
    }
  }

  function readUser ($conn, $user) {
    $resultReadReactives = mysqli_query($conn, "SELECT campains FROM users WHERE id = '{$user}' ");
    if (mysqli_num_rows($resultReadReactives) > 0) {
      $rowReadReactives = mysqli_fetch_assoc($resultReadReactives);
      return $rowReadReactives;
    } else {
      return false;
    }
  }
