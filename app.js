let selectedNumber = null;

function drawRouletteBoard() {
  const grid = document.getElementById("rouletteGrid");
  grid.innerHTML = "";

  const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  const blackNumbers = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];

  const leftCol = [], middleCol = [], rightCol = [];
  for (let i = 1; i <= 36; i++) {
    if (i % 3 === 1) leftCol.push(i);
    else if (i % 3 === 2) middleCol.push(i);
    else rightCol.push(i);
  }

  for (let row = 0; row < 12; row++) {
    [leftCol[row], middleCol[row], rightCol[row]].forEach(num => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-number", num);

      if (redNumbers.includes(num)) {
        cell.classList.add("red");
      } else {
        cell.classList.add("black");
      }

      cell.textContent = num;

      cell.addEventListener("click", () => {
        document.querySelectorAll(".cell").forEach(c => c.classList.remove("selected"));
        cell.classList.add("selected");
        selectedNumber = num;
        console.log("Selected number:", selectedNumber);
      });

      grid.appendChild(cell);
    });
  }

  document.querySelectorAll(".zero-column .cell").forEach(cell => {
    const num = cell.textContent;
    cell.setAttribute("data-number", num);

    cell.addEventListener("click", () => {
      document.querySelectorAll(".cell").forEach(c => c.classList.remove("selected"));
      cell.classList.add("selected");
      selectedNumber = num;
      console.log("Selected number:", selectedNumber);
    });
  });
}

function getRiggedNumber(userPick, numbers) {
  const riggedPool = numbers.filter(n => n !== userPick);
  return riggedPool[Math.floor(Math.random() * riggedPool.length)];
}

function spinNumberDisplay() {
  if (selectedNumber === null) {
    alert("Please select a number before spinning.");
    return;
  }

  const display = document.getElementById("numberDisplay");
  const resultBox = document.getElementById("result");

  const numbers = [
    0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1,
    '00', 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2
  ];

  const userPick = selectedNumber;
  const winningNumber = getRiggedNumber(userPick, numbers);

  let i = 0;
  let spinCount = 0;
  const maxSpins = 50;
  const interval = 50;

  const spinner = setInterval(() => {
    display.textContent = numbers[i % numbers.length];
    i++;
    spinCount++;

    if (spinCount > maxSpins) {
      clearInterval(spinner);
      display.textContent = winningNumber;

      const isWin = String(winningNumber) === String(userPick);
      resultBox.textContent = isWin
        ? "🎉 You got in an accident! You should probably get DCPD."
        : "No qualifying accidents this year. DCPD wouldn’t have applied.";

      // Flash animation
      resultBox.classList.remove("flash");
      void resultBox.offsetWidth; // Force reflow
      resultBox.classList.add("flash");
    }
  }, interval);
}



window.onload = drawRouletteBoard;
