# Jeu du plus petit ou du plus grand

## Contexte

Suite à la réalisation de ce jeu, dans le cadre de la découverte de JavaScript, avec des `prompt()`, `alert()`, `confirm()`, j'ai voulu créer une interface graphique à ce jeu.

## Objectif

Le but du jeu est le plus simple possible : *Trouver le bon nombre entre 1 et 1000*

Attention, vous n'avez que 3 essais !

Impossible me direz-vous ? Les plus malins iront jeter un œil à la *Console* de leur navigateur et auront une belle surprise !

## Fonctionnalités

* Génération d'une partie du HTML via JavaScript (*createElement()* et *appendChild()*)
* Génération d'un nombre entier et aléatoire en 1 et 1000.
* Récupération de la valeur que valide l'utilisateur, analyse pour voir si elle est :
    * Non *null* ou vide
		* Bien un type *Number* et non un *String*
		* Supérieure à 1
		* Inférieure à 1000
* Gestion du nombre de tentatives
* Indication à l'utilisateur si son nombre est plus grand ou plus petit ainsi que son nombre de tentatives
* Apparition du bouton *Rejouer* en fin de partie pour faire un reset des propriétés et re-générer un nouveau nombre aléatoire

## Remerciements

Code créé dans le cadre de ma formation de Développeur Web chez [O'clock](https://oclock.io/) (4ème jour de cours JavaScript)
