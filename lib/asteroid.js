(function () {
  window.Asteroids = window.Asteroids || {};

  var Asteroid = window.Asteroids.Asteroid = function (options) {
    options = options || {};

    window.Asteroids.MovingObject.call(this, {
      pos: options.pos,
      vel: window.Asteroids.Util.randomVec(10),
      radius: Asteroid.RADIUS,
      color: Asteroid.COLOR,
      game: options.game
    });
  };

  window.Asteroids.Util.inherits(Asteroid, window.Asteroids.MovingObject);

  Asteroid.RADIUS = 15;
  Asteroid.COLOR = "gray";

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof window.Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof window.Asteroids.Asteroid) {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };
})();
