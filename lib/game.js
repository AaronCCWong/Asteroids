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

  Game.DIM_X = 650;
  Game.DIM_Y = 1000;
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
    return [Math.random() * Game.DIM_Y,
            Math.random() * Game.DIM_X];
  };

  Game.prototype.draw = function (ctx) {
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
    if (pos[0] <= 0) {
      pos[0] = Game.DIM_Y;
    } else if (pos[0] >= Game.DIM_Y) {
      pos[0] = 0;
    }

    if (pos[1] <= 0) {
      pos[1] = Game.DIM_X;
    } else if (pos[1] >= Game.DIM_X) {
      pos[1] = 0;
    }

    return pos;
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
    if (pos[0] < 0 || pos[0] > Game.DIM_Y) {
      return true;
    } else if (pos[1] < 0 || pos[1] > Game.DIM_X) {
      return true;
    }

    return false;
  };
})();
