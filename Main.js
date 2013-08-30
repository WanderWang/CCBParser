/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 13-8-29
 * Time: 下午5:43
 * To change this template use File | Settings | File Templates.
 */




var fs = require('fs');
var file = fs.readFileSync('./SelectHeroItemLayer.ccb', "utf8");

var plist = require('plist');
var plist = plist.parseFileSync('SelectHeroItemLayer.ccb');





var child = plist.nodeGraph.children[0];
console.log(child.properties);

var baseClass = child.baseClass;

var ccbparser = require("./ccbparser");
var result = ccbparser.parseNode(child);

console.log(result);



