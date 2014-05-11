var yi = require('../index');
var should = require('should');

describe('forEach unit test', function () {

  var obj = {
    k1: 'v1',
    k2: 'v2',
    k3: 'v3',
    k4: 'v4'
  };

  it('basic', function () {
    var i = 0;

    yi.forEach(obj, function (key, item) {
      obj[key].should.eql(item);
      i++;
    });

    should(i).eql(4);

  });

  it('for array', function () {
    var i = 0;
    var arr = ['a', 'b', 'c', 'd'];

    yi.forEach(arr, function (key, item) {

      should(key).eql(i);
      should(item).eql(arr[i]);
      i++;
    });

    should(i).eql(4);

  });

  it('bad argc', function () {

    var i = 0;

    yi.forEach(null, function (key, item) {
      i++;
    });

    yi.forEach('adsf', function (key, item) {
      i++;
    });

    yi.forEach(new Date(), function (key, item) {
      i++;
    });

    should(i).eql(0);

  });

});