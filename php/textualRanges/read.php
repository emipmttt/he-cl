<?php
  require_once '../conn.php';

  $query = $_GET['query'];
  $dependency = $_GET['dependency'];
  $typeDependency = $_GET['typeDependency'];
  $sqlReadTextualRanges = "SELECT * FROM textualRanges WHERE dependency = '{$dependency}' AND typeDependency = '{$typeDependency}' ORDER BY id DESC";

  switch ($query) {
    case '*':      
        $textualRanges = readTextualRanges($sqlReadTextualRanges,$conn);
        if (!$textualRanges) {
          $response->status = false;
          $response->textualRanges = [];
          echo json_encode($response);
        } else{
          $response->status = true;
          $response->textualRanges = $textualRanges;
          echo json_encode($response);
        }
      
      break;
  }

  function readTextualRanges ($sqlReadTextualRanges,$conn) {
    $resultReadTextualRanges = mysqli_query($conn, $sqlReadTextualRanges);
    if (mysqli_num_rows($resultReadTextualRanges) > 0) {
      $textualRanges = [];
      while($rowReadTextualRanges = mysqli_fetch_assoc($resultReadTextualRanges)) {
        array_push($textualRanges,$rowReadTextualRanges);
      }
      return $textualRanges;
    } else {
      return false;
    }

  }