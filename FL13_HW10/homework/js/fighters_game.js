class Fighter {

    constructor(props) {
        const _name = props.name;
        this.getName = () => _name;

        let _damage = props.damage;
        this.getDamage = () => _damage;

        const _max_hp = props.hp;
        this.getMaxHealth = () => _max_hp;

        let _hp = props.hp;
        this.setHealth = (hp) => {
            _hp = hp;
        };
        this.getHealth = () => _hp;

        let _strength = props.strength;
        this.getStrength = () => _strength;

        let _agility = props.agility;
        this.getAgility = () => _agility;

        let _win = 0;
        this.addWin = () => {
            _win++;
        };
        this.getWin = () => _win;

        let _lose = 0;
        this.addLose = () => {
            _lose++;
        };
        this.getLose = () => _lose;
    }

    attack(fighter) {
        const CHANCE = 100;
        const miss_chance = fighter.getStrength() + fighter.getAgility();
        const missed = Math.floor(Math.random() * CHANCE);

        if (missed <= miss_chance) {
            console.log(`${this.getName()} attack missed`);

            return this;
        }

        console.log(`${this.getName()} makes ${this.getDamage()} damage to ${fighter.getName()}`);

        return fighter.dealDamage(this.getDamage());
    }

    logCombatHistory() {
        console.log(`Name: ${this.getName()}, Wins: ${this.getWin()}, Losses: ${this.getLose()}`);
    }

    heal(amount) {
        if (this.getHealth() + amount > this.getMaxHealth()) {
            this.setHealth(this.getMaxHealth());

            return this;
        }

        this.setHealth(this.getHealth() + amount);

        return this;
    }

    dealDamage(amount) {
        if (this.getHealth() - amount <= 0) {
            this.setHealth(0);

            return this;
        }

        this.setHealth(this.getHealth() - amount);

        return this;
    }
}

/**
 * Simulates battle between two fighters.
 *
 * @param {Fighter} fighter1
 * @param {Fighter} fighter2
 */
function battle(fighter1, fighter2) {

    let attacker = fighter1;
    let defender = fighter2;

    /**
     * The fighter is dead after attack.
     *
     * @returns {boolean}
     */
    const dead = () => {
        if (defender.getHealth()) {
            return false;
        }

        defender.addLose();
        attacker.addWin();

        return true;
    };

    /**
     * The fighter is dead before fight.
     *
     * @param {Fighter} fighter
     * @returns {boolean}
     */
    const cantFight = (fighter) => {
        if (fighter.getHealth()) {
            return false;
        }

        console.log(`${fighter.getName()} is dead and can't fight.`);

        return true;
    };

    if (cantFight(attacker) || cantFight(defender)) {
        return;
    }

    let win = false;
    while (!win) {
        attacker.attack(defender);

        if (dead()) {
            console.log(`${attacker.getName()} has won!`);
            win = true;
        } else {
            const tmp = attacker;
            attacker = defender;
            defender = tmp;
        }
    }
}
