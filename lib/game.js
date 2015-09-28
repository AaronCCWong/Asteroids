(function () {
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function () {
    this.addAsteroids();

    this.ship = new window.Asteroids.Ship({
      game: this,
      pos: this.randomPosition()
    });
    this.bullets = [];
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.addAsteroids = function () {
    this.asteroids = this.asteroids || [];

    for (var i = 0, n = Game.NUM_ASTEROIDS; i < n; i++) {
      var asteroid = new window.Asteroids.Asteroid({
        game: this,
        pos: this.randomPosition()
      });

      this.add(asteroid);
    };
  };

  Game.prototype.randomPosition = function () {
    return [Math.random() * Game.DIM_X,
            Math.random() * Game.DIM_Y];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function(asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(asteroid) {
      asteroid.move(ctx);
    });
  };

  Game.prototype.wrap = function (pos) {
    return pos.map(function(coord) {
      if (coord < 0) {
        return coord + Game.DIM_X;
      } else if (coord > Game.DIM_X) {
        return coord = 0;
      } else {
        return coord;
      }
    });
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    game.allObjects().forEach(function (object) {
      game.allObjects().forEach(function (otherObject) {
        if (object !== otherObject &&
            object.isCollidedWith(otherObject)) {
          object.collideWith(otherObject);
        };
      });
    });
  };

  Game.prototype.allObjects = function () {
    return [this.ship].concat(this.asteroids, this.bullets);
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof window.Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof window.Asteroids.Bullet) {
      this.bullets.push(obj);
    };
  };

  Game.prototype.remove = function (obj) {
    var removeObjFrom = function (array) {
      array.splice(array.indexOf(obj), 1);
    };

    if (obj instanceof window.Asteroids.Asteroid) {
      removeObjFrom(this.asteroids);
    } else if (obj instanceof window.Asteroids.Bullet) {
      removeObjFrom(this.bullets);
    };
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return pos.some(function(coord) {
      return coord < 0 || coord > Game.DIM_X;
    });
  };
})();
