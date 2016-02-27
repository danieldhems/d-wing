export default class Move {

	constructor(options){
		super(options)
	}

	var currentX = !self.ball.style.left ? 0 : parseInt(self.ball.style.left),
		currentY = !self.ball.style.top ? 0 : parseInt(self.ball.style.top),

		ball = self.ball,
		ballTop = ball.offsetTop,
		ballBottom = ball.offsetTop + parseInt(ball.style.height),

		windowTop = 0,
		windowLeft = 0,
		windowBottom = self.getBoundingBox(window).y,
		windowRight = self.getBoundingBox(window).x;

	/**
	*	Ball movement logic
	*/

	// horizontal movement
	if(self.directionX == "right"){
		self.ball.style.left = currentX + self.config.ballSpeed + "px";
		//self.ball.style.top = currentY - (25/90) + "px";
	} else if(self.directionX == "left") {
		self.ball.style.left = currentX - self.config.ballSpeed + "px";
	}

	// vertical movement
	if(self.directionY == "up"){
		self.ball.style.top = currentY - self.ballYVector + "px";
	} else if(self.directionY == "down") {
		self.ball.style.top = currentY + self.ballYVector + "px";
	}

}