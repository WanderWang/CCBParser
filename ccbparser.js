var ccb = {};
ccb.parser = {};

ccb.tempVariableCount = 0;

ccb.parseNode = function (obj, parent) {

    var template = "";
    var memberVarAssignmentName = obj.memberVarAssignmentName;
    var baseClass = "cc." + obj.baseClass.split("CC")[1];
    if (memberVarAssignmentName == "") {
        if (ccb.tempVariableCount == 0){
            memberVarAssignmentName = "root";
//            template = "this._super();\n";
        }
        else
        {
            memberVarAssignmentName = "temp" + ccb.tempVariableCount.toString();
            template = "var {varName} = {baseClass}.create();\n".replace("{baseClass}", baseClass);
        }
        ccb.tempVariableCount++;
    }
    else
    {
        template = "var {varName} = {baseClass}.create();\n".replace("{baseClass}", baseClass);
        template += "host.{varName} = {varName};\n";
    }
    var memberVarAssignmentType = obj.memberVarAssignmentType;
    obj.properties.forEach(function (property) {
        var line = ccb.parseProerties(property);
        line = line == "" ? "" : line + "\n";
        template += line;
    })
    template = template.replace(/{varName}/gi, memberVarAssignmentName);

    if (parent != null) {
        template += parent + ".addChild(" + memberVarAssignmentName + ");\n";
    }
    obj.children.forEach(function (childObj) {
        template += "\n" + ccb.parseNode(childObj, memberVarAssignmentName);
    });
    return template;
}

ccb.parseProerties = function (obj) {
    var template = "";
    var param = {};
    var name = obj.name.split("|")[0];
    var objState = obj.name.split("|")[1];
    obj.name = name;
    var parser = ccb.parser[name];
    if (parser != null) {
        param = parser.param(obj);
        template = parser.codeBlock(obj, param, objState);
    }
    else {
        template = "//ignore:" + obj.name;
    }


    for (var key in param) {
        var value = param[key];
        template = template.replace("{" + key + "}", value);
    }
    var state = ccb.parseState(objState);
    template = template.replace("{state}", state);
    return template;
}

ccb.parseParamter = function (type, obj) {
    var template = "";
    if (type == "CCPoint") {
        var x = 0;
        var y = 0;
        if (obj.value.length == 0) {
            return {"isDefault": true};
        }
        else if (obj.value.length == 1) {
            y = obj.value[0];
        }
        else {
            x = obj.value[0];
            y = obj.value[1];
        }

        template = "cc.p({value1},{value2})".replace("{value1}", x).replace("{value2}", y);
        return {"param": template, "x": x, "y": y};
    }
    else if (type == "Size") {
        var w = parseInt(obj.value[0]);
        var h = parseInt(obj.value[1]);
        w = isNaN(w) ? 0 : w;
        h = isNaN(h) ? 0 : h;
        template = "cc.size({value1},{value2})".replace("{value1}", w).replace("{value2}", h);
        return {"value": template, "width": w, "height": h};
    }
    else if (type == "Boolean") {
        return {value: obj.value};
    }
    else if (type == "String" || type == "Text") {
        return {value: "\"" + obj.value + "\""};
    }
    else if (type == "FontTTF") {
        return {value: "\"" + obj.value + "\"", isDefault: false};
    }
    else if (type == "FloatScale") {
        return {value: obj.value[0]};
    }
    else if (type == "IntegerLabeled") {
        return {value: obj.value};
    }
    else if (type == "SpriteFrame") {
        template = "game.createSpriteFrame(\"{value}\")".replace("{value}",obj.value[0]);
        return {value: template};
    }
    else if (type == "int") {
        return {value: obj.value};
    }
    else if (type == "Color3") {
        var r = obj.value[0];
        var g = obj.value[1];
        var b = obj.value[2];
        var isDefault = r == "255" && g == "255" && b == "255";
        template = "cc.c3b({value1},{value2},{value3})".replace("{value1}", r).replace("{value2}", g).replace("{value3}", b);
        return {"value": template, r: r, g: g, b: b, isDefault: isDefault};
    }
    else if (type == "Check") {
        return {value: obj.value};
    }
    else {
        return {"param": "false"};
    }
}


ccb.parseState = function (objState) {
    var state = "";
    switch (objState) {
        case "1":
            state = "cc.CONTROL_STATE_NORMAL";
            break;
        case "2":
            state = "cc.CONTROL_STATE_HIGHLIGHTED";
            break;
        case "3":
            state = "cc.CONTROL_STATE_DISABLED";
            break;
    }
    return state;
}


ccb.parser.ignoreAnchorPointForPosition = {};
ccb.parser.ignoreAnchorPointForPosition.param = function (obj) {
    return ccb.parseParamter("Boolean", obj);
}
ccb.parser.ignoreAnchorPointForPosition.codeBlock = function (obj, param) {
    var template = "";
    if (param.value != false) {
        template = "{varName}.ignoreAnchorPointForPosition({value});";
    }
    return template;
}


ccb.parser.position = {};
ccb.parser.position.param = function (obj) {
    return ccb.parseParamter("CCPoint", obj);
}
ccb.parser.position.codeBlock = function (obj, param) {
    var template = "";
    if (param.x != 0 || param.y != 0) {
        template = "{varName}.setPosition({param});";
    }
    return template;
}


ccb.parser.anchorPoint = {};
ccb.parser.anchorPoint.param = function (obj) {
    return ccb.parseParamter("CCPoint", obj);
}
ccb.parser.anchorPoint.codeBlock = function (obj, param) {
    var template = "";
    if (param.isDefault) return "";
    if (param.x != 0.5 || param.y != 0.5) {
        template = "{varName}.setAnchorPoint({param});";
    }
    return template;
}


ccb.parser.scale = {};
ccb.parser.scale.param = function (obj) {
    return ccb.parseParamter("CCPoint", obj);
}
ccb.parser.scale.codeBlock = function (obj, param) {
    var template = "";
    if (param.x != 1 || param.y != 1) {
        template = "{varName}.setScaleX({x});\n{varName}.setScaleY({y});";
    }
    return template;
}


ccb.parser.preferedSize = {};
ccb.parser.preferedSize.param = function (obj) {
    return ccb.parseParamter("Size", obj);
}
ccb.parser.preferedSize.codeBlock = function (obj, param) {
    var template = "{varName}.setPreferredSize({value});";
    return template;
}

ccb.parser.__base = {};
ccb.parser.__base.param = function (obj) {
    return ccb.parseParamter(obj.type, obj);
}
ccb.parser.__base.codeBlock = function (obj, param, state) {
    var template = "";
    if (!param.isDefault) {
        var functionName = "set" + obj.name.charAt(0).toUpperCase() + obj.name.substr(1, obj.name.length);
        if (state != null) {
            functionName += "ForState";
            template = "{varName}." + functionName + "({value},{state});";
        }
        else {
            template = "{varName}." + functionName + "({value});";
        }
    }
    return template;
}

ccb.parser.titleTTF = ccb.parser.__base;
ccb.parser.fontName = ccb.parser.__base;
ccb.parser.titleColor = ccb.parser.__base;
ccb.parser.color = ccb.parser.__base;
ccb.parser.fontSize = ccb.parser.__base;
ccb.parser.string = ccb.parser.__base;
ccb.parser.horizontalAlignment = ccb.parser.__base;
ccb.parser.verticalAlignment = ccb.parser.__base;
ccb.parser.dimensions = ccb.parser.__base;
ccb.parser.contentSize = ccb.parser.__base;
ccb.parser.displayFrame = ccb.parser.__base;
ccb.parser.spriteFrame = ccb.parser.__base;
ccb.parser.touchEnabled = ccb.parser.__base;
ccb.parser.backgroundSpriteFrame = ccb.parser.__base;
ccb.parser.visible = ccb.parser.__base;
ccb.parser.zoomOnTouchDown = ccb.parser.__base;
ccb.parser.title = ccb.parser.__base;
ccb.parser.enabled = ccb.parser.__base;
ccb.parser.titleTTFSize = ccb.parser.__base;
ccb.parser.labelAnchorPoint = ccb.parser.__base;

ccb.parser.ccControl = {};
ccb.parser.ccControl.param = function (obj) {
    var target = "host";
    var selector = "host." + obj.value[0];
    var type = obj.value[2];
    return {value: target + "," + selector + "," + type};
}
ccb.parser.ccControl.codeBlock = function (obj, param, state) {
    var functionName = "addTargetWithActionForControlEvents";
    var template = "{varName}." + functionName + "({value});";
    return template;
}







ccb.getResourceString = function(path){
    var plist = require('plist');
    var config = plist.parseFileSync(path);
    var nodeConfig = plist.nodeGraph;
    console.log (config);
}

ccb.getCCBData = function(path){
    var plist = require('plist');
    var config = plist.parseFileSync(path);
    return config;
}

ccb.loopNode = function(node,callback){
    callback(node);
    node.children.forEach(function (childObj) {
        ccb.loopNode(childObj, callback);
    });
}

exports.parseNode = ccb.parseNode;
exports.getResource = ccb.getResourceString;
exports.getCCBData = ccb.getCCBData;
exports.loop = ccb.loopNode;