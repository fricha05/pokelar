import { Pokemon } from "./pokemon.model";
import { Attack, Nature } from "./attack.model";

export class Battle {
    private static intervalId: NodeJS.Timeout;

    public static isFirstStarting(pokemon1: Pokemon, pokemon2: Pokemon): boolean {
        if (pokemon1.speed === pokemon2.speed) {
            return Math.floor(Math.random() * 2) + 1 === 1; 
        } else {
            return pokemon1.speed > pokemon2.speed;
        }
    }

    private static isAttackSuccessful(attack: Attack) {
        const roll: number = Math.floor(Math.random() * 100) + 1;
        return roll <= attack.precision;
    }

    // Returns damage dealt
    public static calculateDamage(attacker: Pokemon, receiver: Pokemon, attack: Attack): number {
        if (attack.nature === Nature.Physical) {
            return Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) 
                * attacker.attack * attack.power / receiver.defense) / 50) + 2;
        } else {
            return Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) 
                * attacker.spAttack * attack.power / receiver.spDefense) / 50) + 2;
        }
    }

    private static attack(attacker: Pokemon, receiver: Pokemon): void {
        let attack: Attack = attacker.getRandomAttack();
        if (Battle.isAttackSuccessful(attack)) {
            console.log(`${attacker.name} attaque ${attack.name}.`);
            const dmg: number = Battle.calculateDamage(attacker, receiver, attack);
            receiver.health -= dmg;
            console.log(`${attacker.name} inflige ${dmg} points de dégâts.`);

            if (receiver.health <= 0) { 
                receiver.health = 0; // Remise à 0 pour ne pas afficher de points négatifs
                console.log(`${receiver.name} est KO.`)
            }

        } else {
            console.log(`${attacker.name} rate son attaque.`);
        }
    }

    public static rounds(pokemon: Pokemon, pokemon2: Pokemon): Promise<Pokemon> {
        let i: number = 1;
        return new Promise<Pokemon>((resolve, reject) => {
            Battle.intervalId = setInterval(() => {
                const first: Pokemon = this.isFirstStarting(pokemon, pokemon2) ? pokemon : pokemon2;
                const second: Pokemon = this.isFirstStarting(pokemon, pokemon2) ? pokemon2 : pokemon;
    
                console.log(`Tour ${i++}`);

                // First attack
                this.attack(first, second);
    
                if (!second.isKO()) {
                    // Second Attack
                    this.attack(second, first);

                    if (first.isKO()) {
                        resolve(second);
                        clearInterval(Battle.intervalId);
                        return;
                    }
                } else {
                    resolve(first);
                    clearInterval(Battle.intervalId);
                    return;
                }
            }, 500);
        })
    }
}