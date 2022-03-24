const submitBtn = document.querySelector("#submitBtn > button");
let UsableId = false;
let UsablePw = false;

function hideToShow() {
    main.className = "to-show";
}

function showToHide() {
    main.className = "to-hidden";
    setTimeout(() => {
        location.href = "http://localhost:8080/index";
    }, 450);
}

function checkUsername() {
	const username = document.querySelector("#username").value;

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
	        url: "/checkUsername",
	        data: { "username": username },
	        dataType: "json",
	        success: function (data) {
				if (data == 1) {
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
	
	if(UsableId && UsablePw) {
		submitBtn.disabled = false;
		submitBtn.style.cursor = "pointer";
	} else {
		submitBtn.disabled = true;
		submitBtn.style.cursor = "default";
	}
}

submitBtn.addEventListener("click", function() {
	const signupForm = document.querySelector(".signup-form");
	const userData = new Object();
	userData.username = signupForm.querySelector("#username").value;
	userData.password = signupForm.querySelector("input[name='password']").value;
	userData.name = signupForm.querySelector("input[name='name']").value;
	const options = signupForm.querySelector("select[name='pwQuestion']").options;
	for(let i=0; i < options.length; i++) {
		if(options[i].selected == true) {
			userData.pwQuestion = options[i].value;
		}
	}
	userData.pwAnswer = signupForm.querySelector("input[name='pwAnswer']").value;
	if(userData.username == null || userData.password == null || userData.name == null ||
	   userData.pwQuestion == null || userData.pwAnswer == null) {
		return;
	} else {
		const form = new FormData();
		form.append("username", userData.username);
		form.append("password", userData.password);
		form.append("name", userData.name);
		form.append("pwQuestion", userData.pwQuestion);
		form.append("pwAnswer", userData.pwAnswer);
		$.ajax({
	        type: "post",
	        url: "/signup",
	        data: form,
	        processData: false,    
	        contentType: false,      
	        cache: false,
	        success: function (data) {
				if (data == 1) {
					message.innerText = "가입하신 정보로 로그인해주세요";
					showPopUp();
					
					closeBtn.addEventListener("click", function() {
						closePopUp();
						location.href = "http://localhost:8080/index";
					});
					
					return;
				} else {
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
});

