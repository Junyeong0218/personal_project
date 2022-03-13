const modifyUserInfoBtn = document.querySelectorAll(".submitBtn > button")[0];
const modifyPasswordBtn = document.querySelector("#submitBtn > button");
const popUpBg = document.querySelector(".pop-up-bg");
const message = document.querySelector("#message");
const closeBtn = document.querySelector("#closeBtn");

modifyUserInfoBtn.addEventListener("click", function(event) {
	event.preventDefault();
	
	const form = document.querySelector("#modifyUserInfo");
	const formData = new FormData(form);
	modifyUserInfoBtn.disabled = true;
	
	$.ajax({
	        type: "post",
	        enctype: "multipart/form-data",
	        url: "/user/modifyuserinfo",
	        data: formData,
	        processData: false,    
	        contentType: false,      
	        cache: false,
	        success: function (data) {
				data = JSON.parse(data);
				if(data.result == '1') {
					message.innerText = "변경이 완료되었습니다.";
					showPopUp();
					closeBtn.addEventListener("click", function() {
						location.href="/main";
					});
					return;
				} else {
					message.innerText = "정상적으로 변경되지 않았습니다.";
					showPopUp();
					modifyUserInfoBtn.disabled = false;
					return;
				}
		  	},
		  	error: function (xhr, status, error) {
				console.log(xhr);
				console.log(status);
				console.log(error);
			}	
		});
});

modifyPasswordBtn.addEventListener("click", function(event) {
	event.preventDefault();
	
	const password = document.querySelector("#password").value;
	
	$.ajax({
	        type: "post",
	        url: "/user/modifyuserpw",
	        data: { "password": password },
	        dataType: "json",
	        success: function (data) {
				if(data.result == '1') {
					message.innerText = "변경이 완료되었습니다.\n다시 로그인해주세요.";
					showPopUp();
					closeBtn.addEventListener("click", function() {
						location.href="/logout";
					});
					return;
				} else {
					message.innerText = "정상적으로 변경되지 않았습니다.";
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
	
});

function showPopUp() {
	popUpBg.className = "pop-up-bg show-pop";
}

function closePopUp() {
	popUpBg.className = "pop-up-bg hide-pop";
}