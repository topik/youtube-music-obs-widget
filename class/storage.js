class Storage {
	getItem(key, fallback) {
		chrome.storage.local.get(key, function (result) {
			fallback(result[key]);
		});
	}

	setItem(key, value) {
		let data = {};
		data[key] = value;
		chrome.storage.local.set(data);
	}

	removeItem(key) {
		chrome.storage.local.remove(key);
	}
}
