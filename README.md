# RPGUser
本游戏共有四层设计——用户、英雄、装备（武器）、子弹。  
用户自身的属性对于攻防无影响，主要看英雄、装备、子弹的属性。
## 第一层：用户
用户有四个基础属性——等级、经验、游戏币、现金（充值）、英雄。  
用户的总战斗力 = 所有英雄战斗力之和。
## 第二层：英雄
英雄有三个基础属性——等级、生命值倍率、攻击力倍率。（生命值与攻击力倍率类似于天赋）  
英雄的最大生命值 = 等级 * 生命值倍率  
英雄的基础攻击力 = 等级 * 攻击力倍率  
英雄的总攻击力 = 基础攻击力 + 装备攻击力  
英雄拥有装备。  
## 第三层：装备  
装备有三个属性——攻击力、等级、品质。  
装备的基础攻击力 = 攻击力 * 品质 * 等级  
品质有：白、蓝、紫、橙；等级与英雄等级类似，等级越低的装备越过时。  
装备的攻击力 = 子弹加成 * 装备的基础攻击力  
## 第四层：子弹  
子弹有类型和等级两种基础属性。  
类型——普通子弹 燃烧弹 空尖弹  
等级——通用 警用 军用  
子弹加成 = 类型 * 等级
