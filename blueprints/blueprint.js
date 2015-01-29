(function (global) {
  var Blueprint = function () {

  };

  var p = Blueprint.prototype;

  p.generate = function (api) {
    var obj = {}, template = this.template(api);

    if(this.options.fields) {
      _.extend(template, this.options.fields);
    }

    _.each(template, function (val, key, template) {
      if(val instanceof Factory) {
        obj[key] = val.build();
      } else {
        obj[key] = _.result(template, key);
      }
    }, this);

    return obj;
  }

  global.Blueprint = Blueprint;
}(window));