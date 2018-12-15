<?php

  require '../conn.php';

  $user = htmlentities($_POST['user'], ENT_QUOTES,'UTF-8');
  $title = htmlentities($_POST['title'], ENT_QUOTES,'UTF-8');
  $entitie = htmlentities($_POST['entitie'], ENT_QUOTES,'UTF-8');
  $area = htmlentities($_POST['area'], ENT_QUOTES,'UTF-8');
  $turn = htmlentities($_POST['turn'], ENT_QUOTES,'UTF-8');
  $gender = htmlentities($_POST['gender'], ENT_QUOTES,'UTF-8');
  $age = htmlentities($_POST['age'], ENT_QUOTES,'UTF-8');
  $antiquity = htmlentities($_POST['antiquity'], ENT_QUOTES,'UTF-8');
  $studies = htmlentities($_POST['studies'], ENT_QUOTES,'UTF-8');
  $suggestion = htmlentities($_POST['suggestion'], ENT_QUOTES,'UTF-8');
  $aspects = json_encode(json_decode($_POST['aspects']),JSON_UNESCAPED_UNICODE);

  $sql = "INSERT INTO questionnaires (user,campain,entitie,area,turn,gender,age,antiquity,studies,suggestion,aspects)
  VALUES ('{$user}','{$title}','{$entitie}','{$area}','{$turn}','{$gender}','{$age}','{$antiquity}','{$studies}','{$suggestion}','{$aspects}')";
  if(mysqli_query($conn, $sql)){
    $response->status = true;
    $response->message = "¡Has concluído el cuestionario!";
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = "¡Ha ocurrido un error al guardar tu cuestionario!";
    $response->sql = $sql;
    $response->aspects = $aspects;
    echo json_encode($response);
  }
