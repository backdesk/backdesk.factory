#Factory Objects and Fake API Example

I put this example together quickly whilst experimenting with different ways of simulating a RESTful API. The goal I had in mind was to have something that's portable for running tests against whilst providing consistent and random data for specific scenarios.

This example is based around the thinking behind libraries like 'Factory Girl' and makes use of MockJax to simulate calls to the remote service.

##Why MockJax?
No particular reason. You could use any library that does a good job of mocking XHR. I quite liked MockJax's API and it worked right off the bat. Mocking XHR instead of setting up a small server has a number of advantages - I think the biggest win is portability. Your service is just a bundled library that you bring in when needed - instead of a running process that needs to be installed and setup outside of the general environment.

##Why Factories?
In this first iteration I've not stuck with any consistent design pattern as far as the factory concept goes. Factories are just generators that build objects from 'blueprints'. Blueprints are used as templates that define 'models'. I like the analogy of the factory - one that builds a number of items from a set of blueprints. It seems fitting in this situation.


### Blueprints and Factories
You'll notice that there's a small degree of inflection going on within the blueprint logic as every template is given knowledge of it's factory:

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

In the above example of a blueprint's 'template' method the factory can be queried to see how many iterations have run. This logic is currently tied up within the Factory base class itself which is something I am hoping to improve:

    p.generate = function (quantity, worker) {
        var output = [];

        for(var i = 0; i < quantity; i++, this._increment++) {
            output.push(worker.generate(this));
        }

        return output;
    },

It should be possible to derive new factories from this base class and introduce new properties and logic. The only downside is that the 'generate' method could become cumbersome and over complicated.

### What Next?
I've got a bazillion ideas about how to take this forward. I believe that the ideas behind popular libraries like 'Factory Girl' are well thought out and common place in the real world. While a number of attempts have been made to bring Factory Girl to the JavaScript domain I've struggled to either get them working or to apply them to my work entirely. To this end my solution is bespoke at best.

Some ideas I have are:

* Break out example
* Introduce unit tests for base classes
* CommonJS/AMD wrappers
* Allow static JSON (i.e. copy and paste JSON into a factory from Chrome)
* General improvements to the API. There's a bit of duplication
* De-couple from my custom router and mockjax
