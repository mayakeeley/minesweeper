const gameArea = document.getElementById("gameArea");

const createTable = size => {
  let table, tr, td;

  table = document.createElement("table");

  for (let row = 0; row < size; ++row) {
    tr = document.createElement("tr");
    for (let col = 0; col < size; ++col) {
      td = document.createElement("td");
      td.id = "cell_" + (row * size + col);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  return gameArea.appendChild(table);
};

createTable(15);

const generateMines = (size, mines) => {
  const numCells = size * size;
  let x = 0;
  while (x < mines && x < numCells) {
    let cellId = "cell_" + Math.floor(Math.random() * numCells);
    let cell = document.getElementById(cellId);

    if (cell.classList.contains("mine")) {
      continue;
    }
    cell.classList.add("mine");
    cell.innerHTML = "X";
    x++;
  }
};

generateMines(15, 30);
