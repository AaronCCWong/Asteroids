(function () {
  window.Asteroids = window.Asteroids || {};

  var Util = window.Asteroids.Util = function () {};

  Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = new ParentClass();
    ChildClass.prototype = Surrogate.prototype;
  };

  Util.randomVec = function(length) {
    var rand1 = Math.random();
    var rand2 = Math.random();

    if (Math.random() > 0.5) {
      rand1 *= -1
    }
    if (Math.random() > 0.5) {
      rand2 *= -1
    }
    return [rand1 * Math.random() * length, rand2 * Math.random() * length];
  };
})();
