let rows = 15;
let columns = 15;

const makeCell = tr => {
  const td = document.createElement("td");

  tr.appendChild(td);

  return tr;
};

const makeLine = newTable => {
  let tr = document.createElement("tr");

  for (let i = 0; i < rows; i++) {
    tr = makeCell(tr);
  }
  newTable.appendChild(tr);

  return newTable;
};

makeGrid = () => {
  const gameArea = document.getElementById("gameArea");
  let newTable = document.createElement("table");

  for (let i = 0; i < columns; i++) {
    newTable = makeLine(newTable);
  }
  gameArea.appendChild(newTable);
};

makeGrid();

const generateMines = () => {
  const numberOfCells = rows * columns;
};
