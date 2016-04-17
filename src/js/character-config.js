export default {
	PlayerShip: {
		width:24,
		height:21,
		type: 'Player',
		turretVerticalPositionOffset: 15,
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
			health: 1,
			fireRate: 1500,
			type: 'Enemy',
			currentWeaponLevel: 0,
			spriteCoords: {
				x: 0,
				y: 6
			}
		}
	],
	Weapons: {
		Player: [
			{
				level: 1,
				ammunition: {
					type: 'Bullet',
					velocity: 16,
					fireRate: 8,
					isProjectile: true,
					isHoming: false,
					damage: 1,
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
				ammunition: {
					type: 'Bullet',
					damage: 2,
					velocity: 16,
					isProjectile: true,
					hasRapidFire: true,
					width: 9,
					height: 7,
					spriteCoords: {
						x: 0,
						y: 58
					}
				},
				turrets: {
					width: 22,
					height: 17,
					animRate: 50,
					deploymentRate: 3,
					spriteCoords: [{
						x: 0,
						y: 59
					},
					{
						x: 0,
						y: 78
					},
					{
						x: 0,
						y: 96
					},
					{
						x: 0,
						y: 114
					}]
				}
			}
		],
		Enemy: [
			{
				level: 0,
				ammunition: {
					type: 'Bullet',
					damage: 1,
					velocity: 4,
					isProjectile: true,
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