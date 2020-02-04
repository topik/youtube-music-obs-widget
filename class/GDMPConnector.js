class GDMPConnector {
	#socket;
	#_settings;
	storage;
	player;

	get settings() {
		return this.#_settings;
	}

	constructor(player) {
		var that = this;
		this.player = player;
		this.#socket = new WebSocket("ws://localhost:5672", "protocolOne");
		this.#_settings = new GDMPSettings();
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
