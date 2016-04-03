export default {
	PlayerShip: {
		width:24,
		height:21,
		type: 'player',
		turretVerticalPositionOffset: 5,
		currentWeaponLevel: 0,
		spriteCoords: {
			x: 0,
			y: 6
		}
	},
	EnemyShips: [
		{
			width:24,
			height:21,
			fireRate: 1500,
			type: 'enemy',
			currentWeaponLevel: 0,
			spriteCoords: {
				x: 0,
				y: 6
			}
		}
	],
	Weapons: {
		player: [
			{
				type: 'Player Weapons Fire: Level 1',
				level: 1,
				damage: 1,
				width: 9,
				height: 7,
				velocity: 16,
				fireRate: 8,
				isProjectile: true,
				isHoming: false,
				ammunition: {
					width: 10,
					height: 5,
					spriteCoords: {
						x: 138,
						y: 29
					}
				}
			},
			{
				level: 2,
				damage: 2,
				width: 9,
				height: 7,
				velocity: 16,
				isProjectile: true,
				hasRapidFire: true,
				ammunition: {
					width: 1,
					height: 1,
					spriteCoords: {
						x: 0,
						y: 58
					}
				},
				turrets: {
					width: 25,
					height: 19,
					spriteCoords: {
						x: 28,
						y: 57
					}
				}
			}
		],
		enemy: [
			{
				type: 'Enemy Weapons Fire: Level 1',
				damage: 1,
				width: 9,
				height: 7,
				velocity: 4,
				isProjectile: true,
				ammunition: {
					width: 7,
					height: 3,
					spriteCoords: {
						x: 147,
						y: 298
					}
				}
			}
		]
	},
	PowerUps: [
		{
			type: 'powerup',
			target: 'weapon',
			level: 1,
			width: 20,
			height: 20,
			spriteCoords: {
				x: 29,
				y: 414
			}
		}
	]
}