(function () {
    var myApp = angular.module('myApp', ['ngRoute','ngStorage', 'ui.bootstrap', 'ui.bootstrap.modal']);

    myApp.config(function ($routeProvider) {

        $routeProvider.when('/', {
                controller: 'pokemonController',
                templateUrl: 'views/pokemons.html'
            })
            .when('/pokemons', {
                controller: 'pokemonController',
                templateUrl: 'views/pokemons.html'
            })

            .when('/pokemon/add', {
                controller: 'pokemonController',
                templateUrl: 'views/cadPokemon.html'
            })
            .when('/pokemon/edit/:id', {
                controller: 'pokemonController',
                templateUrl: 'views/cadPokemon.html'
            })
            .otherwise({
                redirectTo: '/',
            })

    })
})();