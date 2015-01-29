(function (global) {
  var ActionEnquiry = function (options) {
    this.options = options || {};
  };

  var p = ActionEnquiry.prototype;
  _.extend(p, Blueprint.prototype);

  p.template = function (api) {
    return {
      id : function () {
        return api._increment;
      },

      origin : function () {
        return 'source';
      },

      name : function () {
        return 'fake name';
      }
    }
  }

  global.ActionEnquiry = ActionEnquiry;
}(window));