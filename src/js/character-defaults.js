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
		weaponPosition: {
			x: 25,
			y: 8
		},
		styleRules: {
			backgroundPosition: '0 -280px'
		}
	},
	Weapons: [
		{
			hitPoints: 1,
			HTMLElement: 'i',
			damage: 1,
			width: 9,
			height: 7,
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