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
            public frontImgSrc: string,
            public backImgSrc: string,
            public attacks: Array<Attack>) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attack = attack;
        this.defense = defense;
        this.spAttack = spAttack;
        this.spDefense = spDefense;
        this.speed = speed;
        this.frontImgSrc = frontImgSrc;
        this.backImgSrc = backImgSrc;
        this.attacks = attacks
    }

    public isKO(): boolean {
        return this.health <= 0;
    }

    public getRandomAttack(): Attack {
        const index: number = Math.floor(Math.random() * this.attacks.length);
        return this.attacks[index];
    }

    // Level up pokemon from Lvl.1 to `level`
    /*public static levelUp(pokemon: Pokemon, level: number): Pokemon {
        // Do nothing if pokemon is not lvl 1 (Not implemented) or `level` is incorrect
        if (pokemon.level != 1 || level <= 1 && level > 100) return pokemon;

        return new Pokemon(pokemon.name, pokemon.type, level,
            Pokemon.calculateNewStat(pokemon.maxHealth, level, true),
            Pokemon.calculateNewStat(pokemon.attack, level),
            Pokemon.calculateNewStat(pokemon.defense, level),
            Pokemon.calculateNewStat(pokemon.spAttack, level),
            Pokemon.calculateNewStat(pokemon.spDefense, level),
            Pokemon.calculateNewStat(pokemon.speed, level), 
            "", "", pokemon.attacks);
    }

    public static calculateNewStat(baseStat: number, level: number, isHealth: boolean = false): number {
        if (isHealth) {
            return Math.floor((8 + 2 * baseStat) * level / 100 + level + 10);
        }
        return Math.floor((8 + 2 * baseStat) * level / 100 + 5);
    }*/
}