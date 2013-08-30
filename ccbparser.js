var ccb = {};
ccb.parser = {};


ccb.parseNode = function (obj) {
    var memberVarAssignmentName = obj.memberVarAssignmentName;
    var memberVarAssignmentType = obj.memberVarAssignmentType;
    var template = "var {varName} = cc.ControlButton.create();\n";
    obj.properties.forEach(function (property) {
        var line = ccb.parseProerties(property);
        line = line == "" ? "" : line + "\n";
        template += line;
    })
    return template.replace(/{varName}/gi, memberVarAssignmentName);
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
        template = parser.codeBlock(obj, param,objState);
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
        if (obj.value.length == 0){
            return {"isDefault":true};
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
    else if (type == "FloatScale"){
        return {value:obj.value[0]};
    }
    else if (type == "IntegerLabeled"){
        return {value:obj.value};
    }
    else if (type == "SpriteFrame"){
        return {value:"\"" + obj.value[0] + "\""};
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
    if (param.Boolean != false) {
        template = "{varName}.ignoreAnchorPointForPosition = {value};";
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


ccb.parser.enabled = {};
ccb.parser.enabled.param = function (obj) {
    return ccb.parseParamter("Boolean", obj);
}
ccb.parser.enabled.codeBlock = function (obj, param) {
    var template = "";
    if (param.Boolean != true) {
        template = "{varName}.setEnabled({value});";
    }
    return template;
}


ccb.parser.title = {};
ccb.parser.title.param = function (obj) {
    return ccb.parseParamter("String", obj);
}
ccb.parser.title.codeBlock = function (obj, param) {
    var template = "";
    if (param.Boolean != true) {
        template = "{varName}.setTitleForState({value}, cc.CONTROL_STATE_NORMAL);";
    }
    return template;
}


ccb.parser.titleTTFSize = {};
ccb.parser.titleTTFSize.param = function (obj) {
    return ccb.parseParamter("int", obj);
}
ccb.parser.titleTTFSize.codeBlock = function (obj, param) {
    var template = "";
    if (param.Boolean != true) {
        template = "{varName}.setTitleTTFSizeForState({value}, cc.CONTROL_STATE_NORMAL);";
    }
    return template;
}


ccb.parser.labelAnchorPoint = {};
ccb.parser.labelAnchorPoint.param = function (obj) {
    return ccb.parseParamter("CCPoint", obj);
}
ccb.parser.labelAnchorPoint.codeBlock = function (obj, param) {
    var template = "";
    if (param.x != 0.5 || param.y != 0.5) {
        template = "{varName}.setLabelAnchorPoint({param});";
    }
    return template;
}


ccb.parser.preferedSize = {};
ccb.parser.preferedSize.param = function (obj) {
    return ccb.parseParamter("Size", obj);
}
ccb.parser.preferedSize.codeBlock = function (obj, param) {
    var template = "";
    if (param.x != 0.5 || param.y != 0.5) {
        template = "{varName}.setPreferedSize({value});";
    }
    return template;
}


ccb.parser.zoomOnTouchDown = {};
ccb.parser.zoomOnTouchDown.param = function (obj) {
    return ccb.parseParamter("Boolean", obj);
}
ccb.parser.zoomOnTouchDown.codeBlock = function (obj, param) {
    var template = "";
    if (true) {//aram.x != 0.5 || param.y != 0.5) {
        template = "{varName}.setZoomOnTouchDown({value});";
    }
    return template;
}

ccb.parser.backgroundSpriteFrame = {};
ccb.parser.backgroundSpriteFrame.param = function (obj) {
    return ccb.parseParamter("String", obj);
}
ccb.parser.backgroundSpriteFrame.codeBlock = function (obj, param) {


    var template = "";
    if (true) {//aram.x != 0.5 || param.y != 0.5) {
        template = "{varName}.setBackgroundSpriteFrameForState({value},{state});";
    }
    return template;
}





ccb.parser.__base = {};
ccb.parser.__base.param = function (obj) {
    return ccb.parseParamter(obj.type, obj);
}
ccb.parser.__base.codeBlock = function (obj, param,state) {
    var template = "";
    if (!param.isDefault) {
        var functionName = "set" + obj.name.charAt(0).toUpperCase() + obj.name.substr(1, obj.name.length);
        if (state != null){
            functionName += "ForState";
            template = "{varName}." + functionName + "({value},{state});";
        }
        else
        {
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
ccb.parser.displayFrame = ccb.parser.__base;


exports.parseNode = ccb.parseNode;