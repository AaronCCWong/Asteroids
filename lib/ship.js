(function () {
  window.Asteroids = window.Asteroids || {};

  var Ship = window.Asteroids.Ship = function (options) {
    this.pos = options.pos;
    this.vel = [0, 0];
    this.radius = Ship.RADIUS;
    this.color = Ship.COLOR;
    this.game = options.game;
    this.image = new Image();
    this.image.src = 'images/Hunter1.png';
  };
  window.Asteroids.Util.inherits(Ship, window.Asteroids.MovingObject);

  Ship.RADIUS = 22;
  Ship.COLOR = "red";

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new window.Asteroids.Bullet({
      game: this.game,
      pos: this.pos,
      vel: this.vel
    });

    this.game.add(bullet);
  };

  Ship.prototype.draw = function(ctx) {
    if (this.vel[0] === 0 && this.vel[1] > 0) {
      sx = 25;
      sy = 49;
    } else if (this.vel[0] === 0 && this.vel[1] < 0) {
      sx = 25;
      sy = 1;
    } else if (this.vel[0] > 0 && this.vel[1] === 0) {
      sx = 49;
      sy = 25;
    } else if (this.vel[0] < 0 && this.vel[1] === 0) {
      sx = 1;
      sy = 25;
    } else if (this.vel[0] < 0 && this.vel[1] < 0) {
      sx = 1;
      sy = 1;
    } else if (this.vel[0] < 0 && this.vel[1] > 0) {
      sx = 1;
      sy = 49;
    } else if (this.vel[0] > 0 && this.vel[1] > 0) {
      sx = 49;
      sy = 49;
    } else if (this.vel[0] > 0 && this.vel[1] < 0) {
      sx = 49;
      sy = 1;
    } else {
      sx = 25;
      sy = 1;
    }

    ctx.drawImage(this.image, sx, sy, 22, 22, this.pos[0], this.pos[1], 46, 46);
  };
})();
