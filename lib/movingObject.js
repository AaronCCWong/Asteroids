(function () {
  window.Asteroids = window.Asteroids || {};

  var MovingObject = window.Asteroids.MovingObject = function (options) {
    options = options || {};

    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  };

  MovingObject.prototype.move = function () {
    var newPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (!this.game.isOutOfBounds(newPos) || this.isWrappable) {
      this.pos = this.game.wrap(newPos);
    } else {
      this.game.remove(this);
    };
  };

  MovingObject.prototype.isCollidedWith = function (object) {
    var diam = this.radius + object.radius;
    var distance = Math.sqrt(Math.pow(this.pos[0] - object.pos[0], 2) +
                             Math.pow(this.pos[1] - object.pos[1], 2));
    if (distance <= diam) {
      return true;
    }
    return false;
  };

  MovingObject.prototype.collideWith = function () {};
})();
