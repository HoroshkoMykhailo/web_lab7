<?php
    // Дані для підключення
    $servername = "localhost";
    $username = "****";
    $password = "******";
    $dbname = "id21671045_actions";


    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "SELECT * FROM `actions` ";
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
    $sql = "DELETE FROM `actions`";
    $conn->query($sql);
    $sql = "ALTER TABLE `actions` AUTO_INCREMENT = 1";
    $conn->query($sql);
    $conn->close();
?>