<?php
  require_once '../conn.php';

  $query = $_GET['query'];
  $sqlReadCondensed = "SELECT * FROM condensed ORDER BY id DESC";

  switch ($query) {
    case '*':      
        $condensed = readCondensed($sqlReadCondensed,$conn);
        if (!$condensed) {
          $response->status = false;
          $response->condensed = [];
          echo json_encode($response);
        } else{
          $response->status = true;
          $response->condensed = $condensed;
          echo json_encode($response);
        }
      
      break;
  }

  function readCondensed ($sqlReadCondensed,$conn) {
    $resultReadCondensed = mysqli_query($conn, $sqlReadCondensed);
    if (mysqli_num_rows($resultReadCondensed) > 0) {
      $condensed = [];
      while($rowReadCondensed = mysqli_fetch_assoc($resultReadCondensed)) {
        array_push($condensed,$rowReadCondensed);
      }
      return $condensed;
    } else {
      return false;
    }

  }