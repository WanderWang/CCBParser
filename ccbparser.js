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
    var parser = ccb.parser[obj.name];
    if (parser != null) {
        param = parser.param(obj);
        template = parser.codeBlock(obj,param);
    }
    else {
        template = "//ignore:" + obj.name;
    }


    for (var key in param) {
        var value = param[key];
        template = template.replace("{" + key + "}", value);
    }
    return template;
}

ccb.parseParamter = function (type, obj) {
    var template = "";
    if (type == "CCPoint") {
        template = "cc.p({value1},{value2})".replace("{value1}", obj.value[0]).replace("{value2}", obj.value[1]);
        return {"param": template, "x": obj.value[0], "y": obj.value[1]};
    }
    else if (type == "Boolean") {
        return {"Boolean": obj.value};
    }
    else {
        return {"param": "false"};

    }
}





ccb.parser.ignoreAnchorPointForPosition = {};
ccb.parser.ignoreAnchorPointForPosition.param = function (obj) {
    return ccb.parseParamter("Boolean", obj);
}
ccb.parser.ignoreAnchorPointForPosition.codeBlock = function (obj, param) {
    var template = "";
    if (param.Boolean != false) {
        template = "{varName}.ignoreAnchorPointForPosition = {Boolean};";
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
        template = "{varName}.setEnabled({Boolean});";
    }
    return template;
}


exports.parseNode = ccb.parseNode;