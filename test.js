var SelectHeroItemLayer = cc.Layer.extend({
ctor:function(host){
root.setPosition(cc.p(225,55));
root.setContentSize(cc.size(450,110));
root.setTouchEnabled(true);
//ignore:mouseEnabled

var temp1 = cc.Sprite.create();
temp1.setPosition(cc.p(225,54));
temp1.setScaleX(1);
temp1.setScaleY(0.800000011920929);
temp1.setDisplayFrame(game.createSpriteFrame("graph/background/background-022.png"));
root.addChild(temp1);

var OkBtn = cc.ControlButton.create();
host.OkBtn = OkBtn;
OkBtn.setPosition(cc.p(372,40));
OkBtn.addTargetWithActionForControlEvents(host,host.onOkHandler,32);
OkBtn.setEnabled(true);
OkBtn.setTitleForState("上阵",cc.CONTROL_STATE_NORMAL);
OkBtn.setTitleTTFForState("Courier-Bold",cc.CONTROL_STATE_NORMAL);
OkBtn.setTitleTTFSizeForState(24,cc.CONTROL_STATE_NORMAL);
OkBtn.setLabelAnchorPoint({value});
OkBtn.setPreferredSize(cc.size(121,56));
OkBtn.setZoomOnTouchDown(true);
OkBtn.setBackgroundSpriteFrameForState(game.createSpriteFrame("graph/btn/btnbg-003-1.png"),cc.CONTROL_STATE_NORMAL);
OkBtn.setBackgroundSpriteFrameForState(game.createSpriteFrame("graph/btn/btnbg-003-2.png"),cc.CONTROL_STATE_HIGHLIGHTED);
OkBtn.setBackgroundSpriteFrameForState(game.createSpriteFrame("graph/btn/btnbg-003-3.png"),cc.CONTROL_STATE_DISABLED);
root.addChild(OkBtn);

var heroLevelLabel = cc.LabelTTF.create();
host.heroLevelLabel = heroLevelLabel;
heroLevelLabel.setPosition(cc.p(134.5,56));
heroLevelLabel.setAnchorPoint(cc.p(0,0.5));
heroLevelLabel.setFontName("Courier-Bold");
heroLevelLabel.setFontSize(18);
heroLevelLabel.setColor(cc.c3b(78,32,90));
heroLevelLabel.setDimensions(cc.size(0,0));
heroLevelLabel.setHorizontalAlignment(0);
heroLevelLabel.setVerticalAlignment(0);
heroLevelLabel.setString("等级:20");
root.addChild(heroLevelLabel);

var heroNameLabel = cc.LabelTTF.create();
host.heroNameLabel = heroNameLabel;
heroNameLabel.setPosition(cc.p(133,84.5));
heroNameLabel.setAnchorPoint(cc.p(0,0.5));
heroNameLabel.setFontName("Courier-Bold");
heroNameLabel.setFontSize(18);
heroNameLabel.setColor(cc.c3b(54,23,9));
heroNameLabel.setDimensions(cc.size(0,0));
heroNameLabel.setHorizontalAlignment(0);
heroNameLabel.setVerticalAlignment(0);
heroNameLabel.setString("典韦");
root.addChild(heroNameLabel);

var heroCombatEffectivenessLabel = cc.LabelTTF.create();
host.heroCombatEffectivenessLabel = heroCombatEffectivenessLabel;
heroCombatEffectivenessLabel.setPosition(cc.p(112,28));
heroCombatEffectivenessLabel.setAnchorPoint(cc.p(0,0.5));
heroCombatEffectivenessLabel.setFontName("Courier-Bold");
heroCombatEffectivenessLabel.setFontSize(18);
heroCombatEffectivenessLabel.setColor(cc.c3b(227,99,79));
heroCombatEffectivenessLabel.setDimensions(cc.size(0,0));
heroCombatEffectivenessLabel.setHorizontalAlignment(0);
heroCombatEffectivenessLabel.setVerticalAlignment(0);
heroCombatEffectivenessLabel.setString("战斗力:1234");
root.addChild(heroCombatEffectivenessLabel);

var HeroHeadSprite = cc.Node.create();
host.HeroHeadSprite = HeroHeadSprite;
HeroHeadSprite.setPosition(cc.p(62.5,57));
root.addChild(HeroHeadSprite);

var state = cc.LabelTTF.create();
host.state = state;
state.setPosition(cc.p(374,83));
state.setFontName("Courier-Bold");
state.setFontSize(18);
state.setColor(cc.c3b(180,58,54));
state.setDimensions(cc.size(0,0));
state.setHorizontalAlignment(1);
state.setVerticalAlignment(0);
state.setString("已上阵");
root.addChild(state);

var previewbtn = cc.ControlButton.create();
host.previewbtn = previewbtn;
previewbtn.setPosition(cc.p(62.5,57));
previewbtn.addTargetWithActionForControlEvents(host,host.onpreviewhandle,32);
previewbtn.setEnabled(true);
previewbtn.setTitleForState("",cc.CONTROL_STATE_NORMAL);
previewbtn.setTitleTTFForState("Helvetica",cc.CONTROL_STATE_NORMAL);
previewbtn.setTitleTTFSizeForState(12,cc.CONTROL_STATE_NORMAL);
previewbtn.setLabelAnchorPoint({value});
previewbtn.setPreferredSize(cc.size(82,82));
previewbtn.setZoomOnTouchDown(true);
previewbtn.setBackgroundSpriteFrameForState(game.createSpriteFrame("graph/btn/button-049.png"),cc.CONTROL_STATE_NORMAL);
previewbtn.setBackgroundSpriteFrameForState(game.createSpriteFrame("graph/btn/button-049.png"),cc.CONTROL_STATE_HIGHLIGHTED);
previewbtn.setBackgroundSpriteFrameForState(game.createSpriteFrame("graph/btn/button-049.png"),cc.CONTROL_STATE_DISABLED);
root.addChild(previewbtn);

var HeroQualityStarsNode = cc.Node.create();
host.HeroQualityStarsNode = HeroQualityStarsNode;
HeroQualityStarsNode.setPosition(cc.p(62.5,17.5));
root.addChild(HeroQualityStarsNode);

var ArmsBorder = cc.Sprite.create();
host.ArmsBorder = ArmsBorder;
ArmsBorder.setPosition(cc.p(119,57));
ArmsBorder.setScaleX(0.4000000059604645);
ArmsBorder.setScaleY(0.4000000059604645);
ArmsBorder.setDisplayFrame(game.createSpriteFrame("dynamic/background/arms_border_1.png"));
root.addChild(ArmsBorder);

var ArmsType = cc.Sprite.create();
host.ArmsType = ArmsType;
ArmsType.setPosition(cc.p(119,57));
ArmsType.setScaleX(0.4000000059604645);
ArmsType.setScaleY(0.4000000059604645);
ArmsType.setDisplayFrame(game.createSpriteFrame("dynamic/armstype/arms_type_1.png"));
root.addChild(ArmsType);

var heroCampNode = cc.Sprite.create();
host.heroCampNode = heroCampNode;
heroCampNode.setPosition(cc.p(119,85));
heroCampNode.setScaleX(0.699999988079071);
heroCampNode.setScaleY(0.699999988079071);
heroCampNode.setDisplayFrame(game.createSpriteFrame("dynamic/background/hero_camp_1.png"));
root.addChild(heroCampNode);

var Arrow = cc.Sprite.create();
host.Arrow = Arrow;
Arrow.setVisible(false);
Arrow.setPosition(cc.p(374,44));
Arrow.setScaleX(0.800000011920929);
Arrow.setScaleY(0.800000011920929);
Arrow.setDisplayFrame(game.createSpriteFrame("graph/shape/shape-030.png"));
root.addChild(Arrow);

var InfoBtn = cc.ControlButton.create();
host.InfoBtn = InfoBtn;
InfoBtn.setPosition(cc.p(278,59));
InfoBtn.addTargetWithActionForControlEvents(host,host.onPressedInfoHandler,32);
InfoBtn.setEnabled(true);
InfoBtn.setTitleForState("",cc.CONTROL_STATE_NORMAL);
InfoBtn.setTitleTTFForState("Helvetica",cc.CONTROL_STATE_NORMAL);
InfoBtn.setTitleTTFSizeForState(12,cc.CONTROL_STATE_NORMAL);
InfoBtn.setLabelAnchorPoint({value});
InfoBtn.setPreferredSize(cc.size(340,100));
InfoBtn.setZoomOnTouchDown(true);
InfoBtn.setBackgroundSpriteFrameForState(game.createSpriteFrame("graph/btn/button-156.png"),cc.CONTROL_STATE_NORMAL);
InfoBtn.setBackgroundSpriteFrameForState(game.createSpriteFrame("graph/btn/button-157.png"),cc.CONTROL_STATE_HIGHLIGHTED);
InfoBtn.setBackgroundSpriteFrameForState(game.createSpriteFrame("graph/btn/button-156.png"),cc.CONTROL_STATE_DISABLED);
root.addChild(InfoBtn);
}})