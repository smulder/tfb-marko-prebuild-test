
module.exports = function(req, res, app, mysqlPool){

	if(req.sendJSON){
		res.setHeader('Content-Type', 'application/json');
		var dbResp = {
			title:'Tree Fort Bikes',
			pageType:'cat',
			catID:1234,
			catTitle:'DEMO CATEGORY',
			navFunc: 'navPage'
		};
		res.send(JSON.stringify(dbResp));
	}else{
		res.setHeader('Content-Type', 'text/html');

		require('arc-plugin-marko/runtime').run({
			template: require('./template'),
			req: req,
			res: res,
			data: {
				title:'Tree Fort Bikes',
				pageType:'cat',
				catID:1234,
				catTitle:'DEMO CATEGORY',
				navFunc: 'navPage'
			}
		});
	}
};
