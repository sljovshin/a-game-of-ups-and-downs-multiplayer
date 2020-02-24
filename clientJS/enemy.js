let bossIdle = true;
let boss = {
    idle: images[22],
    active: images[23],
    x: 160,
    activeX: 117,
    y: 2810,
    height: 140,
    idleWidth: 65,    
    activeWidth: 150
}

function drawBoss() {
    if (bossIdle) {
        drawCharacter(boss.idle, boss.x, boss.y, boss.idleWidth, boss.height)
    } else {
        drawCharacter(boss.active, boss.activeX, boss.y, boss.activeWidth, boss.height)
    }
}