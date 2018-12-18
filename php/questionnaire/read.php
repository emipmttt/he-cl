<?php 

  require_once '../conn.php';

  $user = $_GET['user'];
  $campain = $_GET['campain'];
  $query= $_GET['query']; 
  
  switch ($query) {
    case '*':

      $getNumOfQuestionnaires = resultReadQuestionnaires($conn,$user,$campain);

      if($getNumOfQuestionnaires == false){
        $response->status = false;
        echo json_encode($response);
      } else {
        $response->status = true;
        $response->participants = $getNumOfQuestionnaires;
        echo json_encode($response);
      }
      break;

    case 'verify':

      $numberOfParticipants = $_GET['numberOfParticipants'];

      if( $numberOfParticipants == resultReadQuestionnaires($conn,$user,$title) ) {
        $response->status = false;
        echo json_encode($response);
      } else {
        $response->status = true;
        echo json_encode($response);
      }

      break;
  }

  function resultReadQuestionnaires ($conn,$user,$campain) {
    $sqlReadQuestionnaires = "SELECT id FROM questionnaires WHERE user = '{$user}' AND campain = '{$campain}' "; 
    $resultReadQuestionnaires = mysqli_query($conn, $sqlReadQuestionnaires);
    if (mysqli_num_rows($resultReadQuestionnaires) > 0) {
      return mysqli_num_rows($resultReadQuestionnaires);
    } else {
      return false;    
    }
  }
