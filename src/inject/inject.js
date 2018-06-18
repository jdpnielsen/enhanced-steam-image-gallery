chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		workshop_gallery();
	}
	}, 10);
});

function workshop_gallery() {
	var linkElements = Array.from(document.querySelectorAll('.highlight_player_item > div > a'));
	var imageElements =  Array.from(document.querySelectorAll('.highlight_strip_item > img'));

	var images = imageElements
		.map(function(each) {
			return each.getAttribute('src').split('?')[0];
		});

	window.addEventListener('keydown', function(event) {
		if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
			return;
		}

		var modal = document.querySelector('#previewImageEnlarged');
		var modalStyle = window.getComputedStyle(modal);

		var modalOpen = modalStyle && modalStyle.display !== 'none';
		var currentIndex = 0;

		if (modalOpen) {
			var currentImg = modal.querySelector('img#enlargedImage').getAttribute('src');
			currentIndex = images.indexOf(currentImg);
		} else {
			var currentImg = document.querySelector('div.highlight_strip_item.focus > img').getAttribute('src');
			currentIndex = images.indexOf(currentImg.split('?')[0]);
		}

		var nextIndex = 0;

		if (event.key === 'ArrowRight') {
			if (currentIndex === images.length -1) {
				nextIndex = 0;
			} else {
				nextIndex = currentIndex + 1;
			}
		} else if (event.key === 'ArrowLeft') {
			if (currentIndex === 0) {
				nextIndex = images.length -1;
			} else {
				nextIndex = currentIndex - 1;
			}
		}

		if (modalOpen) {
			document.querySelector('div.modal_close_image > a').click();
			imageElements[nextIndex].click();
			linkElements[nextIndex].click()
		} else {
			imageElements[nextIndex].click();
		}
	});
}