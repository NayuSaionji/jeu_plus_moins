var app = {
  again: true,
  allGames: [],
  divReponse: document.querySelector('#reponse'),
  divIndication: document.querySelector('#indication'),
  btnReset: document.querySelector('#reset'),

  init: function () {
    console.log('init');

    var divAskUser = document.querySelector('#askUser');

    var input = document.createElement('input');
    input.placeholder = 'Entrez un chiffre en 1 et 1000';
    divAskUser.appendChild(input);

    var button = document.createElement('button');
    button.textContent = 'OK';
    divAskUser.appendChild(button);

    app.createAlea();

    var eventClick = button.addEventListener('click', function () {
      app.askUser ( input.value );
      input.value = '';
    });
  },

  aleaNb: null,

  createAlea: function() {
    var random = Math.floor(Math.random() * 1000 +1 );
    console.log('Le nombre a trouver est : ' + random);
    app.aleaNb = Number(random);
  },

  userNb: null,

  askUser: function(reponse){

    if (reponse === null || reponse === '' || isNaN( Number(reponse) ) || Number(reponse) > 1000 || Number(reponse) < 1) {
      app.divReponse.textContent = 'Incorrect ! Il faut saisir un nombre entre 1 et 1000...';
    }
    else if (app.tentatives < 3 && app.win !== true){
      app.userNb = Number(reponse);
      app.divReponse.textContent = 'Votre chiffre : '+reponse;
      app.play();
    }
    else if (app.tentatives >= 3) {
      app.divReponse.textContent = 'Vous n\'avez plus de tentatives.'
    }
    else {
      app.divReponse.textContent = 'Vous avez déjà trouver la réponse.'
    }
  },

  win: false,
  tentatives: 0,

  play: function(){

    if (app.aleaNb === app.userNb && app.win !== true) {
      app.win = true;
      app.divIndication.textContent ='Bravo ! Tu as trouvé le bon nombre.';
      app.rejouer();
    }
    else if (app.aleaNb > app.userNb && app.win !== true) {
      app.tentatives++;
      app.divIndication.textContent = 'Ton nombre est trop petit ! ('+app.tentatives+'/3 tentatives)';
    }
    else if (app.aleaNb < app.userNb && app.win !== true) {
      app.tentatives++;
      app.divIndication.textContent = 'Ton nombre est trop grand ! ('+app.tentatives+'/3 tentatives)';
    }

    if (app.tentatives >= 3) {
      app.divIndication.textContent = 'Désolé ! Tu as dépassé le nombre de tentatives.';
      app.rejouer();
    }
  },

  rejouer: function () {
    app.btnReset.style.display = 'initial';
    var eventClick = app.btnReset.addEventListener('click', app.clean);
  },

  clean: function () {
    app.createAlea();
    app.divReponse.textContent = '';
    app.divIndication.textContent = '';
    app.win = false;
    app.tentatives = 0;
    app.btnReset.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', app.init);
