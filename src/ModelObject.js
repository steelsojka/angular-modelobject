angular.module("angular-modelobject", []).factory("ModelObject", [function() {

  var isObject = angular.isObject;
  var isUndefined = angular.isUndefined;
  var extend = angular.extend;

  var reduce = Array.prototype.reduce || function(fn, initial) {
    var result = initial;

    for (var i = 0, len = this.length; i < len; i++) {
      result = fn(result, this[i]);
    }

    return result;
  };

  var resolvePath = function(path, object) {
    return reduce.call(path.split("."), function(result, key) {
      return isObject(result) ? result[key] : result;
    }, object);
  };

  var ModelObject = function(data) {
    data = data || {};

    this.initialize = angular.noop;

    this.set = function(path, value) {
      var objPath = path.split(".");
      var endPoint = objPath.pop();
      var bindPoint = resolvePath(objPath, data);
      
      if (isObject(bindPoint)) {
        bindPoint[endPoint] = value;
      }
    };

    this.get = function(path) {
      return resolvePath(path, data);
    };
  };

}]);
