<?php

  require '../conn.php';

  $name = $_POST['name'];
  $email = $_POST['email'];
  $password = password_hash($_POST['password'],PASSWORD_DEFAULT);

  $sqlVerifyAccount = "SELECT * FROM users WHERE email = '{$email}' ";
  $resultVerifyAccount = mysqli_query($conn, $sqlVerifyAccount);

  if (mysqli_num_rows($resultVerifyAccount) > 0) {

   $rowVerifyAccount = mysqli_fetch_assoc($resultVerifyAccount);

   $response->status = false;
   $response->message = "Ya se está utilizando correo electrónico en otra cuenta";
   echo json_encode($response);

  } else {

    $sqlCreateAccount = "INSERT INTO users (name, email, password)
    VALUES ('{$name}', '{$email}', '{$password}')";
    if (mysqli_query($conn, $sqlCreateAccount)) {

      $sqlGetId = "SELECT * FROM users WHERE email = '{$email}' ";
      $resultGetId = mysqli_query($conn, $sqlGetId);
      if (mysqli_num_rows($resultGetId) > 0) {

        $rowGetId = mysqli_fetch_assoc($resultGetId);

        $_SESSION['id'] = $rowGetId['id'];
        $_SESSION['campains'] = $rowGetId['campains'];
        $_SESSION['type'] = $rowGetId['type'];
        $_SESSION['name'] = $name;
        $_SESSION['email'] = $email;

        $response->status = true;
        $response->message = "Bienvenido";
        $response->userData = $_SESSION;
        echo json_encode($response);

      } else {

        $response->status = false;
        $response->message = "Ha ocurrido un error al obtener tus datos.";
        echo json_encode($response);

      }

    } else {

      $response->status = false;
      $response->message = "Ha ocurrido un error al crear, cuenta intentalo más tarde.";
      echo json_encode($response);

    }

  }


?>
