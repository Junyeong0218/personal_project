let UsableId = false;
let UsablePw = false;

function hideToShow() {
    main.classList.add("to-show");
    setTimeout(() => {
        main.classList.remove("hidden");
    }, 1500);
}

function showToHide() {
    main.classList.remove("to-show");
    main.classList.add("to-hidden");
    setTimeout(() => {
        main.classList.add("hidden");
        location.href = "http://localhost:8080/index";
    }, 1500);
}

function checkUsername() {
	const username = document.querySelector("input[name='username']").value;
	const wrongId = document.querySelector("#wrongid");
	const regex = /^[a-z0-9]*$/;
	
	if(username.length < 6 || username.length > 16) {
		wrongId.classList.add("wrong-input");
		wrongId.classList.remove("hidden");
		wrongId.innerText = "아이디는 6~16 자리이어야합니다.";
		UsableId = false;
		
	} else if(!regex.test(username)) {
		wrongId.classList.add("wrong-input");
		wrongId.classList.remove("hidden");
		wrongId.innerText = "아이디는 영소문자, 숫자 조합으로 6~16자리만 가능합니다.";
		UsableId = false;
		
	} else {
		$.ajax({
	        type: "post",
	        url: "/user/checkusername",
	        data: { "username": username },
	        dataType: "json",
	        success: function (data) {
				if (data.result == '1') {
					wrongId.classList.add("wrong-input");
					wrongId.classList.remove("hidden");
					wrongId.innerText = "이미 존재하는 아이디입니다.";
					UsableId = false;
					return;
					
				} else {
					wrongId.classList.add("correct-input");
					wrongId.classList.remove("wrong-input");
					wrongId.classList.remove("hidden");
					wrongId.innerText = "사용가능한 아이디입니다.";
					UsableId = true;
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
	
	activeSubmit();
}

function checkPassword() {
	const password = document.querySelector("input[name='password']").value;
	const pwConfirm = document.querySelector("input[name='pwConfirm']").value;
	const wrongpw = document.querySelector("#wrongpw");
	const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
	
	if(password !== pwConfirm) {
		wrongpw.classList.add("wrong-input");
		wrongpw.classList.remove("correct-input");
		wrongpw.innerText = "비밀번호가 일치하지 않습니다.";
		wrongpw.classList.remove("hidden");
		UsablePw = false;
	} else if(!regex.test(password)){
		wrongpw.classList.add("wrong-input");
		wrongpw.classList.remove("correct-input");
		wrongpw.innerText = "비밀번호는 영문.숫자,특수문자 조합으로 8~16이어야 합니다.";
		wrongpw.classList.remove("hidden");
		UsablePw = true;
	} else {
		wrongpw.classList.add("correct-input");
		wrongpw.classList.remove("wrong-input");
		wrongpw.innerText = "사용가능한 비밀번호 입니다.";
		wrongpw.classList.remove("hidden");
		UsablePw = true;
	}
	
	activeSubmit();
}

function activeSubmit() {
	
	const submitBtn = document.querySelector("#submitBtn > button");
	
	if(UsableId && UsablePw) {
		submitBtn.disabled = false;
		submitBtn.style.cursor = "pointer";
	} else {
		submitBtn.disabled = true;
		submitBtn.style.cursor = "default";
	}
}