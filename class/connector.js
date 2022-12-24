class Connector {
	player;
	#_settings;
	interval;

	constructor(player) {
		this.player = player;
		this.#_settings = new GDMPSettings();
		let that = this;
		this.interval = setInterval(function(){
			that.getData();
		}, 1000);
	}

	getData() {
		let that = this;
		$.getJSON(YTMDesktopUrl + "/query")
			.done(function (data) {
				that.setSettings(data);
				that.player.updateSongInfo(that.export());

			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				if(jqXHR.status === 0)
				{
					alert("Youtube Desktop is not running or Remote access is not enabled. Download YTMDesktop \n" +
						"at https://ytmdesktop.app and enable Remote Control in Settings > Integrations then refresh this page or OBS source.");
					clearInterval(that.interval);
				}
			});
	}

	export() {
		return JSON.parse(JSON.stringify(this.#_settings));
	}

	setSettings(data) {
		this.#_settings.playState = data.player.hasSong === true && data.player.isPaused === false;
		this.#_settings.volume = data.player.volumePercent;
		this.#_settings.track = data.track;
		this.#_settings.time = {total: data.track.duration *1000 , current: data.player.seekbarCurrentPosition *1000};
	}
}
