(function () {
  window.Asteroids = window.Asteroids || {};

  var Ship = window.Asteroids.Ship = function (options) {
    this.pos = options.pos;
    this.vel = [0, 0];
    this.radius = Ship.RADIUS;
    this.color = Ship.COLOR;
    this.game = options.game;
  };
  window.Asteroids.Util.inherits(Ship, window.Asteroids.MovingObject);

  Ship.RADIUS = 23;
  Ship.COLOR = "red";

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {
    var bulletPos = [this.pos[0], this.pos[1] - 23];

    var bullet = new window.Asteroids.Bullet({
      game: this.game,
      pos: bulletPos,
      vel: this.vel
    });

    this.game.add(bullet);
  };

  Ship.prototype.draw = function(ctx) {
    image = new Image();
    image.src = 'images/Hunter1.png';
    if (this.vel[0] === 0 && this.vel[1] > 0) {
      ctx.drawImage(
        image,
        25,
        49,
        23,
        23,
        this.pos[0],
        this.pos[1],
        46,
        46
      );
    } else if (this.vel[0] === 0 && this.vel[1] < 0) {
      ctx.drawImage(
        image,
        25,
        1,
        23,
        23,
        this.pos[0],
        this.pos[1],
        46,
        46
      );
    } else if (this.vel[0] > 0 && this.vel[1] === 0) {
      ctx.drawImage(
        image,
        49,
        25,
        23,
        23,
        this.pos[0],
        this.pos[1],
        46,
        46
      );
    } else if (this.vel[0] < 0 && this.vel[1] === 0) {
      ctx.drawImage(
        image,
        1,
        25,
        23,
        23,
        this.pos[0],
        this.pos[1],
        46,
        46
      );
    } else if (this.vel[0] < 0 && this.vel[1] < 0) {
      ctx.drawImage(
        image,
        1,
        1,
        23,
        23,
        this.pos[0],
        this.pos[1],
        46,
        46
      );
    } else if (this.vel[0] < 0 && this.vel[1] > 0) {
      ctx.drawImage(
        image,
        1,
        49,
        23,
        23,
        this.pos[0],
        this.pos[1],
        46,
        46
      );
    } else if (this.vel[0] > 0 && this.vel[1] > 0) {
      ctx.drawImage(
        image,
        49,
        49,
        23,
        23,
        this.pos[0],
        this.pos[1],
        46,
        46
      );
    } else if (this.vel[0] > 0 && this.vel[1] < 0) {
      ctx.drawImage(
        image,
        49,
        1,
        23,
        23,
        this.pos[0],
        this.pos[1],
        46,
        46
      );
    } else {
      ctx.drawImage(
        image,
        25,
        1,
        23,
        23,
        this.pos[0],
        this.pos[1],
        46,
        46
      );
    }
  };
})();
