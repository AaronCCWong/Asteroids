(function () {
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function (ctx) {
    this.ctx = ctx;
    this.interval = null;

    window.addEventListener("keydown", this.onMenuKey.bind(this));
  };

  GameView.prototype.onMenuKey = function(e) {
    c = e.keyCode;
    if (e.keyCode === 13 && this.showMenu) {
      this.gameStart();
    }
  };

  GameView.prototype.gameStart = function() {
    this.game = new window.Asteroids.Game();
    this.ship = this.game.addPlayer();
    this.bindKeyHandlers();
    $('.play-game').toggleClass('show');
    this.showMenu = false;
    this.start();
  };

  GameView.prototype.start = function () {
    var vx = 0;
    var animate = function () {
      this.game.moveObjects();
      ctx.clearRect(0, 0, this.game.DIM_Y, this.game.DIM_X);

      backgroundImage = new Image();
      backgroundImage.src = 'images/bright-galaxy.jpg';

      ctx.drawImage(backgroundImage, vx, 0);
      ctx.drawImage(backgroundImage, backgroundImage.width - Math.abs(vx), 0);
      if (Math.abs(vx) > backgroundImage.width) {
        vx = 0;
      }
      vx -= 2;

      if (!this.game.ships[0].invincible) {
        this.game.checkCollisions();
      }
      this.game.draw(ctx);

      if (this.game.ships.length === 0) {
        this.stop();
      }
    }.bind(this);

    this.interval = window.setInterval(animate, 1000/60);
  };

  GameView.prototype.bindKeyHandlers = function() {
    ship = this.game.ships[0];

    $(document).keydown(function(e) {
      switch(e.which) {
        case 37: // left
          ship.power([-1,  0]);
        break;

        case 38: // up
          ship.power([ 0, -1]);
        break;

        case 39: // right
          ship.power([ 1,  0]);
        break;

        case 40: // down
          ship.power([ 0,  1]);
        break;

        default: return;
      }
      e.preventDefault();
    });

    $(document).keydown(function(e) {
      if (e.which === 32) {
        ship.fireBullet();
      }
    });
  };

  GameView.prototype.stop = function () {
    clearInterval(this.interval);
    this.showMenu = true;
    $('.play-game').toggleClass('show');
  };
})();
