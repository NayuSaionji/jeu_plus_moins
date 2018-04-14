var app = {

  // Selections des differents éléments du HTML
  divWrapper: document.querySelector('#wrapper'),
  divInfos: document.querySelector('#infos'),
  btnInfos: document.querySelector('#btninfo'),
  divReponse: document.querySelector('#reponse'),
  divIndication: document.querySelector('#indication'),
  btnReset: document.querySelector('#reset'),
  divAskUser: document.querySelector('#askUser'),
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  colorGrey: document.querySelector('#grey'),
  colorBlue: document.querySelector('#blue'),
  colorPink: document.querySelector('#pink'),
  divTentatives: document.querySelector('#tentatives span'),
  divTimer: document.querySelector('#timer span'),

  // Valeurs par défaut des clés
  time: 0,
  aleaNb: null,
  userNb: null,
  win: false,
  tentatives: 10,

  // Fonction appelée après le chargement complet du DOM
  init: function () {
    console.log('init');

    // Génération du nombre aléatoire
    app.createAlea();

    // Ecoute de la validation du formulaire -> Touche Entrer dans le input ou click sur OK
    app.form.addEventListener('submit', app.askUser);

    // Ecoute du survole et quand le curseur repart du bouton Info
    app.btnInfos.addEventListener('mouseover', app.informations);
    app.btnInfos.addEventListener('mouseleave', app.removeInformations);

    // Ecoute du click sur les boutons de couleur
    app.colorGrey.addEventListener('click', function () {
      app.changeColor(app.colorGrey.id);
    })
    app.colorBlue.addEventListener('click', function () {
      app.changeColor(app.colorBlue.id);
    })
    app.colorPink.addEventListener('click', function () {
      app.changeColor(app.colorPink.id);
    })

    // Lancement du timer toutes les 1sec
    app.timer = setInterval(app.updateTime, 1000);

  },

  // Méthode pour générer un nombre aléatoire en 1 et 1000
  createAlea: function() {
    var random = Math.floor(Math.random() * 1000 +1 );
    console.log('Le nombre a trouver est : ' + random);
    app.aleaNb = Number(random);
  },

  // Méthode pour vérifier la valeur saisie par l'utilisateur
  askUser: function(evt){

    // Desactivation du comportement par défaut du formulaire, soit le refresh de la page
    evt.preventDefault();

    reponse = app.input.value; // On récupère le nombre
    app.input.value = ''; // On vide l'input

    // SI reponse est "null" OU vide OU pas un nombre OU supérieur à 1000 OU inférieur à 1
    if (reponse === null || reponse === '' || isNaN( Number(reponse) ) || Number(reponse) > 1000 || Number(reponse) < 1) {
      app.divReponse.textContent = 'Incorrect ! Il faut saisir un nombre entre 1 et 1000...';
    }
    // SINON S'IL reste des tentatives et que la partie n'est pas gagnée
    else if (app.tentatives > 0 && app.win !== true){
      app.userNb = Number(reponse);
      app.divReponse.textContent = 'Votre chiffre : '+reponse;
      app.play(); // On exécute le traitement du nombre de l'utilisateur
    }
    // SINON S'IL ne reste plus de tentatives
    else if (app.tentatives === 0) {
      app.divReponse.textContent = 'Vous n\'avez plus de tentatives.'
    }
    // SINON la partie est déja gagnée
    else {
      app.divReponse.textContent = 'Vous avez déjà trouver la réponse.'
    }
  },

  // Méthode qui exécute le traitement du nombre de l'utilisateur que l'on a validé
  play: function(){

    // SI le nombre a trouver est strictement égal au nombre de l'utilisateur ET que la partie n'est pas encore gagnée
    if (app.aleaNb === app.userNb && app.win !== true) {
      app.win = true;
      app.divIndication.textContent ='Bravo ! Vous avez trouvé le bon nombre.';
      clearInterval(app.timer); // On arrête le chrono
      app.rejouer(); // Apparition du bouton Rejouer
    }
    // SINON SI le nombre a trouver est supérieur au nombre de l'utilisateur ET que la partie n'est pas encore gagnée
    else if (app.aleaNb > app.userNb && app.win !== true) {
      app.tentatives--;
      app.divTentatives.textContent = app.tentatives;
      app.divIndication.textContent = 'Votre nombre est trop petit !';
    }
    // SINON SI le nombre a trouver est inférieur au nombre de l'utilisateur ET que la partie n'est pas encore gagnée
    else if (app.aleaNb < app.userNb && app.win !== true) {
      app.tentatives--;
      app.divTentatives.textContent = app.tentatives;
      app.divIndication.textContent = 'Votre nombre est trop grand !';
    }

    // SI l'utilisateur n'a plus de tentatives
    if (app.tentatives === 0) {
      app.divIndication.textContent = 'Perdu ! Il fallait trouver : ' + app.aleaNb;
      clearInterval(app.timer); // On arrête le chrono
      app.rejouer(); // Apparition du bouton Rejouer
    }
  },

  // Méthode permettant de faire apparaître le bouton Rejouer
  rejouer: function () {
    app.btnReset.style.display = 'initial';
    app.btnReset.addEventListener('click', app.clean);
  },

  // Méthode permettant de remettre le jeu aux valeurs d'origine
  clean: function () {
    app.createAlea(); // Génération d'un nouveau nombre aléatoire
    app.divReponse.textContent = '';
    app.divIndication.textContent = '';
    app.win = false;
    app.tentatives = 10;
    app.divTentatives.textContent = app.tentatives;
    app.btnReset.style.display = 'none'; // On enlève le bouton Rejouer
    app.resetTime(); // On remet le chrono a 0 et on le relance
  },

  // Méthode permettant de changer le background-color du jeu au click sur les carrés
  changeColor: function (idColor) {
    switch (idColor) {
      case 'grey':
        app.divWrapper.style.backgroundColor = '#eee';
        break;
      case 'blue':
        app.divWrapper.style.backgroundColor = 'lightblue';
        break;
      case 'pink':
        app.divWrapper.style.backgroundColor = 'pink';
        break;
      default:
    }
  },

  // Méthode pour mettre à jour le chrono
  updateTime: function () {
    app.time++;
    app.divTimer.textContent = app.time;

    // SI le chrono arrive à 4 chiffres, on réduit la font-size pour que ca ne dépasse pas du cadre
    if (app.time >= 1000) {
      app.divTimer.style.fontSize = '3rem';
      app.divTimer.style.lineHeight = '1.5';
    }
  },

  // Méthode pour arrêter le chrono et le remettre à 0
  resetTime: function() {

    app.time = 0;
    clearInterval(app.timer);
    app.timer = setInterval(app.updateTime, 1000);
    app.divTimer.textContent = app.time;
  },

  // Méthode pour rendre visible les informations sur le jeu et mettre la div au niveau du curseur
  informations: function(evt) {

    app.divInfos.style.visibility = 'visible';
    app.divInfos.style.left = evt.clientX+20+'px';
    app.divInfos.style.top = evt.clientY-50+'px';
  },

  // Méthode pour cacher les informations quand le curseur part du bouton Info
  removeInformations: function() {

    app.divInfos.style.visibility = 'hidden';
  }
}

document.addEventListener('DOMContentLoaded', app.init);
