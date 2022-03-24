const popUpBg = document.querySelector(".pop-up-bg");
const message = document.querySelector("#message");
const closeBtn = document.querySelector("#closeBtn");

function checkPw() {
	const password = document.querySelector("#password").value;
	
	$.ajax({
	        type: "post",
	        url: "/user/checkPassword",
	        data: { "password": password },
	        dataType: "json",
	        success: function (data) {
				if(data == 1) {
					location.href="/user/userInfo";
					return;
				} else {
					message.innerText = "비밀번호가 올바르지 않습니다.";
					showPopUp();
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