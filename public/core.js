var geeemp = angular.module('GeeEmp', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all emp and show them
	$http.get('/api/emp')
		.success(function(data) {
			$scope.emp = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createEmployee = function() {
		$http.post('/api/emp', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.emp = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteEmployee = function(id) {
		$http.delete('/api/emp/' + id)
			.success(function(data) {
				$scope.emp = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}
