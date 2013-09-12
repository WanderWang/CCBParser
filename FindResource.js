/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 13-8-29
 * Time: 下午5:43
 * To change this template use File | Settings | File Templates.
 */
var fs = require("fs");
var plist = require('plist');

var assets_dir = "/Users/apple/Sites/sanguo/Game/res/";
var from_assets_dir = "/Users/apple/Sites/native-sanguo/asset/";
var dir = "/Users/apple/Sites/sanguo/Game/res/ui";




var config = plist.parseFileSync(dir + '/ActivityVipShopLayer.ccb');
var parser = require("./ccbparser");
var list = [];

parser.loop(config.nodeGraph,function(node){

    node.properties.forEach(function(property){

        if (property.type == "SpriteFrame"){
            property.value.forEach(function(path){
                if (list.indexOf(path) == -1){
                    list.push(path);
                }
            })
        }
    })
})

list.forEach(function(path){
    var toPath = assets_dir + path;
    var fromPath = from_assets_dir + path;
    var isExist = fs.existsSync(toPath);
    if (!isExist){
        console.log ("need to copy:");
        console.log ("  " + fromPath);

        if (fromPath.indexOf("button") == -1){
            var buffer = fs.readFileSync(fromPath);
            fs.writeFileSync(toPath,buffer);
        }
    }
    else{
        console.log ("exist:" + path);
    }

})