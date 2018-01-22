var template = require('marko').load(require.resolve('./template.marko'));

module.exports = function(req, res, app, mysqlPool){
	var rows = {};

	if(process.env.testPrebuild){
		require('arc-plugin-marko/runtime').run({
			template: require('./template'),
			store: 'GCS',
			req: req,
			res: res,
			data: {
				title: 'Trees Fort Bikes',
				loggedIn: false,
				user_type: ''
			}
		});
	}else{
		template.render({
			title: 'Trees Fort Bikes',
			loggedIn: false,
			user_type: ''
		}, res);
	}
};
