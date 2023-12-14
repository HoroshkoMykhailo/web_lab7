<?php
    $servername = "localhost";
    $username = "MykhailoHoroshko";
    $password = "D1vt10092005.";
    $dbname = "id21671045_actions"
    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "SELECT * FROM actions ";
    if ($conn->connect_error) {
        die("Connection error: " . $conn->connect_error);
    }
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    
        header('Content-Type: application/json');
        echo json_encode($data);
    }
    $conn->close();
?>