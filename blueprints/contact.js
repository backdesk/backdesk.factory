(function (global) {
  var ContactDefault = function (options) {
    this.options = options || {};
  };

  var p = ContactDefault.prototype;
  _.extend(p, Blueprint.prototype);

  p.template = function (api) {
    return {
      id : function () {
        return api._increment;
      },

      clinicId : function () {
        return _.uniqueId();
      }
    }
  }

  global.ContactDefault = ContactDefault;
}(window));