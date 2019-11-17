const gameArea = document.getElementById("gameArea");
const button = document.getElementById("button");
const sizevalue = document.getElementById("height");
const rowValue = document.getElementById("rows");
const columnValue = document.getElementById("columns");
const mineNumber = document.getElementById("mines");
let rows = 0;
let columns = 0;
let mines = 0;

const createTable = (rows, columns) => {
  let table, tr, td;
  gameArea.innerHTML = "";

  table = document.createElement("table");

  for (let row = 0; row < rows; row++) {
    tr = document.createElement("tr");
    for (let col = 0; col < columns; col++) {
      td = document.createElement("td");
      td.id = row * columns + col;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  return gameArea.appendChild(table);
};

const generateMines = (rows, columns, mines) => {
  const numCells = rows * columns;
  let x = 0;
  while (x < mines && x < numCells) {
    let cellId = Math.floor(Math.random() * numCells);
    let cell = document.getElementById(cellId);

    if (cell.classList.contains("mine")) {
      continue;
    }
    cell.classList.add("mine");
    cell.innerHTML = "X";
    x++;
  }
};

const checkSurroundingBoxes = (rows, columns) => {
  let allCells = document.querySelectorAll("td");
  let allIds = [];
  for (let i = 0; i < allCells.length; i++) {
    let cell = allCells[i];
    if (cell.id) {
      allIds.push([cell.id]);
    }
  }
  allIds.flat().forEach(cellId => {
    let count = 0;
    let surroundingIds;
    if (Number.isInteger(+cellId / columns)) {
      surroundingIds = [
        +cellId - columns,
        +cellId - columns + 1,
        +cellId + 1,
        +cellId + columns,
        +cellId + columns + 1
      ];
    } else if (Number.isInteger((+cellId + 1) / columns)) {
      surroundingIds = [
        +cellId - columns - 1,
        +cellId - columns,
        +cellId - 1,
        +cellId + columns - 1,
        +cellId + columns
      ];
    } else {
      surroundingIds = [
        +cellId - columns - 1,
        +cellId - columns,
        +cellId - columns + 1,
        +cellId - 1,
        +cellId + 1,
        +cellId + columns - 1,
        +cellId + columns,
        +cellId + columns + 1
      ];
    }
    let validIds = surroundingIds.filter(n => n < columns * rows && n > 0);
    if (document.getElementById(cellId).innerHTML !== "X") {
      validIds.forEach(cell => {
        if (document.getElementById(cell).innerHTML == "X") {
          count = count + 1;
          document.getElementById(cellId).innerHTML = count;
        }
      });
      document.getElementById(cellId).classList.add(`number${count}`);
    }
  });
};

const checkSizeInput = () => {
  rows = +rowValue.value;
  columns = +columnValue.value;
  mines = +mineNumber.value;

  createTable(rows, columns);
  generateMines(rows, columns, mines);
  checkSurroundingBoxes(rows, columns);
};
button.addEventListener("click", checkSizeInput);
