<?php
require_once '../conn.php';

$query = $_GET['query'];
$sqlReadReactives = "SELECT * FROM reactives ORDER BY id ASC";

switch ($query) {
    case '*':
        $reactives = readReactives($sqlReadReactives, $conn);
        if (!$reactives) {
            $response->status = false;
            $response->reactives = [];
            echo json_encode($response);
        } else {
            $response->status = true;
            $response->reactives = $reactives;
            echo json_encode($response);
        }

        break;
}

function readReactives($sqlReadReactives, $conn)
{
    $resultReadReactives = mysqli_query($conn, $sqlReadReactives);
    if (mysqli_num_rows($resultReadReactives) > 0) {
        $reactives = [];
        while ($rowReadReactives = mysqli_fetch_assoc($resultReadReactives)) {
            array_push($reactives, $rowReadReactives);
        }
        return $reactives;
    } else {
        return false;
    }
}
