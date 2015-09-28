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
    window.setInterval(animate, 50);
  };

  GameView.prototype.bindKeyHandlers = function() {
    ship = this.game.ship;

    key('up',    function() { ship.power([ 0, -1]); });
    key('down',  function() { ship.power([ 0,  1]); });
    key('left',  function() { ship.power([-1,  0]); });
    key('right', function() { ship.power([ 1,  0]); });
    key('space', function() { ship.fireBullet(); });
  };

})();
