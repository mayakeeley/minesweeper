const gameArea = document.getElementById("gameArea");
// const button = document.getElementById("button");
// button.addEventListener("click", generate)

const createTable = size => {
  let table, tr, td;

  table = document.createElement("table");

  for (let row = 0; row < size; row++) {
    tr = document.createElement("tr");
    for (let col = 0; col < size; col++) {
      td = document.createElement("td");
      td.id = row * size + col;
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

generateMines(15, 30);

const checkSurroundingBoxes = size => {
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
    if (Number.isInteger(+cellId / size)) {
      surroundingIds = [
        +cellId - size,
        +cellId - size + 1,
        +cellId + 1,
        +cellId + size,
        +cellId + size + 1
      ];
    } else if (Number.isInteger((+cellId + 1) / size)) {
      surroundingIds = [
        +cellId - size - 1,
        +cellId - size,
        +cellId - 1,
        +cellId + size - 1,
        +cellId + size
      ];
    } else {
      surroundingIds = [
        +cellId - size - 1,
        +cellId - size,
        +cellId - size + 1,
        +cellId - 1,
        +cellId + 1,
        +cellId + size - 1,
        +cellId + size,
        +cellId + size + 1
      ];
    }
    let validIds = surroundingIds.filter(n => n < size * size && n > 0);
    if (document.getElementById(cellId).innerHTML !== "X") {
      validIds.forEach(cell => {
        if (document.getElementById(cell).innerHTML == "X") {
          count = count + 1;
          document.getElementById(cellId).innerHTML = count;
        }
      });
    }
  });
};

checkSurroundingBoxes(15);
