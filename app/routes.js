var myapp = require('./models/model');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all emp
	app.get('/api/emp', function(req, res) {

		// use mongoose to get all emp in the database
		myapp.find(function(err, emp) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(emp); // return all emp in JSON format
		});
	});

	// create Employee and send back all emp after creation
	app.post('/api/emp', function(req, res) {

		// create a Employee, information comes from AJAX request from Angular
		myapp.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the emp after you create another
			myapp.find(function(err, emp) {
				if (err)
					res.send(err)
				res.json(emp);
			});
		});

	});

	// delete a todo
	app.delete('/api/emp/:emp_id', function(req, res) {
		myapp.remove({
			_id : req.params.emp_id
		}, function(err, emp) {
			if (err)
				res.send(err);

			// get and return all the emp after you create another
			myapp.find(function(err, emp) {
				if (err)
					res.send(err)
				res.json(emp);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};