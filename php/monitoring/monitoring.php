<?php

require_once '../conn.php';

$user = $_GET['user'];
$campain = $_GET['campain'];

$sql = "SELECT * FROM questionnaires WHERE user = '{$user}' AND campain = '{$campain}'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {

    $questionnaires = [];

    while ($row = mysqli_fetch_assoc($result)) {
        array_push($questionnaires, $row);
    }

    $response->status = true;
    $response->questionnaires = $questionnaires;
    echo json_encode($response);

} else {
    $response->status = false;
    $response->message = "Todavía no hay participantes";
    echo json_encode($response);
}
