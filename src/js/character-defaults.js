export default {
	Ship: {
		HTMLElement: 'i',
		health: 1,
		velocity: 1.8,
		hasShield: false
	},
	PlayerShip: {
		width:24,
		height:21,
		fireRate: 200,
		shipType: 'player',
		weaponPosition: {
			x: 25,
			y: 8
		},
		styleRules: {
			backgroundPosition: '0 -280px'
		}
	},
	EnemyShips: [
		{
			width:24,
			height:21,
			fireRate: 300,
			shipType: 'enemy',
			weaponPosition: {
				x: 25,
				y: 8
			},
			styleRules: {
				backgroundPosition: '0 -280px'
			}
		}
	],
	Weapons: {
		Player: [
			{
				hitPoints: 1,
				HTMLElement: 'i',
				damage: 1,
				width: 9,
				height: 7,
				velocity: 16,
				isProjectile: true,
				styleRules: {
					backgroundPosition: '-147px -325px',
					backgroundImage: 'url(./sprite-clear.gif)',
					display: 'block',
					width: '9px',
					height: '7px'
				}
			},
			{
				hitPoints: 1,
				HTMLElement: 'i',
				damage: 1,
				width: 9,
				height: 7,
				velocity: 16,
				isProjectile: true,
				hasSatelites: true,
				hasRapidFire: true,
				fireSprite: {

				},
				sateliteSprite: {
					x: 0,
					y: 0
				},
				upperSatelitePosition: {
					x: 0,
					y: 0
				},
				lowerSatelitePosition: {
					x: 0,
					y: 0
				},
				styleRules: {
					backgroundPosition: '-147px -325px',
					backgroundImage: 'url(./sprite-clear.gif)',
					display: 'block',
					width: '9px',
					height: '7px'
				}			
			}
		],
		Enemy: [
			{
				hitPoints: 1,
				HTMLElement: 'i',
				damage: 1,
				width: 9,
				height: 7,
				velocity: 16,
				styleRules: {
					backgroundPosition: '-147px -325px',
					backgroundImage: 'url(./sprite-clear.gif)',
					display: 'block',
					width: '9px',
					height: '7px'
				}
			}
		]
	}	
}