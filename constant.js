( function () {
  var myApp = angular.module('myApp');

  myApp.constant('CONST',{Types : [
    {ID: 1, Descricao : 'FIRE'}
    ,{ID: 2, Descricao : 'ELETRIC'}
    ,{ID: 3, Descricao : 'WATER'}
    ,{ID: 4, Descricao : 'GRASS'}
  ]
  })
})();