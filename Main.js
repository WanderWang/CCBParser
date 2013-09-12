/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 13-8-29
 * Time: 下午5:43
 * To change this template use File | Settings | File Templates.
 */

var plist = require('plist');

var dir = "/Users/apple/Sites/sanguo/Game/res/ui";
var plist = plist.parseFileSync(dir + '/HeroAttributeInfoLayer.ccb');
//var plist = plist.parseFileSync('LoginLayer.ccb');

var ccbparser = require("./ccbparser");

//var fileExtension = require("../JavaScriptCodeAnalytics/FileExtension.js");
//fileExtension.run(dir,function(path){
//
//    console.log (path);
////    ccbparser.getResource(path);
//
//});




//return;
var child = plist.nodeGraph;//.children[0];
var result = ccbparser.parseNode(child);
var jsController = child.jsController;
var template = "var " + jsController + " = cc.Layer.extend({\n" +
    "ctor:function(host){\n" +
    result +
    "}})"
//var baseClass = child.baseClass;


//console.log(plist.nodeGraph.children[4]);
//console.log(template);


var fs = require('fs');
fs.writeFileSync("test.js", template, 'utf8')



