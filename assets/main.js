(function () {
	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	//Containers
	var fg, bg, layers = [];
	//Mountain draw class
	var Mountain;
	//Layer colors
	var colors = ['#ABC8C0', '#9D5C63', '#8ACDEA', '#7F7CAF', '#E39774'];

	fg = Sketch.create({
		container: document.getElementById('landing-fg'),
		interval: 60
	});
	fg.mouse = {
		x: fg.width / 2,
		y: fg.height
	}
	Mountain = function(config){
		this.create(config);
	}
	Mountain.prototype.create = function(config){
		this.config = config;
		return this.setup();
	}
	Mountain.prototype.setup = function(){
		this.config.steps = [];
		var pt = {x: 0, y: 0};
		for(var n = 0; n < this.config.upStages; n++){
			pt = {
				x: randomInt(pt.x, (this.config.width/2)),
				y: randomInt(pt.y, (this.config.height))
			}
			this.config.steps.push(pt);
		};
		for(var n = 0; n < this.config.downStages; n++){
			pt = {
				x: randomInt(pt.x, this.config.width),
				y: randomInt((this.config.height - pt.y), 0)
			}
			this.config.steps.push(pt);
		}
	}
	Mountain.prototype.draw = function(){
		fg.beginPath();
		fg.moveTo(this.config.start.x, (fg.height - this.config.start.y));
		for(var i = 0; i < this.config.steps.length; i++){
			var step = this.config.steps[i];
			fg.lineTo((this.config.start.x + step.x), (fg.height - (this.config.start.y + step.y)));
		}
		fg.lineTo(this.config.start.x + this.config.width, (fg.height - this.config.start.y));
		fg.fill();
	}
	fg.setup = function(){
		layers.push(new Mountain({
			start: {
				x: -200,
				y: -00,
			},
			width: 200,
			height: 200,
			upStages: 2,
			downStages: 2
		}))
		layers.push(new Mountain({
			start: {
				x: 0,
				y: 0,
			},
			width: 200,
			height: 100,
			upStages: 3,
			downStages: 1
		}))
		layers.push(new Mountain({
			start: {
				x: 200,
				y: 0,
			},
			width: 200,
			height: 250,
			upStages: 1,
			downStages: 2
		}))
	}
	fg.draw = function(){
		for(var i = 0; i < layers.length; i++){
			layers[i].setup();
			layers[i].draw();
		}
	}

	window.addEventListener('mousemove', function (e) {
		fg.mouse = {
			x: e.pageX,
			y: e.pageY
		}
	});

});//.call(this);
