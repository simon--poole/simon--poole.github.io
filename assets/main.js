"use strict";"object"!=typeof window.CP&&(window.CP={}),window.CP.PenTimer={programNoLongerBeingMonitored:!1,timeOfFirstCallToShouldStopLoop:0,_loopExits:{},_loopTimers:{},START_MONITORING_AFTER:2e3,STOP_ALL_MONITORING_TIMEOUT:5e3,MAX_TIME_IN_LOOP_WO_EXIT:2200,exitedLoop:function(o){this._loopExits[o]=!0},shouldStopLoop:function(o){if(this.programKilledSoStopMonitoring)return!0;if(this.programNoLongerBeingMonitored)return!1;if(this._loopExits[o])return!1;var t=this._getTime();if(0===this.timeOfFirstCallToShouldStopLoop)return this.timeOfFirstCallToShouldStopLoop=t,!1;var i=t-this.timeOfFirstCallToShouldStopLoop;if(i<this.START_MONITORING_AFTER)return!1;if(i>this.STOP_ALL_MONITORING_TIMEOUT)return this.programNoLongerBeingMonitored=!0,!1;try{this._checkOnInfiniteLoop(o,t)}catch(o){return this._sendErrorMessageToEditor(),this.programKilledSoStopMonitoring=!0,!0}return!1},_sendErrorMessageToEditor:function(){try{if(this._shouldPostMessage()){var o={action:"infinite-loop",line:this._findAroundLineNumber()};parent.postMessage(JSON.stringify(o),"*")}else this._throwAnErrorToStopPen()}catch(o){this._throwAnErrorToStopPen()}},_shouldPostMessage:function(){return document.location.href.match(/boomerang/)},_throwAnErrorToStopPen:function(){throw"We found an infinite loop in your Pen. We've stopped the Pen from running. Please correct it or contact support@codepen.io."},_findAroundLineNumber:function(){var o=new Error,t=0;if(o.stack){var i=o.stack.match(/boomerang\S+:(\d+):\d+/);i&&(t=i[1])}return t},_checkOnInfiniteLoop:function(o,t){if(!this._loopTimers[o])return this._loopTimers[o]=t,!1;var i=t-this._loopTimers[o];if(i>this.MAX_TIME_IN_LOOP_WO_EXIT)throw"Infinite Loop found on loop: "+o},_getTime:function(){return+new Date}},window.CP.shouldStopExecution=function(o){var t=window.CP.PenTimer.shouldStopLoop(o);return t===!0&&console.warn("[CodePen]: An infinite loop (or a loop taking too long) was detected, so we stopped its execution. Sorry!"),t},window.CP.exitedLoop=function(o){window.CP.PenTimer.exitedLoop(o)};

(function () {
	var Mountain, Skyline, dt, sketch, skylines;

	sketch = Sketch.create({
		container: document.getElementById('landing-fg')
	});

	sketch.mouse.x = sketch.width / 2;

	sketch.mouse.y = sketch.height;

	skylines = [];

	dt = 1;


	// BUILDINGS

	Mountain = function (config) {
		return this.reset(config);
	};

	Mountain.prototype.reset = function (config) {
		this.layer = config.layer;
		this.x = config.x;
		this.y = config.y;
		this.width = config.width;
		this.height = config.height;
		this.color = config.color;
		return this;
	};

	Mountain.prototype.render = function () {
		sketch.fillStyle = sketch.strokeStyle = this.color;
		sketch.lineWidth = 2;
		sketch.beginPath();
		sketch.rect(this.x, this.y, this.width, this.height);
		sketch.fill();
		sketch.stroke();
	};


	// SKYLINES

	Skyline = function (config) {
		this.x = 0;
		this.buildings = [];
		this.layer = config.layer;
		this.width = {
			min: config.width.min,
			max: config.width.max
		};
		this.height = {
			min: config.height.min,
			max: config.height.max
		};
		this.speed = config.speed;
		this.color = config.color;
		this.populate();
		return this;
	};

	Skyline.prototype.populate = function () {
		var newHeight, newWidth, results, totalWidth;
		totalWidth = 0;
		results = [];
		while (totalWidth <= sketch.width + (this.width.max * 2)) {
			if (window.CP.shouldStopExecution(1)) {
				break;
			}
			newWidth = round(random(this.width.min, this.width.max));
			newHeight = round(random(this.height.min, this.height.max));
			this.buildings.push(new Mountain({
				layer: this.layer,
				x: this.buildings.length === 0 ? 0 : this.buildings[this.buildings.length - 1].x + this.buildings[this.buildings.length - 1].width,
				y: sketch.height - newHeight,
				width: newWidth,
				height: newHeight,
				color: this.color
			}));
			results.push(totalWidth += newWidth);
		}
		window.CP.exitedLoop(1);

		return results;
	};

	Skyline.prototype.update = function () {
		var firstMountain, lastMountain, newHeight, newWidth, toggle;

		toggle = (sketch.mouse.x >= sketch.width / 2) ? 1 : -1
		this.x += (toggle * abs(sketch.width / 2 - sketch.mouse.x) * this.speed) * dt;
		firstMountain = this.buildings[0];
		if (firstMountain.width + firstMountain.x + this.x < 0) {
			newWidth = round(random(this.width.min, this.width.max));
			newHeight = round(random(this.height.min, this.height.max));
			lastMountain = this.buildings[this.buildings.length - 1];
			firstMountain.reset({
				layer: this.layer,
				x: lastMountain.x + lastMountain.width,
				y: sketch.height - newHeight,
				width: newWidth,
				height: newHeight,
				color: this.color
			});
			return this.buildings.push(this.buildings.shift());
		}
	};

	Skyline.prototype.render = function () {
		var i;
		i = this.buildings.length;
		sketch.save();
		sketch.translate(this.x, (sketch.height - sketch.mouse.y) / 20 * this.layer);
		while (i--) {
			if (window.CP.shouldStopExecution(2)) {
				break;
			}
			this.buildings[i].render(i);
		}
		window.CP.exitedLoop(2);

		return sketch.restore();
	};


	// SETUP
	var colors = ['#ABC8C0', '#9D5C63', '#8ACDEA', '#7F7CAF', '#E39774'];
	sketch.setup = function () {
		var i, results;
		i = 5;
		results = [];
		while (i--) {
			if (window.CP.shouldStopExecution(3)) {
				break;
			}
			results.push(skylines.push(new Skyline({
				layer: i + 1,
				width: {
					min: (i + 1) * 100,
					max: (i + 1) * 300
				},
				height: {
					min: 450 - (i * 105),
					max: 900 - (i * 105)
				},
				speed: 0.002 * i,
				color: colors[i]
			})));
		}
		window.CP.exitedLoop(3);

		return results;
	};


	// CLEAR

	sketch.clear = function () {
		return sketch.clearRect(0, 0, sketch.width, sketch.height);
	};


	// UPDATE

	sketch.update = function () {
		var i, results;
		dt = sketch.dt < .1 ? .1 : sketch.dt / 16;
		dt = dt > 5 ? 5 : dt;
		i = skylines.length;
		results = [];
		while (i--) {
			if (window.CP.shouldStopExecution(4)) {
				break;
			}
			results.push(skylines[i].update(i));
		}
		window.CP.exitedLoop(4);

		return results;
	};


	// DRAW

	sketch.draw = function () {
		var i, results;
		i = skylines.length;
		results = [];
		while (i--) {
			if (window.CP.shouldStopExecution(5)) {
				break;
			}
			results.push(skylines[i].render(i));
		}
		window.CP.exitedLoop(5);

		return results;
	};


	// Mousemove Fix

	window.addEventListener('mousemove', function (e) {
		sketch.mouse.x = e.pageX;
		return sketch.mouse.y = e.pageY;
	});

}).call(this);
