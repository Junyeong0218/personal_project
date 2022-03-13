const input = document.querySelector("#profile_image");

input.addEventListener("change", function() {
	const file = input.files[0];
	const img = document.querySelector("#pre-img");
	
	if(file) {
		img.src = URL.createObjectURL(file);
	}
	
	img.onload = function() {
		URL.revokeObjectURL(img.src);
	}
});