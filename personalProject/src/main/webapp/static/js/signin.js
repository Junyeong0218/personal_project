const popUpBg = document.querySelector(".pop-up-bg");
const message = document.querySelector("#message");
const closeBtn = document.querySelector("#closeBtn");

function signin(){
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;
	const setWindow = "chrome=yes, centerscreen=yes, status=no, menubar=no, toolbar=no, resizable=no, location=no, titlebar=no, scrollbars=no, alwaysRaised, fullscreen, width=300, height=200";
	
	$.ajax({
	        type: "post",
	        url: "/signin",
	        data: { "username": username,
	        		"password": password },
	        dataType: "json",
	        success: function (data) {
				if (data.result == '0') {
					message.innerText = "아이디가 올바르지 않습니다.";
					showPopUp();
					return;
				} else if(data.result == '1') {
					message.innerText = "비밀번호가 올바르지 않습니다.";
					showPopUp();
					return;
				} else if(data.result == '2') {
					location.href="/main";
					return;
				}
		  	},
		  	error: function (xhr, status, error) {
				console.log(xhr);
				console.log(status);
				console.log(error);
			}	
		});
}

function showPopUp() {
	popUpBg.className = "pop-up-bg show-pop";
}

function closePopUp() {
	popUpBg.className = "pop-up-bg hide-pop";
}