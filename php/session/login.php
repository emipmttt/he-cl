<?php

  require '../conn.php';

  $email = $_POST['email'];
  $password = $_POST['password'];

  $sqlFindAccount = "SELECT * FROM users WHERE email = '{$email}' "; 
  $resultFindAccount = mysqli_query($conn, $sqlFindAccount);
  if (mysqli_num_rows($resultFindAccount) > 0) {

    $rowFindAccount = mysqli_fetch_assoc($resultFindAccount); 
    
    if (password_verify($password,$rowFindAccount['password'])) {

      $_SESSION['id'] = $rowFindAccount['id'];
      $_SESSION['name'] = $rowFindAccount['name'];
      $_SESSION['email'] = $email;

      $response->status = true;
      $response->message = "Bienvenido";
      $response->userData = $_SESSION;
      echo json_encode($response);
      
    } else {

      $response->status = false;
      $response->message = "Correo electrónico o contraseña incorrectos";
      echo json_encode($response);

    }

  } else {

    $response->status = false;
    $response->message = "No se encontró una cuenta registrada con ese correo electrónico";
    echo json_encode($response);

  }

?>