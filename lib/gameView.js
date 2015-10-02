(function () {
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();

    var animate = function () {
      game.moveObjects();
      game.draw(ctx);
      game.checkCollisions();
    };
    window.setInterval(animate, 1000/60);
  };

  GameView.prototype.bindKeyHandlers = function() {
    ship = this.game.ship;

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
})();
