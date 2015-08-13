(function() {
    var calcApp = angular.module("calcApp", []);

    calcApp.controller("calcCtrl", ["$scope", function($scope) {
        $scope.calculatorDisplay = 0;
    }]);
})();