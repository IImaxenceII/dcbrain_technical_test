var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var randomInt = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};
var randomFourNumbers = function () {
    var randomFourNumbers = [];
    for (var i = 0; i < 4; i++) {
        randomFourNumbers.push(randomInt(1, 10));
    }
    return randomFourNumbers;
};
var findOperation = function (numbers) {
    var epsilon = 0.0001;
    function dfs(nums, exprs) {
        if (nums.length === 1) {
            return Math.abs(nums[0] - 24) < epsilon ? exprs[0] : "";
        }
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (i === j)
                    return "continue";
                var nextNums = nums.filter(function (_, index) { return index !== i && index !== j; });
                var nextExprs = exprs.filter(function (_, index) { return index !== i && index !== j; });
                for (var _i = 0, _a = ["+", "-", "*", "/"]; _i < _a.length; _i++) {
                    var op = _a[_i];
                    if (op === "+" || op === "*") {
                        if (i > j)
                            continue;
                    }
                    if (op === "/" && nums[j] === 0)
                        continue;
                    var result = eval("".concat(nums[i], " ").concat(op, " ").concat(nums[j]));
                    var expr = "(".concat(exprs[i], " ").concat(op, " ").concat(exprs[j], ")");
                    var found_1 = dfs(__spreadArray(__spreadArray([], nextNums, true), [result], false), __spreadArray(__spreadArray([], nextExprs, true), [expr], false));
                    if (found_1.length > 0) {
                        return { value: found_1 };
                    }
                }
            };
            for (var j = 0; j < nums.length; j++) {
                var state_2 = _loop_2(j);
                if (typeof state_2 === "object")
                    return state_2;
            }
        };
        for (var i = 0; i < nums.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return "";
    }
    var found = dfs(numbers, numbers.map(String));
    return found;
};
var game = function () {
    var setFourNumbers = randomFourNumbers();
    var operation = findOperation(setFourNumbers);
    while (operation.length === 0) {
        setFourNumbers = randomFourNumbers();
        operation = findOperation(setFourNumbers);
    }
    return [setFourNumbers, operation];
};
var solutionButton = document.getElementById("solutionButton");
var generateNumberSetButton = document.getElementById("generateNumberSetButton");
var solutionOperationElement = document.getElementById("solutionOperation");
var generateNumberSetElement = document.getElementById("generateNumberSet");
var timerDisplay = document.getElementById('timerDisplay');
var gameResult = game();
console.log(gameResult);
var timer;
var startTimer = function () {
    var timeRemaining = 30;
    if (timerDisplay != null && solutionOperationElement != null) {
        timerDisplay.textContent = "";
        clearInterval(timer);
        timer = setInterval(function () {
            timerDisplay.textContent = timeRemaining.toString();
            if (timeRemaining <= 0) {
                clearInterval(timer);
                timerDisplay.textContent = 'Time écoulé';
                solutionOperationElement.textContent = "Solution: ".concat(gameResult[1], " = 24");
            }
            timeRemaining--;
        }, 1000);
    }
};
var generateNumberSet = function () {
    startTimer();
    gameResult = game();
    if (generateNumberSetElement != null && solutionOperationElement != null) {
        generateNumberSetElement.textContent = "Jeu de chiffres: ".concat(typeof gameResult[0] !== 'string' ? (gameResult[0]).join(', ') : "");
        solutionOperationElement.textContent = "";
    }
};
var solutionOperation = function () {
    if (solutionOperationElement != null) {
        solutionOperationElement.textContent = "Solution: ".concat(gameResult[1], " = 24");
        console.log(gameResult);
    }
};
if (generateNumberSetButton != null && solutionButton != null) {
    generateNumberSetButton.addEventListener("click", generateNumberSet);
    solutionButton.addEventListener("click", solutionOperation);
}
