class Player {
	constructor() {
		this.lastUpdateData = {};
		this.isPlaying = false;
		let that = this;

	}

	updateSongInfo(playerInfo) {
		if (playerInfo.playState === true) {
			this.isPlaying = true;
			$("body").removeClass("isOffline");
			if (this.lastUpdateData.hasOwnProperty("track") && JSON.stringify(this.lastUpdateData.track) === JSON.stringify(playerInfo.track)) {
				this.updateTrackTime(playerInfo);
			} else {
				if (playerInfo.hasOwnProperty("track") === false) {
					return;
				}
				if (playerInfo.track.hasOwnProperty("albumArt")) {
					let img = new Image();
					let that = this;
					img.onload = function () {
						that.updateTrackInfo(playerInfo);
					};
					img.src = this.getAlbumArt(playerInfo.track.albumArt, 420, 420);
				} else {
					this.updateTrackInfo(playerInfo);
				}

			}
		} else {
			this.isPlaying = false;
			$("body").addClass("isOffline");
		}
		this.lastUpdateData = playerInfo;
	}

	updateTrackTime(playerInfo) {
		if (playerInfo.hasOwnProperty("time")) {
			let el = $(".online .song-info__time");
			el.find("progress").attr("max", playerInfo.time.total);
			el.find("progress").attr("value", playerInfo.time.current);
			let from = 14;
			let length = 5;
			if (playerInfo.time.total >= 3600000) {
				from = 11;
				length = 8;
			}
			el.find(".song-info__time-current").text(new Date(playerInfo.time.current).toISOString().substr(from, length));
			el.find(".song-info__time-max").text(new Date(playerInfo.time.total).toISOString().substr(from, length));
			if ($("body").hasClass("circle-progressbar") && $('.song-info__album-art-image').length) {
				$('.song-info__album-art-image').circleProgress('value', playerInfo.time.current / playerInfo.time.total);
			}
		}
	}

	updateTrackInfo(playerInfo) {
		let el = $(".online");
		if (playerInfo.hasOwnProperty("track")) {
			el.find(".song-info__title").text(playerInfo.track.title);
			if (playerInfo.track.hasOwnProperty("artist")) {
				el.find(".song-info__artist-name").text(playerInfo.track.artist);
			}
			if (playerInfo.track.hasOwnProperty("albumArt")) {
				el.find(".song-info__album-art").empty();
				el.find(".song-info__album-art").append($('<div class="song-info__album-art-image" style="background-image:url(\'' + this.getAlbumArt(playerInfo.track.albumArt, 420, 420) + '\')"></div>'));
				$(".artist-background").css("background-image", "url('" + this.getAlbumArt(playerInfo.track.albumArt, 420, 420) + "')");
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
