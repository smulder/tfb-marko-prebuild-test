var template = require('marko').load(require.resolve('./template.marko'));

module.exports = function(req, res, app, mysqlPool){
	var rows = {};
	require('arc-plugin-marko/runtime').run({
		template: require('./template'),
		req: req,
		res: res,
		data: {
			title: 'Trees Fort Bikes',
			loggedIn: false,
			user_type: ''
		}
	});
};
