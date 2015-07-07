it('should check ng-submit', function() {
  expect(element(by.binding('list')).getText()).toBe('list=[]');
  element(by.css('#submit')).click();
  expect(element(by.binding('list')).getText()).toContain('hello');
  expect(element(by.model('text')).getAttribute('value')).toBe('');
});
it('should ignore empty strings', function() {
  expect(element(by.binding('list')).getText()).toBe('list=[]');
  element(by.css('#submit')).click();
  element(by.css('#submit')).click();
  expect(element(by.binding('list')).getText()).toContain('hello');
 });

angular.module('submitExample', [])
  .controller('ExampleController', ['$scope', function($scope) {
    $scope.list = [];
    $scope.text = 'hello';
    $scope.submit = function() {
      if ($scope.text) {
        $scope.list.push(this.text);
        $scope.text = '';
      }
    };
  }]);

//using angularJS w Jinja
// var app = angular.module('myApp', []);
 
// app.config(['$interpolateProvider', function($interpolateProvider) {
//   $interpolateProvider.startSymbol('{[');
//   $interpolateProvider.endSymbol(']}');
// }]);

// <h1 class="{{ some_class }}">{[ foo.bar ]}</h1>
// <h1 class="some-class">{[ foo.bar ]}</h1>


angular.module('submitExample', [])
  .controller('ExampleController', ['$scope', function($scope) {
    $scope.list = [];
    $scope.text = 'hello';
    $scope.submit = function() {
      if ($scope.text) {
        $scope.list.push(this.text);
        $scope.text = '';
      }
    };
  }]);
