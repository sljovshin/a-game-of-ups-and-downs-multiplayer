// this attempts to start the game
let imagesLoaded = false;
//This runs everytime the server tells the player its their turn
socket.on('not-your-turn', function() {
  rollbt.style.display = 'none';
  waitbt.style.display = 'block';
});

socket.on('your_turn', function() {
  rollbt.style.display = 'block';
  waitbt.style.display = 'none';
});
socket.on('rival_move', (roll)=>{
  rivalDice = roll;
  rivalmover();
})
socket.on('end-game', (destination) => {
  setTimeout(() => {
    window.location.href = destination;
  }, 3000)
})



// initialize world
defineRooms();
function initWorld() {
  drawBackground(context);
  initialize();
}

// spawn player
function game() {
  context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  drawBackground(context);
  drawBoss();
  playerLocationDetection(); 
  rivalLocationDetection(); 
  playerDeterminFloor();
  rivalDeterminFloor();

  if (player.x > 1300 && player. y > 3000 && playerDoneMoving === true) {
    drawCharacter(player.victorySprite, player.x, player.y - 67, 90, 177)
  } else if(rival.x > 1300 && rival.y > 3000 && rivalDoneMoving === true) {
    drawCharacter(rival.victorySprite, player.x, player.y - 67, 90, 177)
  } else {
    drawPlayer();
    drawRival();
  }
  playerMove();
  rivalMove();
  drawRoom(gateoverlap, 367, 0, 33, 250);
  requestAnimationFrame(game)
}

images.forEach( (image, index) => {
  image.src = image_sources[index];
  image.onload = () => {
      loaded_images++;
      if (loaded_images === images.length) {
          imagesLoaded = true;
          socket.emit('images-loaded')
          initWorld();
      }
  }
});

function initialize() {
  const waitForPlayerEmit = setInterval(()=> {
    console.log(playerNumber);
    if(playerNumber !== null && imagesLoaded === true) {
      player = assignHero(jon, danny, playerNumber);
      rival = assignRival(jon, danny, playerNumber);
      game();
      clearInterval(waitForPlayerEmit);
    }
  }, 300)
}
//detect player location in world



