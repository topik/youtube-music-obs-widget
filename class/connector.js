class Connector {
	player;
	#_settings;
	interval;
	authCode;
	authToken;

	constructor(player) {
		this.player = player;
		this.#_settings = new GDMPSettings();
		this.authToken = localStorage.getItem('authToken');
		if (this.authToken === null) {
			this.authenticate();
		} else {
			this.connectToSocketIo();
		}
	}


	requestToken() {
		let that = this;
		$.ajax({
			url: YTMDesktopUrl + "/api/v1/auth/request",
			type: "POST",
			data: JSON.stringify({
				"appId": "topik-obs-widget",
				"code": that.authCode
			}),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				if (data.token) {
					that.authToken = data.token;
					localStorage.setItem('authToken', that.authToken);
					that.connectToSocketIo();
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert("Open YTMD, autorization windows should pop up. Click 'Allow' to authorize the widget.");
				that.authenticate();
			}
		});
	}

	authenticate() {
		let that = this;
		$.ajax({
			url: YTMDesktopUrl + "/api/v1/auth/requestcode",
			type: "POST",
			data: JSON.stringify({
				"appId": "42069",
				"appName": "Youtube Music OBS Widget (by Topik)",
				"appVersion": "2.0.0"
			}),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				if (data.statusCode === 403) {
					alert("Open YTMD and enable Companion server in Settings > Integrations then refresh this page or OBS source.");
				} else if (data.code) {
					that.authCode = data.code;
					that.requestToken();
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert("Open YTMD, go to Settings > Integrations > Companion sever, then Enable Allow browser communication, then Enable companion authorization. You might want to refresh this page or OBS source after. If you are using old version of YTMD, update it to at least version 2.");
				that.authenticate();
			}
		});
	}

	/**
	 * @deprecated Use connectToSocketIo instead, keeping just for debugging purposes
	 */
	getData() {
		let that = this;
		$.ajax({
			url: YTMDesktopUrl + "/api/v1/state",
			type: "GET",
			headers: {
				"Authorization": that.authToken,
			},
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				that.setSettings(data);
				that.player.updateSongInfo(that.export());
			}
		}).fail(function (jqXHR, textStatus, errorThrown) {
			if (jqXHR.status === 0) {
				alert("Youtube Desktop is not running or Remote access is not enabled. Download YTMDesktop \n" +
					"at https://ytmdesktop.app and enable Remote Control in Settings > Integrations then refresh this page or OBS source.");
				clearInterval(that.interval);
			}
		});

	}

	connectToSocketIo() {
		let that = this;
		const serverUrl = YTMDesktopUrl + '/api/v1/realtime';
		let attemptCount = 0;
		const options = {
			transports: ['websocket'],
			auth: {
				token: this.authToken
			},
			reconnectionAttempts: 100,
			reconnectionDelayMax: 1000, // ms
		};
		const socket = io(serverUrl, options);

		socket.on('state-update', (data) => {
			that.setSettings(data);
			that.player.updateSongInfo(that.export());
		});
		socket.on("disconnect", () => {
			this.connectToSocketIo();
		});

		socket.on('connect_error', (err) => {
			if (err.message.includes('websocket error')) {
				alert("Open YTMD, go to Settings > Integrations, Enable Companion server, then Enable Allow browser communication, then Enable companion authorization. You might want to refresh this page or OBS source after. If you are using old version of YTMD, update it to at least version 2.");
				console.log('WebSocket connection failed. The server might be down or unreachable.');
				return;
			}
			if (err.message.includes('Authentication')) {
				console.warn("Authentication error. Attempting to re-authenticate...");
				that.authenticate();
				return;
			}

			console.error('Connection error:', err);
			attemptCount++;
			if (attemptCount <= options.reconnectionAttempts) {
				console.log(`Attempt ${attemptCount} to reconnect...`);
				setTimeout(connectSocket, Math.min(attemptCount * 1000, options.reconnectionDelayMax)); // Exponential back-off
			} else {
				alert("Maximum reconnection attempts reached. Please restart the widget.");
			}
		});
	}

	export() {
		return JSON.parse(JSON.stringify(this.#_settings));
	}

	setSettings(data) {
		this.#_settings.playState = data.player.trackState === 1 || data.player.trackState === 2;
		this.#_settings.volume = data.player.volume;
		this.#_settings.track = data.video;
		this.#_settings.time = {total: data.video.durationSeconds * 1000, current: data.player.videoProgress * 1000};
	}
}
