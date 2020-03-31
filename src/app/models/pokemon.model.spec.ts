import { Pokemon } from "./pokemon.model";
import { Type } from "./type.model";
import { Attack, Nature } from "./attack.model";

describe('Pokemon tests', () => {
    const attack: Attack = new Attack("Charge", Type.Normal, 40, 100, Nature.Physical);
    
    const capumain: Pokemon = new Pokemon("Capumain", Type.Normal, 20, 130, 120, 123, 80, 80, 187, [attack]);

    it('detect when a pokemon is not ko', () => {
        capumain.health = 130;
        expect(capumain.isKO()).toBeFalsy()
    });

    it('detect when a pokemon is ko', () => {
        capumain.health = 0;
        expect(capumain.isKO()).toBeTruthy()
    });

    it('get an attack from the pokemon', () => {
        const att: Attack = capumain.getRandomAttack();

        expect(capumain.getRandomAttack()).toEqual(att);
    })
});
