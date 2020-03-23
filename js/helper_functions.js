function checkMove(param1, param2)
{
    let canBe = Boolean(true);
    renderPlayground();
    object.position[object.pos].forEach(position => (playground[position[0]][position[1]] = undefined));
    object.position[object.pos].forEach(position => (((position[0] + param1 < 0 || (9 < position[1] + param2 || position[1] + param2 < 0)) && (canBe = false))));
    if (canBe)
    {

        object.position[object.pos].forEach(position => ((playground[position[0] + param1][position[1] + param2] !== undefined) && (canBe = false)));
    }
    if (!canBe)
    {
         renderPlayground();
    }
    return canBe;
}

function checkAndDelRow()
{
    let delite = [];
    for (i = 0; i < playground.length; i++)
    {
        del = true;
        for(k = 0; k < playground[i].length; k++)
        {
            if (playground[i][k] === undefined){
                del = false;
            }
        }
        if (del){
            delite.push(i);
        }
    }
    for (i = delite.length - 1; i >= 0; i--)
    {
        for(k = delite[i]; k < playground.length - 1; k++)
        {
            playground[k] = playground[k + 1];
        }
        playground[playground.length - 1] = new Array(10).fill();
    }
    let scoreboard = document.getElementById("scoreboard");
    let scores = Number(scoreboard.innerText);
    let bonus = 1;
    if (delite.length === 4)
    {
        bonus = 2;
    }
    scores += delite.length * 10 * bonus;
    scoreboard.innerText = scores;
}