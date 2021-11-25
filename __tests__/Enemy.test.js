const Enemy = require('../lib/Enemy');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion.js');

test('creates an enemy object', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.name).toBe('goblin');
    expect(enemy.weapon).toBe('sword');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
});


test("gets Enemy's health value", () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()))
});

test('checks if Enemy is alive or not', () => {
    const Enemy = new Enemy('goblin', 'sword');

    expect(Enemy.isAlive()).toBeTruthy();

    Enemy.health = 0;

    expect(Enemy.isAlive()).toBeFalsy();
});

test("subtracts from Enemy's health", () => {
    const Enemy = new Enemy('goblin', 'sword');
    const oldHealth = Enemy.health;

    Enemy.reduceHealth(5);

    expect(Enemy.health).toBe(oldHealth - 5);

    Enemy.reduceHealth(99999);

    expect(Enemy.health).toBe(0);
});

test("Gets Enemy's attak value", () => {
    const Enemy = new Enemy('goblin', 'sword');
    Enemy.strength = 10;

    expect(Enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(Enemy.getAttackValue()).toBeLessThanOrEqual(15);

});

test('adds potion to the inventory', () => {
    const Enemy = new Enemy('goblin', 'sword');
    const oldCount = Enemy.inventory.length;

    Enemy.addPotion(new Potion());

    expect(Enemy.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from inventory', () => {
    const Enemy = new Enemy('goblin', 'sword');
    Enemy.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = Enemy.inventory.length;

    Enemy.usePotion(1);

    expect(Enemy.inventory.length).toBeLessThan(oldCount);
});