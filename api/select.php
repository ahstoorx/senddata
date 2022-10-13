<?php

$bdd = new PDO('mysql:host=localhost;dbname=anne', 'root', '');

if (isset($_POST['action']) && !empty($_POST['action'])) {
    $select = $bdd->prepare('SELECT * FROM anne');
    $select ->EXECUTE();
    $valeur = $select->fetchAll();

    print_r(json_encode($_POST));
}
