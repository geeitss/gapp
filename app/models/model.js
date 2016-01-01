var mongoose = require('mongoose');

module.exports = mongoose.model('Employees', {
	text : String,
	done : Boolean
});