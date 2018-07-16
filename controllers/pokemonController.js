(function() {
    var myApp = angular.module('myApp');

    myApp.controller('pokemonController',
    ['$scope', '$http', '$routeParams', '$location', '$localStorage','CONST'
    , function ($scope, $http,  $routeParams, $location, $localStorage, CONST) {

        const limparForm = () => {
            $scope.pokemon = {};
            $scope.error = {};
        };
        const init = () => {
            try {

                $scope.pagination = {
                    totalItems: 64,
                    currentPage: 4,
                    maxSize: 5
                }

            $scope.types = CONST.Types;
            if (!$localStorage.pokemons) {
                $localStorage.pokemons = [];
            }
            getPokemons();
            if ($routeParams.id) {
                getPokemon(parseInt($routeParams.id));
            }
            } catch (error) {
                console.log(error);
            }
            
        };

        const pageChanged = () => {
            $log.log('Page changed to: ' + $scope.currentPage);
        };
        
        const getPokemons = () => {
            $scope.pokemons =  angular.copy($localStorage.pokemons); 
        };

        const getPokemon = id => {
            //get parameter id from url route
            //const id = $routeParams.id;
            const response = $scope.pokemons.filter( pokemon => {
                return pokemon.ID === id;
            })[0];
            if (!response) console.log('pokemon não encontrado');
            if (response) $scope.pokemon = angular.copy(response);
            
        };

        const editPokemon = id => {
            $location.url('pokemon/edit/'+id);
        }

        const getType = id => {
            let type = {ID : 0, Descricao : ''};
            type = $scope.types.filter( type => {
                return type.ID === id;
            })[0];

            return type;
            
        };

        const addOrUpdate = pokemon => {
            try {
                pokemon.DescType = getType(pokemon.Type).Descricao;
                if (!pokemon.ID) {
                    addPokemon(pokemon);
                } else {
                    updatePokemon(pokemon.ID)
                }
            } finally {
                limparForm();
                //$location.url('pokemons');
            }
        };

        const pesquisar = nome => {
            if(!nome || nome.trim().length == 0 ) {
                getPokemons();
                return;
            } 
            const list = $localStorage.pokemons;
            $scope.pokemons = list.filter(pokemon => {
                return pokemon.Name.toLowerCase().includes(nome);
            });
        };
    
        const validarPokemon = (objToValid) => {
            let msg = [];
            $scope.error = {};
            for (property in objToValid) {
                if (!objToValid[property]){
                    $scope.error[property] = true;
                    msg.push('Informe ' + property + '.');
                }
            }
            if (msg.length > 0) console.log(msg);
            return msg.length == 0;
        };

        const salvar = pokemon => {
            
            let objToValid = {
                Type: pokemon.Type 
            ,Name: pokemon.Name
            ,Gender: pokemon.Gender
        }
        if(!validarPokemon(objToValid)) return;
        addOrUpdate(pokemon);
        };

        const updatePokemon = id => {
            //get parameter id from url route
            
            $scope.pokemons.forEach( (pokemon, index) => {
                if (pokemon.ID === id) {
                    $scope.pokemons[index] = $scope.pokemon;
                }
            });

            $localStorage.pokemons =angular.copy($scope.pokemons);
            $('#sucess-modal').modal('show');
        };

        const addPokemon = (pokemon) => {
            const hoje = new Date();
            pokemon.ID = hoje.getTime();
            $localStorage.pokemons = $localStorage.pokemons.concat([$scope.pokemon]);  
            $('#sucess-modal').modal('show');      
        };

        const deletePokemon = pokemonId => {
            try {
                let indexRemove = 0;
                const response = $scope.pokemons.forEach( (pokemon, indexOf) => {
                    if (pokemon.ID === pokemonId) {
                        indexRemove = indexOf;
                    }
        
                    $localStorage.pokemons.splice(indexRemove,1);
        
                });
            } catch (error) {
                console.log(error);
            } finally {
            getPokemons();
            }
            
        };

        $scope.init             = init;
        $scope.pageChanged      = pageChanged;
        $scope.getPokemons      = getPokemons;
        $scope.getPokemon       = getPokemon;
        $scope.pesquisar        = pesquisar;
        $scope.editPokemon      = editPokemon;
        $scope.salvar           = salvar;
        $scope.updatePokemon    = updatePokemon;
        $scope.addPokemon       = addPokemon;
        $scope.deletePokemon    = deletePokemon;
        
    }])
})();