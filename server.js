var router = new Router();

router.addRoute('/api/dummy', new Factory([
  { quantity : 1, worker : new ContactDefault() },
  {
    quantity : 2,
    worker : new ContactDefault({
      fields : {
        pendingActions : new Factory([{ quantity: 2, worker: new ActionEnquiry() }])
      }
    })
  }
]).build);


$.mockjax(function(settings){
  var route = router.getRoute(settings.url);
  if (route) {
    return {
      response: function(settings) {
        this.responseText = JSON.stringify(route.handler())
      }
    };
  }
  return;
});


var x = new Backbone.Collection();

x.fetch({
  url : '/api/dummy'
}).done(function () {
  console.log(x.models);
});