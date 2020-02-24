class Game {
    constructor(p1, p2) {
        this._players = [p1, p2];
        this._playersReady = 0;
        this._turn = 1;
        this._currentTurn = 0;
        this._rival = 0;
        this._players.forEach((player, index) => {
            player.on('player-ready', () => {
                this._onReady();
            });
            player.on('images-loaded', () => {
                this._imagesLoaded();
            })
            player.on('done', () => {
                this._nextTurn();
            })
            player.on('rival_roll', (roll) => {
                this._rivalMove(roll);
            })
            player.on('end', (num) => {
                this._endGame(num);
            })
        });

    }

    _onReady() {
        this._playersReady++;
        if (this._playersReady === 2) {
            this._players.forEach((p, i) => {   
                let destination = '/game.html';
                p.emit('start-game', destination);
            })
            this._playersReady = 0;
        }
    }
    _imagesLoaded() {
        this._playersReady++;
        console.log(this._playersReady);
        if (this._playersReady === 2) {
            this._players.forEach((p, i) => {   
                console.log('emitting hero');
                p.emit('assignedHero', i + 1);
                this._players[1].emit('not-your-turn');
            })
        }
    }
    _nextTurn(){
        if(this._turn === 0) {
          this._players[0].emit('your_turn');
          this._turn = 1;
         } else {
           this._players[1].emit('your_turn');
           this._turn = 0;
        }
     }

     _rivalMove(roll) {
        if(this._turn === 0) {
            this._players[0].emit('rival_move', roll)
           } else {
            this._players[1].emit('rival_move', roll)
          }
      }
      _endGame(num) {
        this._players.forEach((p) => {   
            let destination = `/p${num}victory.html`;
            p.emit('end-game', destination);
        })
      }
}

module.exports = Game;