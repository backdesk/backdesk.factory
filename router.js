(function (global) {
  var MockRouter = function () {
    this._routes = [];
  };

  var p = MockRouter.prototype;

  p.addRoute = function (url, handler) {
    var route = { url : url};

    if(_.isFunction(handler)) {
      route.handler = handler;
    }

    this._routes.push(route);
  };

  p.getRoute = function (url) {
    if(!(url instanceof RegExp)) {
      return _.findWhere(this._routes, { url : url });
    }
  }

  global.Router = MockRouter;
}(window))