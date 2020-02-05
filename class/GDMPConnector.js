class GDMPConnector {
	#socket;
	#_settings;
	storage;
	player;

	get settings() {
		return this.#_settings;
	}

	constructor(player) {
		this.player = player;
		this.connect();
		this.#_settings = new GDMPSettings();
	}

	connect() {
		let that = this;
		this.#socket = new WebSocket("ws://localhost:5672", "protocolOne");
		this.#socket.onerror = function () {
			console.warn("Error during connecting");
			that.handleDisconnect();
		};
		this.#socket.onopen = function () {
			that.socketMessages();
		};
	}

	handleDisconnect() {
		let that = this;
		setTimeout(function () {
			that.connect();
		}, 5000);
	}

	socketMessages() {
		let that = this;
		this.#socket.onclose = function () {
			console.warn("Connection was closed");
			that.handleDisconnect();
		};
		this.#socket.onmessage = function (event) {
			let data = JSON.parse(event.data);
			that.settings.lastUpdate = new Date();
			switch (data.channel) {
				case "playState":
					that.settings.playState = data.payload;
					that.player.updateSongInfo(that.export());
					break;
				case "track":
					that.settings.track = data.payload;
					that.player.updateSongInfo(that.export());
					break;
				case "time":
					that.settings.time = data.payload;
					that.player.updateSongInfo(that.export());
					break;
			}
		};
	}

	export() {
		return JSON.parse(JSON.stringify(this.#_settings));
	}
}
