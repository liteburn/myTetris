playground = new Array(20).fill().map(el => (new Array(10).fill()));
let object = createObj();
let object1;
pause = false;


//will add new object to partly filled playground.
function renderPositions() {
    if (object){
    object.position[object.pos].forEach(([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    });
    }
}


function moveDown(obj)
{
  renderPlayground();

  if (checkMove( -1, 0))
  {
      object.position.forEach(position => position.forEach(position => (position[0] -= 1)));
  }
  else
  {
      object =  createObj();
      checkAndDelRow();
      renderPositions();

  }
  renderPlayground();
}


function moveLeft(obj)
{
  renderPlayground();
  if (checkMove(0, 1))
  {
      object.position.forEach(position => position.forEach(position => (position[1] += 1)));
      renderPlayground();
  }
}


function moveRight(obj) {
  renderPlayground();
    if (checkMove(0, -1)){
      object.position.forEach(position => position.forEach(position => (position[1] -= 1)));
      renderPlayground();
  }

}


function changeFigure()
{
    let ob;
    let add = true;
    for (i = 0; i < object.position[object.pos].length; i++)
    {
        ob = object.position[object.pos][i];
        playground[ob[0]][ob[1]] = undefined;
    }
    for (i = 0; i < object.position[(object.pos + 1) % object.position.length].length; i++)
    {
        ob = object.position[(object.pos + 1) % object.position.length][i];
        if (playground[ob[0]][ob[1]] !== undefined || ob[0] < 0 || ob[1] < 0 || ob[1] > 9 || ob[0] > 19)
        {
            add = false;
        }
    }
    if (add)
    {
        object.pos = (object.pos + 1)%object.position.length;
    }
    renderPlayground();
}


function pauseGame()
{
  if (pause === false)
  {
      object1 = object;
      clearInterval(gameInterval);
      pause = true;
      object = false;
  }
  else
  {
      pause = false;
      object = object1;
      gameInterval = setInterval(() => {
      moveDown();

      }     , 500);
  }
}


function createObj()
{
  function getRandomNum(max)
  {
      return Math.floor(Math.random() * Math.floor(max));
  }
  figure = FIGURES[getRandomNum(FIGURES.length)];
  obj = ({type: figure, position: [] , state: 'falling', pos: 0});
  for (i = 0; i < INITIAL_POSITIONS[figure].length; i++)
  {
      obj.position.push([]);
      for(k = 0; k < INITIAL_POSITIONS[figure][i].length; k++)
      {

          if (playground[INITIAL_POSITIONS[figure][i][k][0]][INITIAL_POSITIONS[figure][i][k][1]] !== undefined)
          {
                gameOver();
          }
          obj.position[i].push([...INITIAL_POSITIONS[figure][i][k]]);
      }
  }
  num = getRandomNum(7);
  obj.position.forEach(position => position.forEach(position => position[1] += num));
  return obj;
}


function gameOver()
{
    obj = false;
    setTimeout(function() { window.location.href = "game_over.html";}, 3000);

}

// Events       
// 1. move to bottom
// 2. move right
// 3. move left
// 4. pause
// 5. game over
// 6. (re)render playground

renderPlayground();

// interval 1 second
var gameInterval = setInterval(() => {
  moveDown();
}, 500);