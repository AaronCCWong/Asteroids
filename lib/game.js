(function () {
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function () {
    this.addAsteroids();

    this.ships = [];
    this.bullets = [];
  };

  Game.DIM_X = 650;
  Game.DIM_Y = 1000;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.addPlayer = function() {
    var ship = new window.Asteroids.Ship({
      game: this,
      pos: [500, 325]
    });

    this.add(ship);

    window.setTimeout(function() {
      ship.invincible = false;
    }, 3000);

    return ship;
  };

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
    var boundaryPosition = [
      [0, Math.random() * Game.DIM_X],
      [650, Math.random() * Game.DIM_X],
      [Math.random() * Game.DIM_Y, 0],
      [Math.random() * Game.DIM_Y, 1000]
    ];

    return boundaryPosition[Math.floor(Math.random() * 4)];
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
    return this.ships.concat(this.asteroids, this.bullets);
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof window.Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof window.Asteroids.Bullet) {
      this.bullets.push(obj);
    } else {
      this.ships.push(obj);
    }
  };

  Game.prototype.remove = function (obj) {
    var removeObjFrom = function (array) {
      array.splice(array.indexOf(obj), 1);
    };

    if (obj instanceof window.Asteroids.Asteroid) {
      removeObjFrom(this.asteroids);
      var asteroid = new window.Asteroids.Asteroid({
        game: this,
        pos: this.randomPosition()
      });
      this.add(asteroid);
    } else if (obj instanceof window.Asteroids.Bullet) {
      removeObjFrom(this.bullets);
    } else if (obj instanceof window.Asteroids.Ship) {
      removeObjFrom(this.ships);
      this.gameOver();
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    if (pos[0] < 0 || pos[0] > Game.DIM_Y) {
      return true;
    } else if (pos[1] < 0 || pos[1] > Game.DIM_X) {
      return true;
    }

    return false;
  };

  Game.prototype.gameOver = function() {};

})();
