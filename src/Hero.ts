var Cache: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {
    const getter = desc.get;
    desc.get = function () {
        return getter.apply(this);
    }
    return desc;
}


class User {
	private lvl: number;
	private exp: number;
	private gold: number;
	private cash: number;
	private hero: Hero[] = [];

	public constructor(lvl: number, exp: number, gold: number, cash: number, hero: Hero[]) {
		this.lvl = lvl;
		this.exp = exp;
		this.gold = gold;
		this.cash = cash;
		this.hero = hero;
	}

	public get heroesInTeam() {
		return this.hero.filter(hero => hero.isInTeam);
	}

	public get fightPower(): number {
		var result: number = 0;
		console.log(this.heroesInTeam);
		this.heroesInTeam.map(hero => result += hero.fightPower);
		return result;
	}

}



class Hero {
	public isInTeam: boolean;
	private lvl: number = 1;
	private healthRatio: number = 1;
	private atkRatio: number = 1;
	private equipment: Equipment[] = [];

	public constructor(healthRatio: number, atkRatio: number, equipment: Equipment[]) {
		this.isInTeam = true;
		this.healthRatio = healthRatio;
		this.atkRatio = atkRatio;
		this.equipment = equipment;
	}

	public get maxHP(): number {
		return this.lvl * this.healthRatio;
	}

	public get basicAtk(): number {
		var result: number = 0;
		result = this.lvl * this.atkRatio;
		console.log('英雄基础伤害：' + result)
		return result;
	}

	@Cache
	public get fightPower(): number {
		var result: number = 0;
		this.equipment.map(equipment => result += equipment.fightPower)          ////////// 装备攻击力 + 英雄基础攻击力 = 英雄的总攻击力
		result += this.basicAtk;
		return result;
	}
}


class Equipment {
	private atk: number = 1;
	private quality: Quality;
	private bullet: Bullet;
	private equipmentLvl: number = 1;

	constructor(atk: number, quality: Quality, bullet: Bullet, equipmentLvl: number) {
		this.atk = atk;
		this.quality = quality;
		this.bullet = bullet;
		this.equipmentLvl = equipmentLvl;
	}

	public get basicAtk(): number {
		var result: number = 0;
		result = this.atk * this.quality * this.equipmentLvl;
		console.log('武器基础伤害：' + result)
		return result;
	}

	public get fightPower(): number {
		return this.basicAtk * this.bullet.fightPower;
	}
}

class Weapon extends Equipment{

}


class Bullet {
	private bulletType: BulletType;
	private bulletLvl: BulletLvl;

	constructor(bulletType: BulletType, bulletLvl: BulletLvl) {
		this.bulletType = bulletType;
		this.bulletLvl = bulletLvl;

	}

	public get fightPower(): number {
		var result: number = 0;
		result = this.bulletLvl * this.bulletType;
		console.log('子弹加成：' + result)
		return result;
	}

}


enum Quality {                          ////装备品质：白，蓝，紫，橙
	WHITE = 1,
	BLUE = 1.1,
	PURPLE = 1.2,
	ORANGE = 1.3
}

enum BulletType {
	NORMAL = 1,                         ////子弹类型：普通子弹，燃烧子弹，空尖子弹
	FLAMING = 1.03,
	JHP = 1.06
}

enum BulletLvl {
	GENERAL = 1,                        ////子弹等级：通用，警用，军用
	POLICE = 1.1,
	MILITARY = 1.2
}