/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 13-10-2
 * Time: PM12:44
 * To change this template use File | Settings | File Templates.
 */

var generateCppVariable = function(node){
    return "m_p" + node.memberVarAssignmentName.charAt(0).toUpperCase() + node.memberVarAssignmentName.substring(1);
}


var generateCppInclude = function(fileName){
    var includeList = [
        fileName
    ]

    includeList = includeList.map(function(item){
        return "#include \"" +item + ".h" +"\"";
    })

    var namespaceList = [
        "USING_NS_CC",
        "USING_NS_CC_EXT"
    ]

    return includeList.join("\n") + "\n\n" + namespaceList.join("\n") + "\n";
}


var generateCppConstructor = function(fileName,nodeList){
    nodeList = nodeList || [];
    var varNameList = nodeList.map(function(item){
        return generateCppVariable(item);
    })

    var varNameText = varNameList.map(function(item){
        return " " + item + "(NULL)";
    }).join("\n,");


    var template = "{ClassName}::{ClassName}()\n" +
        ":" + varNameText +
        "\n{\n}\n";
    return template.replace(/{ClassName}/gi,fileName);
}


var generateCppDestructor = function(fileName,nodeList){
    nodeList = nodeList || [];
    var varNameList = nodeList.map(function(item){
        return generateCppVariable(item);
    })
    var destructorCodeBlock = varNameList.map(function(item){
        return "    CC_SAFE_RELEASE({item});".replace("{item}",item);
    }).join("\n");

    var template = "{ClassName}::~{ClassName}()" +
        "\n{\n" +
        destructorCodeBlock +
        "\n}\n";
    return template.replace(/{ClassName}/gi,fileName);
}


var generateGlueMethod = function(fileName,nodeList){

    var template = "bool {ClassName}::onAssignCCBMemberVariable(cocos2d::CCObject * pTarget, const char * pMemberVariableName, cocos2d::CCNode * pNode)";
    template += "\n{\n";
    template += nodeList.map(function(item){
        return "    CCB_MEMBERVARIABLEASSIGNER_GLUE(this, {nodeName}, {nodeType}, this->{varName});"
            .replace("{nodeName}","\"" + item.memberVarAssignmentName + "\"")
            .replace("{nodeType}",item.baseClass + " *")
            .replace("{varName}",generateCppVariable(item));
    }).join("\n");
    template += "\n    return false;";
    template += "\n}\n";
    return template.replace("{ClassName}",fileName);
}


var generateCppText = function(fileName,nodeList){

    var template = [
        "{include}",
        "{constructor}",
        "{destructor}",
        "{glueMethod}"//,
//        "{templateMethod}",
//        "{businessLogicMethod}"
    ].join("\n");
    nodeList = nodeList.filter(function(node){
        return node.memberVarAssignmentName != "";
    });
    return template
        .replace("{include}",generateCppInclude(fileName))
        .replace("{constructor}",generateCppConstructor(fileName,nodeList))
        .replace("{destructor}",generateCppDestructor(fileName,nodeList))
        .replace("{glueMethod}",generateGlueMethod(fileName,nodeList))
}


var generateHeaderClassDefine = function(fileName,nodeList){
    var template = "class {ClassName} : public cocos2d::CCLayer\n" +
        ", public cocos2d::extension::CCBSelectorResolver\n" +
        ", public cocos2d::extension::CCBMemberVariableAssigner\n" +
        ", public cocos2d::extension::CCNodeLoaderListener"
    return template;
}


var generateHeaderTemplateMethod = function (fileName,nodeList){
    var template = "public:\n\n" + "{public}\n" + "\nprivate:\n\n" + "{private}";
    var publicList = [
        "void onEnter();",
        "void onExit();",
        "cocos2d::SEL_MenuHandler onResolveCCBCCMenuItemSelector(cocos2d::CCObject * pTarget, const char * pSelectorName);",
        "cocos2d::extension::SEL_CCControlHandler onResolveCCBCCControlSelector(cocos2d::CCObject * pTarget, const char * pSelectorName);",
        "bool onAssignCCBMemberVariable(cocos2d::CCObject * pTarget, const char * pMemberVariableName, cocos2d::CCNode * pNode);",
        "void onNodeLoaded(cocos2d::CCNode * pNode, cocos2d::extension::CCNodeLoader * pNodeLoader);"
        ];


    var privateList = nodeList.map(function(item){
        return  "{nodeType}{varName}"
            .replace("{nodeType}",item.baseClass + " *")
            .replace("{varName}",generateCppVariable(item));
    });
    return template
        .replace("{public}",publicList.join("\n"))
        .replace("{private}",privateList.join("\n"));
}


var generateHeaderText = function(fileName,nodeList){
    var template = [
        "#ifndef __CocosDragonJS__{ClassName}__",
        "#define __CocosDragonJS__{ClassName}__",
        "#include \"cocos2d.h\"",
        "#include \"cocos-ext.h\"",
        "",
        "{ClassDefine}",
        "{",
        "{templateMethod}",
//        "{businessLogicMethod}"
        "};",
        "#endif"
    ].join("\n");
    nodeList = nodeList.filter(function(node){
        return node.memberVarAssignmentName != "";
    });
    return template
        .replace("{ClassDefine}",generateHeaderClassDefine(fileName,nodeList))
        .replace("{templateMethod}",generateHeaderTemplateMethod(fileName,nodeList))
        .replace(/{ClassName}/gi,fileName)
}

var ccbParser = require("./ccbparser.js");
var ccbConfig = ccbParser.getCCBData("./SelectHeroItemLayer.ccb");
var nodeList = ccbParser.loopNodeSync(ccbConfig.nodeGraph);
//console.log (generateGlueMethod("LoginLayer",["m_pHeroSkinNode","m_pEmbattleBtn"]));
console.log (generateCppText("LoginLayer",nodeList));
console.log (generateHeaderText("LoginLayer",nodeList));

