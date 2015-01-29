(function (global) {
  var Factory = function (config) {
    _.bindAll(this, 'build');

    this.config = config;
    this.output = [];
    this._increment = 0;
  };

  var p = Factory.prototype;

  p.generate = function (quantity, worker) {
    var output = [];

    for(var i = 0; i < quantity; i++, this._increment++) {
      output.push(worker.generate(this));
    }

    return output;
  },

  p.build = function () {
    var output = []; this._increment = 0;

    if(_.isArray(this.config)) {
      _.each(this.config, function (item) {
        output = output.concat(this.generate(item.quantity, item.worker));
      }, this);
    }

    return output;
  };

  global.Factory = Factory;
}(window));