
module.exports = function(req, res, app, mysqlPool){
	var rows = {};

	console.log('process.env.testPrebuild2',process.env.testPrebuild);
	if(process.env.testPrebuild === true || process.env.testPrebuild == 'true'){
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
		var template = require('marko').load(require.resolve('./template.marko'));
		template.render({
			title: 'Trees Fort Bikes',
			loggedIn: false,
			user_type: ''
		}, res);
	}
};
