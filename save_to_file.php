<?php
    $input = file_get_contents('php://input');
    // Дані для підключення
    $servername = "localhost";
    $username = "****";
    $password = "******";
    $dbname = "id21671045_actions";

    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "INSERT INTO `actions` (`action`, `time`) VALUES ('$input', current_timestamp())";


    if ($conn->connect_error) {
        die("Connection error: " . $conn->connect_error);
    }
    $conn->query($sql);
    $conn->close();
?>