# tfb-marko-prebuild-test

A proof of concept prebuild loader that is meant to test that prebuilding works with the following:

  1) lasso-loader async loaded components
  2) top level marko template lasso-page package-path tags
  3) successfully minimizing all code
  4) not duplicating unnecissary code per page or component
  5) all dependancies are walked as would be the case on a standard runtime compile
  
## Modified use of arc-plugin-marko

This Contains a non-standard copy of arc-plugin-marko which is forked to my account and referenced 
directly in the package.json file. The change is in runtime.js where I pass in an actual res and req for now and use the stock res to send the rendered html directly rather than using return arc.html.get(route());

## Installation

Just clone this repo then a standard:

```bash
npm install
```

## Usage

First run this in the root dir. It will run through the arc-plugin-marko build script without a AWS bucket
```
node preBuilder.js
```

Then just launch the app with 
```
npm start
```

To test the navigation which would fire the lasso-async / etc

visit:
http://localhost:8082 and click on the "DEMO LINK"
or 
http://localhost:8082/cat/1234 and click on the Tree Fort Logo

These two pages jump back and forth to eachother

**src/pages/home/index.js**
```js
require('arc-plugin-marko/runtime').run({
  template: require('./template'),
    req: req,
    res: res,
    data: {
      param:'Demo param'
    }
});
```

Example of a page calling a master template:

**src/pages/home/template.marko**
```marko
<include("../../main-layout.marko", {
  param:data.param
})>

  <@bodySection>
    <div id="navPageHolder">
			<if(data.catSection)>
           <include(data.catSection)/>
         </if>
    </div>

    <div id="sideNav">
    <if(data.sideNavSection)>
      <include(data.sideNavSection)/>
    </if>
</div>


  </@bodySection>

</include>
```

Example of the master template:

**src/main-layout.marko**
```marko
<lasso-page package-path="./browser.json"/>
<!doctype html>

<html>
	<head>
		<title>Title</title>
		<base href="/"/>

		<if(data.headSection)>
			<include(data.headSection)/>
		</if>
		<lasso-head/>
	</head>
	<body>

		<div id="container">
			<div id="wrapper">
				<if(data.bodySection)>
					<include(data.bodySection)/>
				</if>
			</div>
			
			<!--
			HOME PAGE CONTENT
			-->
      
			<if(!data.hideHome)>
				<include('./pages/home/staticContent.marko',data)/>
			</if>
      
			<div id="sideNav"> </div>
      
		</div>
		<script>
			var TFAPP = {}, TF = {}, TFInit = {
				pageType: '${data.pageType}'
			};
		</script>
		<lasso-body/>

	</body>
</html>

```

Example of a utility js file that would lazy load a component:

**src/util/buildCatPage.js**
```js
var lassoLoader = require('lasso-loader');

module.exports = {
	buildCatPage: function(data){
		var _that = this;

		var _data = JSON.parse(JSON.stringify(data));

		function displayWidget(){
			var prodCelWidget = require('marko/components').getComponentForEl('catProdHolder');
			if(prodCelWidget){
				prodCelWidget.handleReRender(_data);
			}else{
				lassoLoader.async(function(err){
					if(err){
						console.log('error loading lasso-async dep: ', err);
					}
					prodCelWidget = require('../components/cat-prod-widget');
					prodCelWidget.renderSync(_data).appendTo(document.getElementById('catProdList')).getComponent();
				});
			}

			var catWidget = require('marko/components').getComponentForEl('sideNavCats');
			if(catWidget){
				catWidget.handleReRender(_data, recordNavState);
			}else{
				lassoLoader.async(function(err){
					if(err){
						console.log('error loading lasso-async dep: ', err);
					}
					catWidget = require('../components/side-nav-widget');
					catWidget.renderSync(_data).appendTo(document.getElementById('sideNav')).getComponent();
				});
			}

		}
		displayWidget();
	}
};


```
