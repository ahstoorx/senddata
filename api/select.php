<?php
$bdd = new PDO('mysql:host=localhost;dbname=anne','root','');

if(isset($_POST['action']) && !empty($_POST['action'])){

    if(isset($_POST['nom']) && !empty($_POST['nom'])){
        $select = $bdd->prepare('SELECT * FROM anne WHERE nom=?');
        $select ->EXECUTE(array($_POST['nom']));

        $valeur = $select->fetch();
        
        print_r(json_encode($valeur));
    }


}


?>