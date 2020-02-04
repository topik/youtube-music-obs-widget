class GDMPSettings {
	playState;
	shuffle;
	repeat;
	volume;
	track;
	time;
	_lastUpdate;

	get lastUpdate() {
		return this._lastUpdate;
	}

	set lastUpdate(value) {
		this._lastUpdate = value;
	}

	get playState() {
		return this.playState;
	}

	set playState(value) {
		this.playState = value;
	}

	get shuffle() {
		return this.shuffle;
	}

	set shuffle(value) {
		this.shuffle = value;
	}

	get repeat() {
		return this.repeat;
	}

	set repeat(value) {
		this.repeat = value;
	}

	get volume() {
		return this.volume;
	}

	set volume(value) {
		this.volume = value;
	}

	get track() {
		return this.track;
	}

	set track(value) {
		this.track = value;
	}

	get time() {
		return this.time;
	}

	set time(value) {
		this.time = value;
	}


}
