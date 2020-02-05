let connector;
let count = 0;
let player;
let readyCheck = setInterval(function () {
	if (count > 3) {
		clearInterval(readyCheck);
		player = new Player();
		connector = new GDMPConnector(player);
	}
}, 1000);
document.addEventListener("DOMContentLoaded", function () {
	let require = [
		"class/GDMPConnector.js",
		"class/GDMPSettings.js",
		"class/moment.min.js",
		"class/player.js"
	];
	for (i in require) {
		var s = document.createElement('script');
		s.src = require[i];
		(document.head || document.documentElement).appendChild(s);
		s.onload = function () {
			count++;
		};
	}
	if (window.location.search.length > 0) {
		let urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get('features') !== null && urlParams.get('features') !== "") {
			urlParams.get('features').split(" ").forEach(function (value) {
				document.getElementsByTagName("body")[0].classList.add(value);
			});

		}
	}
});

$(window).resize(function () {
	if ($("body").hasClass("circle-progressbar")) {
		$('.song-info__album-art-image').circleProgress({size: $(".song-info__album-art-image").width() + 1});
	}
});
