require('app-module-path').addPath(__dirname);

const path = require("path");
const fs = require("fs-extra");
const markoPre = require('arc-plugin-marko').beforeCreate;


async function build(){
	let lassoConfig = './lasso-config.json';
	let cwd = process.cwd();


	let lassoConfigObj = require(require.resolve(path.resolve(cwd, lassoConfig)));

	try{
		await fs.remove(lassoConfigObj.cacheDir);
		await fs.remove(lassoConfigObj.outputDir);
	}catch(e){
		console.log('rejected remove cacheDir or outputDir:', e);
	}

	require('lasso').configure(lassoConfigObj);

	markoPre({pluginConfig:{
		pages: [
			"src/pages/category/template.marko",
			"src/pages/home/template.marko"
		],
		config: lassoConfig
	}});
}

build();
