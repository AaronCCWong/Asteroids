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
    window.setInterval(animate, 1000/30);
  };

  GameView.prototype.bindKeyHandlers = function() {
    ship = this.game.ship;

    key('up', function() {
      ship.power([ 0, -1]);
    }.bind(this));
    key('down', function(ctx) {
      ship.power([ 0,  1]);
    }.bind(this));
    key('left', function(ctx) {
      ship.power([-1,  0]);
    });
    key('right', function(ctx) {
      ship.power([ 1,  0]);
    });
    key('space', function(ctx) {
      ship.fireBullet();
    });
  };

})();
