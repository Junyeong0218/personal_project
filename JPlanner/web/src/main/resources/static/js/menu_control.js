const menu = document.querySelectorAll(".menu");

menu.forEach(function(item){
	item.addEventListener("mouseenter", function(event){
		const underbar = event.target.children[1];
		
		underbar.className = "underbar to-open";
	});
	
	item.addEventListener("mouseleave", function(event){
		const underbar = event.target.children[1];
		
		underbar.className = "underbar to-close";
	});
});