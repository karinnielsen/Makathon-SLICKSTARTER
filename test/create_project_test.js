process.env.NODE_ENV = 'test';
var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');
var server = require('../server');

var test_port = 9292;
Browser.localhost('example.com', test_port);

describe('home page', function() {

  var browser;

  before(function() {
    this.server = server.listen(test_port);
    browser = Browser.create();
  });

  beforeEach(function(done){
    browser.visit('/createproject', done);
  });

it("displays a project title", function(){
  expect(browser.text("h1")).to.eql("Get Started")
});

  describe('clicking links', function() {
    // TODO
  });

  after(function(done){
    this.server.close(done);
  });
});