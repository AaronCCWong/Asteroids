(function () {
  window.Asteroids = window.Asteroids || {};

  var Ship = window.Asteroids.Ship = function (options) {
    this.pos = options.pos;
    this.vel = [0, 0];
    this.radius = Ship.RADIUS;
    this.color = Ship.COLOR;
    this.game = options.game;
    this.image = new Image();
    this.image.src = 'images/ship.png';

    this.invincible = true;
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
      pos: [this.pos[0] + 15, this.pos[1]],
      vel: this.vel
    });

    this.game.add(bullet);
  };

  Ship.prototype.draw = function(ctx) {
    if (this.vel[0] === 0 && this.vel[1] > 0) {
      sx = 1000;
      sy = 0;
      sWidth = 195;
      sHeight = 295;
      dWidth = 50;
      dHeight = 80;
    } else if (this.vel[0] === 0 && this.vel[1] < 0) {
      sx = 0;
      sy = 0;
      sWidth = 195;
      sHeight = 295;
      dWidth = 50;
      dHeight = 80;
    } else if (this.vel[0] > 0 && this.vel[1] === 0) {
      sx = 470;
      sy = 50;
      sWidth = 295;
      sHeight = 195;
      dWidth = 80;
      dHeight = 50;
    } else if (this.vel[0] < 0 && this.vel[1] === 0) {
      sx = 1450;
      sy = 50;
      sWidth = 295;
      sHeight = 195;
      dWidth = 80;
      dHeight = 50;
    } else if (this.vel[0] < 0 && this.vel[1] < 0) {
      sx = 1750;
      sy = 40;
      sWidth = 245;
      sHeight = 250;
      dWidth = 75;
      dHeight = 60;
    } else if (this.vel[0] < 0 && this.vel[1] > 0) {
      sx = 1200;
      sy = 30;
      sWidth = 250;
      sHeight = 260;
      dWidth = 75;
      dHeight = 60;
    } else if (this.vel[0] > 0 && this.vel[1] > 0) {
      sx = 760;
      sy = 30;
      sWidth = 250;
      sHeight = 260;
      dWidth = 75;
      dHeight = 60;
    } else if (this.vel[0] > 0 && this.vel[1] < 0) {
      sx = 210;
      sy = 45;
      sWidth = 245;
      sHeight = 250;
      dWidth = 75;
      dHeight = 60;
    } else {
      sx = 0;
      sy = 0;
      sWidth = 195;
      sHeight = 295;
      dWidth = 50;
      dHeight = 80;
    }

    ctx.drawImage(
      this.image,
      sx,
      sy,
      sWidth,
      sHeight,
      this.pos[0],
      this.pos[1],
      dWidth,
      dHeight
    );
  };
})();
