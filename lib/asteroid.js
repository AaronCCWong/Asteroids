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

  Asteroid.RADIUS = 20;
  Asteroid.COLOR = "gray";

  Asteroid.prototype.collideWith = function (otherObject) {
    if ((otherObject instanceof window.Asteroids.Ship && !otherObject.invincible) ||
        !otherObject instanceof window.Asteroids.Ship) {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };

  Asteroid.prototype.draw = function (ctx) {
    image = new Image();
    image.src = 'images/asteroid.png';
    ctx.drawImage(image, 1, 1, 130, 130, this.pos[0], this.pos[1], 60, 60);
  };
})();
