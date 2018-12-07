<?php
  require_once '../conn.php';

  $query = $_GET['query'];
  $sqlReadAspects = "SELECT * FROM aspects ORDER BY id DESC";

  switch ($query) {
    case '*':      
        $aspects = readAspects($sqlReadAspects,$conn);
        if (!$aspects) {
          $response->status = false;
          $response->aspects = [];
          echo json_encode($response);
        } else{
          $response->status = true;
          $response->aspects = $aspects;
          echo json_encode($response);
        }
      
      break;
  }

  function readAspects ($sqlReadAspects,$conn) {
    $resultReadAspects = mysqli_query($conn, $sqlReadAspects);
    if (mysqli_num_rows($resultReadAspects) > 0) {
      $aspects = [];
      while($rowReadAspects = mysqli_fetch_assoc($resultReadAspects)) {
        array_push($aspects,$rowReadAspects);
      }
      return $aspects;
    } else {
      return false;
    }

  }