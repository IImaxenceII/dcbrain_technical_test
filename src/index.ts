const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }
  
const randomFourNumbers = () => {
    const randomFourNumbers: number[] = [];
    for (let i = 0; i < 4; i++) {
        randomFourNumbers.push(randomInt(1, 10));
    }
    return randomFourNumbers;
}
  
const findOperation = (numbers: number[]) => {
    const epsilon = 0.0001;
  
    function dfs(nums: number[], exprs: string[]): string {
      if (nums.length === 1) {
        return Math.abs(nums[0] - 24) < epsilon ? exprs[0] : "";
      }
  
      for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
          if (i === j) continue;
  
          const nextNums = nums.filter((_, index) => index !== i && index !== j);
          const nextExprs = exprs.filter((_, index) => index !== i && index !== j);
  
          for (const op of ["+", "-", "*", "/"]) {
            if (op === "+" || op === "*") {
              if (i > j) continue;
            }
  
            if (op === "/" && nums[j] === 0) continue;
  
            const result = eval(`${nums[i]} ${op} ${nums[j]}`);
            const expr = `(${exprs[i]} ${op} ${exprs[j]})`;
            const found = dfs([...nextNums, result], [...nextExprs, expr]);
  
            if (found.length > 0) {
              return found;
            }
          }
        }
      }
  
      return "";
    }
  
    const found = dfs(numbers, numbers.map(String));
  
    return found;
}
  

const game = (): [number[], string] => {
    let setFourNumbers: number[] = randomFourNumbers();
    let operation: string = findOperation(setFourNumbers);
    while (operation.length === 0) {
        setFourNumbers = randomFourNumbers();
        operation = findOperation(setFourNumbers)
    }
    return [setFourNumbers, operation];
};
  

const solutionButton = document.getElementById("solutionButton");
const generateNumberSetButton = document.getElementById("generateNumberSetButton");
const solutionOperationElement = document.getElementById("solutionOperation");
const generateNumberSetElement = document.getElementById("generateNumberSet");

const timerDisplay = document.getElementById('timerDisplay');

let gameResult = game();

console.log(gameResult);


let timer;
const startTimer = () => {
    let timeRemaining = 30;
    if (timerDisplay != null && solutionOperationElement != null) {
        
        timerDisplay.textContent = "";
        
        clearInterval(timer);
        
        timer = setInterval(() => {
            timerDisplay.textContent = timeRemaining.toString();
            
            if (timeRemaining <= 0) {
                clearInterval(timer);
                timerDisplay.textContent = 'Time écoulé';
                solutionOperationElement.textContent = `Solution: ${gameResult[1]} = 24`;
            }
            
            timeRemaining--;
        }, 1000);
    }
};
  

const generateNumberSet = () => {
    startTimer();
    gameResult = game();
    if ( generateNumberSetElement != null && solutionOperationElement != null ) {
        generateNumberSetElement.textContent = `Jeu de chiffres: ${typeof gameResult[0] !== 'string' ? (gameResult[0]).join(', ') : ""}`;
        solutionOperationElement.textContent = "";
    }
};


const solutionOperation = () => {
    if ( solutionOperationElement != null ) {
        solutionOperationElement.textContent = `Solution: ${gameResult[1]} = 24`;
        console.log(gameResult);
    }
};

if ( generateNumberSetButton != null && solutionButton != null ) {
    generateNumberSetButton.addEventListener("click", generateNumberSet);
    solutionButton.addEventListener("click", solutionOperation);
}

  