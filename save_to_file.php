<?php
    $input = file_get_contents('php://input');
    $file = fopen("contents.json", "w");
    fwrite($file, $input);
    fclose($file);
?>