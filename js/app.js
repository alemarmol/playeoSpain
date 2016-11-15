var app = angular.module('beachLocatorApp',['ngRoute','angular.filter','angularUtils.directives.dirPagination']);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/homeView.html',
			controller: 'homeViewController'
		})

		.when('/comunidadAutonoma', {
			templateUrl: 'views/beachRegionTotal.html',
			controller: 'beachComunidadController'
		})

	    .when("/comunidadAutonoma/:comunidadAutonoma", {
	      templateUrl: "views/beachRegion.html",
	      controller: "beachComunidadController"
	    })

	    .when("/provincia/:nameCity", {
	      templateUrl: "views/beachprovince.html",
	      controller: "provinciaController"
	    })

	    .when("/provincia/:nameCity/playa/:nameBeach", {
	    	templateUrl: "views/beach.html",
	    	controller: "provinciaController"
	    })

		.when("/contact",{
			templateUrl: "views/beachForm.html",
			controller: "beachForm"
		})

		.otherwise({
			redirectTo: "/"
		})
}]);

//Directiva para el Header
app.directive('bappHeader', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/header.html'			
	}
});

//Directiva para el Footer
app.directive('bappFooter', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/footer.html'			
	}
});

//Página Principal
app.controller('homeViewController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$scope.comunidadAutonoma = $routeParams.comunidadAutonoma;

	var loadName3;
	$scope.loadNames = function loadNames() {
		loadName3 =  $('#provinciaInput').val();
		$http.get("js/infoBeach.json").success(function(data) {
			$scope.provincias = data.filter(function (obj){return obj.Provincia == loadName3});
			$scope.comunidadAutonomas = data;
		});
		$scope.selection = $scope.provincias;
		return $scope.provincias;
	}
	
	$scope.newPage = function newPage() {
		location.href = '#provincia/'+loadName3;
	}

}]);

//Playas de España
app.controller('beachComunidadController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$scope.comunidadAutonoma = $routeParams.comunidadAutonoma;

	$http.get("js/infoBeach.json").success(function(data) {
		$scope.comunidadAutonomas = data;
		$scope.provincias = data;
	});
	// $scope.quantity = 15; 
}]);



app.controller('provinciaController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
	$http.get("js/infoBeach.json").success(function(data) {
		$scope.loadBeaches = data;
		$scope.provincias = data;
	});

	$scope.nameFilter = $routeParams.nameCity;
	$scope.namebeachFilter = $routeParams.nameBeach;
	
}]);

app.controller("beachForm", ["$scope", function(){

}]);





