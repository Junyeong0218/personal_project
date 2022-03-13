let UsablePw = false;

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
		UsablePw = false;
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
	
	if(UsablePw) {
		submitBtn.disabled = false;
		submitBtn.style.cursor = "pointer";
	} else {
		submitBtn.disabled = true;
		submitBtn.style.cursor = "default";
	}
}