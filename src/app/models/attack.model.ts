import { Type } from "./type.model";

export enum Nature { Physical, Special }

export class Attack {
    constructor(public name: string,
        public type: Type,
        public power: number,
        public precision: number,
        public nature: Nature) {
            this.name = name;
            this.type = type;
            this.power = power;
            this.precision = precision;
            this.nature = nature;
        }
}