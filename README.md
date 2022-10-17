# senddata

C'est une fonction qui permet la soumission des données vers le serveur ainsi que le traitement des données et aussi de la reponses du serveur

Comment fonctionne la fonctionne??

*1- donner à chacun de vos champs de saisie une class uniform , un name et une value voir exemple dans le fichier index.html
*2- Donner la même classe à votre votre button de soumission avec le type button, un name et une value;
*3 Appeler l'évènement onclick sur le button de soumission en appellant la fonction sendData(className, method, action, redirection = false)

# sendData(className, method, action, redirection = false)

Cette fonction prends en paramètre 4 argument qui sont:
1-className qui représente la classe uniforme données aux champs
2- method qui représente la methode de soumission du formulaire
3-action : le endpoint c'est à dire le lien de la page où les données du formlaire seront traité
4-redirection : elle représente le lien de la page où l'on sera redirigé après un succès venant du serveur. Par défaut c'est false et cela signifie pas de redirection


 
