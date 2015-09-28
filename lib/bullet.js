(function () {
  window.Asteroids = window.Asteroids || {};

  var Bullet = window.Asteroids.Bullet = function (options) {
    window.Asteroids.MovingObject.call(this, {
      pos: options.pos,
      vel: this.calcVel(options.vel),
      radius: Bullet.RADIUS,
      color: Bullet.COLOR,
      game: options.game
    })
  }

  window.Asteroids.Util.inherits(Bullet, window.Asteroids.MovingObject);

  Bullet.SPEED = 5;
  Bullet.RADIUS = 5;
  Bullet.COLOR = "yellow";

  Bullet.prototype.isWrappable = false;

  Bullet.prototype.calcVel = function (vel) {
    if (vel[0] === 0 && vel[1] === 0) {
      return [Bullet.SPEED, Bullet.SPEED];
    }

    return vel.map(function(coord) {
      if (coord > 0) {
        return Bullet.SPEED;
      } else if (coord === 0) {
        return 0;
      } else {
        return -Bullet.SPEED;
      }
      // return coord * .1 * Bullet.SPEED
    });
  };

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof window.Asteroids.Asteroid) {
      this.game.remove(this);
      this.game.remove(otherObject);
    };
  };
})();
