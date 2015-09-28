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

  Ship.RADIUS = 10;
  Ship.COLOR = "red";

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
  }

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.fireBullet = function () {
    var bullet = new window.Asteroids.Bullet({
      game: this.game,
      pos: this.pos,
      vel: this.vel
    });

    this.game.add(bullet);
  }
})();
