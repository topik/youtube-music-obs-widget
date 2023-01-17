class Player {
	trackTimeInterval;
	lastTrackTime = null;

	constructor() {
		this.lastUpdateData = {};
		this.isPlaying = false;
		let that = this;
		this.trackTimeInterval = setInterval(function () {
			that.periodicallyUpdateTrackTime();
		}, 1000);
	}

	updateSongInfo(playerInfo) {
		if (playerInfo.playState === true) {
			this.isPlaying = true;
			$("body").removeClass("isOffline");
			$("body").removeClass("paused");
			if (this.lastUpdateData.hasOwnProperty("track") && JSON.stringify(this.lastUpdateData.track) === JSON.stringify(playerInfo.track)) {
				this.updateTrackTime(playerInfo);
			} else {
				if (playerInfo.hasOwnProperty("track") === false) {
					return;
				}
				if (playerInfo.track.hasOwnProperty("cover")) {
					let img = new Image();
					let that = this;
					img.onload = function () {
						that.updateTrackInfo(playerInfo);
					};
					img.src = this.getAlbumArt(playerInfo.track.cover, 420, 420);
				} else {
					this.updateTrackInfo(playerInfo);
				}

			}
		} else {
			this.isPlaying = false;
			$("body").addClass("isOffline");
			$("body").addClass("paused");
		}
		this.lastUpdateData = playerInfo;
	}

	periodicallyUpdateTrackTime(setTime) {
		let newTimeSet = false;
		if (typeof setTime !== "undefined") {
			if (this.lastTrackTime === null) {
				this.lastTrackTime = new Date(setTime);
				newTimeSet = true;
			} else {
				let newTime = new Date(setTime);
				if (Math.abs(this.lastTrackTime - newTime) > 2000) {
					this.lastTrackTime = new Date(setTime);
					newTimeSet = true;
				}
			}
		}
		if (this.lastTrackTime === null) {
			return;
		}
		if (typeof setTime === "undefined") {
			return;
		}
		if (newTimeSet === false) {
			this.lastTrackTime.setSeconds(this.lastTrackTime.getSeconds() + 1);
		}
		let el = $(".online .song-info__time");
		let total = parseInt(el.find("progress").attr("max"));
		let from = 14;
		let length = 5;
		if (total >= 3600000) {
			from = 11;
			length = 8;
		}
		let dateTotal = new Date(total);
		if (this.lastTrackTime > dateTotal) {
			return;
		}
		el.find(".song-info__time-current").text(this.lastTrackTime.toISOString().substr(from, length));
		el.find(".song-info__time-max").text(dateTotal.toISOString().substr(from, length));
	}

	updateTrackTime(playerInfo) {
		if (playerInfo.hasOwnProperty("time")) {
			let el = $(".online .song-info__time");
			el.find("progress").attr("max", playerInfo.time.total);
			el.find("progress").attr("value", playerInfo.time.current);
			if ($("body").hasClass("circle-progressbar") && $('.song-info__album-art-image').length) {
				$('.song-info__album-art-image').circleProgress('value', playerInfo.time.current / playerInfo.time.total);
			}
			this.periodicallyUpdateTrackTime(playerInfo.time.current);
		}
	}

	updateTrackInfo(playerInfo) {
		let el = $(".online");
		if (playerInfo.hasOwnProperty("track")) {
			el.find(".song-info__title").text(playerInfo.track.title);
			if (playerInfo.track.hasOwnProperty("author")) {
				el.find(".song-info__artist-name").text(playerInfo.track.author);
			}
			if (playerInfo.track.hasOwnProperty("cover")) {
				el.find(".song-info__album-art").empty();
				el.find(".song-info__album-art").append($('<div class="song-info__album-art-image" style="background-image:url(\'' + this.getAlbumArt(playerInfo.track.cover, 420, 420) + '\')"></div>'));
				$(".artist-background").css("background-image", "url('" + this.getAlbumArt(playerInfo.track.cover, 420, 420) + "')");
				if ($("body").hasClass("circle-progressbar")) {
					$('.song-info__album-art-image').circleProgress({
						value: 0,
						startAngle: -Math.PI / 2,
						size: $(".song-info__album-art-image").width(),
						fill: {
							color: 'rgba(255,255,255, .4)'
						}
					});

				}
			}
			this.updateTrackTime(playerInfo);
		}
	}

	getAlbumArt(url, width, height) {
		return url.replace("w60-h60", "w" + width + "-h" + height);
	}
}
