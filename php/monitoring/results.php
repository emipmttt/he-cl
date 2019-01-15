<?php

require_once '../conn.php';

$user = $_GET['user'];
$campain = $_GET['campain'];

$sql = "SELECT * FROM questionnaires WHERE user = '{$user}' AND campain = '{$campain}'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    $sqlAspects = "SELECT * FROM aspects";
    $resultAspects = mysqli_query($conn, $sqlAspects);
    if (mysqli_num_rows($resultAspects) > 0) {

        $sqlCondensed = "SELECT * FROM condensed";
        $resultCondensed = mysqli_query($conn, $sqlCondensed);
        if (mysqli_num_rows($resultCondensed) > 0) {

            $sqlTextualRanges = "SELECT * FROM textualRanges";
            $resultTextualRanges = mysqli_query($conn, $sqlTextualRanges);
            if (mysqli_num_rows($resultTextualRanges) > 0) {

                $questionnaires = [];

                while ($row = mysqli_fetch_assoc($result)) {
                    array_push($questionnaires, $row);
                }

                $aspects = [];

                while ($rowAspects = mysqli_fetch_assoc($resultAspects)) {
                    array_push($aspects, $rowAspects);
                }

                $condensed = [];

                while ($rowCondensed = mysqli_fetch_assoc($resultCondensed)) {
                    array_push($condensed, $rowCondensed);
                }

                $textualRanges = [];

                while ($rowTextualRanges = mysqli_fetch_assoc($resultTextualRanges)) {
                    array_push($textualRanges, $rowTextualRanges);
                }

                $response->status = true;
                $response->questionnaires = $questionnaires;
                $response->aspects = $aspects;
                $response->condensed = $condensed;
                $response->textualRanges = $textualRanges;
                echo json_encode($response);

            } else {
                $response->status = false;
                $response->message = "No hay aspectos";
                $response->sql = $sql;
                echo json_encode($response);
            }

        } else {
            $response->status = false;
            $response->message = "No hay aspectos";
            $response->sql = $sql;
            echo json_encode($response);
        }

    } else {
        $response->status = false;
        $response->message = "No hay aspectos";
        $response->sql = $sql;
        echo json_encode($response);
    }

} else {
    $response->status = false;
    $response->message = "Todavía no hay participantes";
    $response->sql = $sql;
    echo json_encode($response);
}
