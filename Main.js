/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 13-8-29
 * Time: 下午5:43
 * To change this template use File | Settings | File Templates.
 */

var plist = require('plist');
var plist = plist.parseFileSync('SelectHeroItemLayer.ccb');

var ccbparser = require("./ccbparser");

var child = plist.nodeGraph;//.children[0];
var result = ccbparser.parseNode(child);
var jsController = child.jsController;
var template = "var " + jsController + " = cc.Layer.extend({\n" +
    "ctor:function(host){\n" +
    result +
    "})"
//var baseClass = child.baseClass;


//console.log(child);
console.log(template);



