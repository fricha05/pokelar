import { Type } from "./type.model";
import { Attack } from "./attack.model";

export class Pokemon {
    public maxHealth: number

    constructor(public name: string,
            public type: Type,
            public level: number,
            public health: number,
            public attack: number,
            public defense: number,
            public spAttack: number,
            public spDefense: number,
            public speed: number,
            public attacks: Array<Attack>) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attack = attack;
        this.defense = defense;
        this.spAttack = spAttack;
        this.spDefense = spDefense;
        this.speed = speed;
        this.attacks = attacks
    }

    public isKO(): boolean {
        return this.health <= 0;
    }

    public getRandomAttack(): Attack {
        const index: number = Math.floor(Math.random() * this.attacks.length);
        return this.attacks[index];
    }

    public toString(): string  {
        return `${this.name} \tLvl ${this.level}\n`
            + `\tPV\t${this.health} \tVIT\t${this.speed}\n`
            + `\tATQ\t${this.attack} \tDEF\t${this.defense}\n`
            + `\tATQ SP\t${this.spAttack} \tDEF SP\t${this.spDefense}\n`
    }
}