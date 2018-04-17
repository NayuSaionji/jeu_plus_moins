var app = {

  // Selections des differents éléments du HTML
  divWrapper: $('#wrapper'),
  divInfos: $('#infos'),
  btnInfos: $('#btninfo'),
  divReponse: $('#reponse'),
  divIndication: $('#indication'),
  btnReset: $('#reset'),
  divAskUser: $('#askUser'),
  form: $('form'),
  input: $('input'),
  colorGrey: $('#grey'),
  colorBlue: $('#blue'),
  colorPink: $('#pink'),
  divTentatives: $('#tentatives span'),
  divTimer: $('#timer span'),

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
    app.form.on('submit', app.askUser);

    // Ecoute du survole et quand le curseur repart du bouton Info
    app.btnInfos.on('mouseover', app.informations);
    app.btnInfos.on('mouseleave', app.removeInformations);

    // Ecoute du click sur les boutons de couleur
    app.colorGrey.on('click', function () {
      app.changeColor(app.colorGrey.id);
    });
    app.colorBlue.on('click', function () {
      app.changeColor(app.colorBlue.id);
    });
    app.colorPink.on('click', function () {
      app.changeColor(app.colorPink.id);
    });

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

    var reponse = app.input.val(); // On récupère le nombre
    app.input.val(''); // On vide l'input

    // SI reponse est "null" OU vide OU pas un nombre OU supérieur à 1000 OU inférieur à 1
    if (reponse === null || reponse === '' || isNaN( Number(reponse) ) || Number(reponse) > 1000 || Number(reponse) < 1) {
      app.divReponse.text('Incorrect ! Il faut saisir un nombre entre 1 et 1000...');
    }
    // SINON S'IL reste des tentatives et que la partie n'est pas gagnée
    else if (app.tentatives > 0 && app.win !== true){
      app.userNb = Number(reponse);
      app.divReponse.text('Votre chiffre : '+reponse);
      app.play(); // On exécute le traitement du nombre de l'utilisateur
    }
    // SINON S'IL ne reste plus de tentatives
    else if (app.tentatives === 0) {
      app.divReponse.text('Vous n\'avez plus de tentatives.');
    }
    // SINON la partie est déja gagnée
    else {
      app.divReponse.text('Vous avez déjà trouver la réponse.');
    }
  },

  // Méthode qui exécute le traitement du nombre de l'utilisateur que l'on a validé
  play: function(){

    // SI le nombre a trouver est strictement égal au nombre de l'utilisateur ET que la partie n'est pas encore gagnée
    if (app.aleaNb === app.userNb && app.win !== true) {
      app.win = true;
      app.divIndication.text('Bravo ! Vous avez trouvé le bon nombre.');
      clearInterval(app.timer); // On arrête le chrono
      app.rejouer(); // Apparition du bouton Rejouer
    }
    // SINON SI le nombre a trouver est supérieur au nombre de l'utilisateur ET que la partie n'est pas encore gagnée
    else if (app.aleaNb > app.userNb && app.win !== true) {
      app.tentatives--;
      app.divTentatives.text(app.tentatives);
      app.divIndication.text('Votre nombre est trop petit !');
    }
    // SINON SI le nombre a trouver est inférieur au nombre de l'utilisateur ET que la partie n'est pas encore gagnée
    else if (app.aleaNb < app.userNb && app.win !== true) {
      app.tentatives--;
      app.divTentatives.text(app.tentatives);
      app.divIndication.text('Votre nombre est trop grand !');
    }

    // SI l'utilisateur n'a plus de tentatives
    if (app.tentatives === 0) {
      app.divIndication.text('Perdu ! Il fallait trouver : ' + app.aleaNb);
      clearInterval(app.timer); // On arrête le chrono
      app.rejouer(); // Apparition du bouton Rejouer
    }
  },

  // Méthode permettant de faire apparaître le bouton Rejouer
  rejouer: function () {
    app.btnReset.css('display', 'initial');
    app.btnReset.on('click', app.clean);
  },

  // Méthode permettant de remettre le jeu aux valeurs d'origine
  clean: function () {
    app.createAlea(); // Génération d'un nouveau nombre aléatoire
    app.divReponse.text('');
    app.divIndication.text('');
    app.win = false;
    app.tentatives = 10;
    app.divTentatives.text(app.tentatives);
    app.btnReset.css('display', 'none'); // On enlève le bouton Rejouer
    app.resetTime(); // On remet le chrono a 0 et on le relance
  },

  // Méthode permettant de changer le background-color du jeu au click sur les carrés
  changeColor: function (idColor) {
    switch (idColor) {
    case 'grey':
      app.divWrapper.css('background-color','#eee');
      break;
    case 'blue':
      app.divWrapper.css('background-color','lightblue');
      break;
    case 'pink':
      app.divWrapper.css('background-color','pink');
      break;
    default:
    }
  },

  // Méthode pour mettre à jour le chrono
  updateTime: function () {
    app.time++;
    app.divTimer.text(app.time);

    // SI le chrono arrive à 4 chiffres, on réduit la font-size pour que ca ne dépasse pas du cadre
    if (app.time >= 1000) {
      app.divTimer.css('font-size', '3rem');
      app.divTimer.css('line-height', '1.5');
    }
  },

  // Méthode pour arrêter le chrono et le remettre à 0
  resetTime: function() {

    app.time = 0;
    clearInterval(app.timer);
    app.timer = setInterval(app.updateTime, 1000);
    app.divTimer.text(app.time);
  },

  // Méthode pour rendre visible les informations sur le jeu et mettre la div au niveau du curseur
  informations: function(evt) {

    app.divInfos.css('visibility', 'visible');
    app.divInfos.css('left', evt.clientX+20+'px');
    app.divInfos.css('top', evt.clientY-50+'px');
  },

  // Méthode pour cacher les informations quand le curseur part du bouton Info
  removeInformations: function() {

    app.divInfos.css('visibility', 'hidden');
  }
};

$(app.init);
