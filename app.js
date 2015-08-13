(function() {
    var calcApp = angular.module("calcApp", []);

    calcApp.controller("calcCtrl", ["$scope", function($scope) {
        $scope.calculatorDisplay = "0";
        $scope.displayHasDot = false;
        $scope.lengthBeforeDot = 0;
        $scope.lengthAfterDot = 0;
        var lastOperator = 0,
            lastResult = 0,
            startFromScratch = false;
        /*
            0 - plus
            1 - minus
            2 - multiply
            3 - divide
         */

        $scope.clearAll = function() {
            $scope.clearEntry();
            lastOperator = 0;
            lastResult = 0;
        };

        $scope.clearEntry = function() {
            $scope.calculatorDisplay = "0";
            $scope.displayHasDot = false;
            $scope.lengthBeforeDot = 0;
            $scope.lengthAfterDot = 0;
            startFromScratch = true;
        };

        $scope.insertDigit = function(digit) {
            if(startFromScratch)
            {
                $scope.calculatorDisplay = "0";
                $scope.lengthBeforeDot = 0;
                $scope.lengthAfterDot = 0;
                $scope.displayHasDot = false;
            }

            startFromScratch = false;

            if($scope.calculatorDisplay === "0")
                $scope.calculatorDisplay = "";

            if($scope.displayHasDot)
            {
                if($scope.lengthAfterDot < 6) {
                    $scope.calculatorDisplay += "" + digit;
                    ++$scope.lengthAfterDot;
                }
            }
            else
            {
                if($scope.lengthBeforeDot < 8)
                {
                    ++$scope.lengthBeforeDot;
                    $scope.calculatorDisplay += "" + digit;
                }
            }
        };

        $scope.insertDot = function() {
            if($scope.displayHasDot)
                return;

            $scope.displayHasDot = true;
            $scope.calculatorDisplay += ".";
        };

        $scope.mathOperator = function(operator) {
            $scope.doMath();
            lastOperator = operator;
            startFromScratch = true;
        };

        $scope.doMath = function(start) {
            var parsedInput = parseFloat($scope.calculatorDisplay);
            switch(lastOperator) {
                case 0:
                    lastResult += parsedInput;
                    break;

                case 1:
                    lastResult -= parsedInput;
                    break;

                case 2:
                    lastResult *= parsedInput;
                    break;

                case 3:
                    lastResult /= parsedInput;
                    break;
            }

            if(lastResult.toString().indexOf(".") != -1)
                lastResult = Math.round(lastResult*1000000)/1000000;

            $scope.calculatorDisplay = lastResult;
            $scope.displayHasDot = false;
            lastOperator = 0;

            if(lastResult > 1000000000 || lastResult < 0.000001) {
                $scope.clearAll();
                $scope.calculatorDisplay = "Error!";
                startFromScratch = true;
            }

            if(start)
            {
                startFromScratch = true;
                lastResult = 0;
            }
        };

        $scope.doPercentage = function() {
            var parsedInput = parseFloat($scope.calculatorDisplay) / 100;
            /*if(parsedInput.toString().indexOf(".") != -1)
                parsedInput = Math.round(parsedInput*1000000)/1000000;*/

            $scope.calculatorDisplay = parsedInput;
            if(parsedInput < 0.000001)
            {
                $scope.clearAll();
                $scope.calculatorDisplay = "Error!";
                startFromScratch = true;
            }
        }

        $scope.keyPressed = function($event) {
            var character = String.fromCharCode($event.charCode);
            var parsedChar = parseInt(character);

            if(parsedChar >= 0 && parsedChar <= 9)
                $scope.insertDigit(parsedChar);
            else if($event.charCode == 13)
                $scope.doMath(true);
            else
            {
                switch(character)
                {
                    case "+":
                        $scope.mathOperator(0);
                        break;

                    case "-":
                        $scope.mathOperator(1);
                        break;

                    case "*":
                        $scope.mathOperator(2);
                        break;

                    case "/":
                        $scope.mathOperator(3);
                        break;

                    case "=":
                        $scope.doMath(true);
                        break;

                    case ".":
                    case ",":
                        $scope.insertDot();
                        break;

                    case "%":
                        $scope.doPercentage();
                        break;
                }
            }
        }

        $scope.backspaceClear = function($event) {
            if($event.keyCode == 8)
                $scope.clearEntry();
        };
    }]);
})();