<?php
    $input = file_get_contents('php://input');
    $servername = "localhost";
    $username = "MykhailoHoroshko";
    $password = "D1vt10092005.";
    $dbname = "id21671045_actions"
    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "INSERT INTO actions (action) VALUES ('$input')";
    if ($conn->connect_error) {
        die("Connection error: " . $conn->connect_error);
    }
    $conn->query($sql);
    $conn->close();
?>
