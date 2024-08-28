
// 가입 수강생 리스트 ex) [{이름: '홍길동', 비밀번호: '1234', 이메일: 'hong'..},..]
let userList = []; // 지금까지 가입한 수강생들 정보 리스트
let userInfo = {}; // 가입한 수강생 정보


let telValid = false; // 전화번호 유효성 체크
let passwordValid = false; // 패스워드 유효성 체크
let passwordEqualValid = false; // 패스워드 값 동일 여부 체크


// 가입한 날짜 확인 처리용
const nowDate = new Date();
const year = nowDate.getFullYear();
const month = nowDate.getMonth() + 1;
const date = nowDate.getDate();
const joinDate = `${year}-${month}-${date}`;


// 모든 인풋값 유효성 확인하여 가입하기 버튼 활성화 처리용
function allCheck() {
  const userName = document.getElementById('userName').value
  const userEmail = document.getElementById('userEmail').value;
  const emailOptionEl = document.getElementById('emailOption')
  const userEmailDomain = emailOptionEl.options[emailOptionEl.selectedIndex].value;
  const userEmailValue = userEmail + "@" + userEmailDomain;
  const userPassword = document.getElementById('userPassword').value;
  const userGender = document.querySelector('input[name=성별]:checked')
    ? document.querySelector('input[name=성별]:checked').value
    : null;
  const userPhone = document.getElementById('userPhone').value;
  const userIntro = document.getElementById('userIntro').value;
  const termsAgree = document.getElementById('약관동의체크').checked ? "Y" : "N";
  const confirmBtn = document.getElementById("sendConfirm").innerText;

  console.log(`
    ${userName}
    ${userEmailValue}
    ${userPassword}
    ${userGender}
    ${userPhone}
    ${userIntro}
    ${termsAgree}
    ${confirmBtn}
  `);

  const joinBtn = document.querySelector('.joinbtn');
  if (
    userName !== ""
    && userEmail !== ""
    && !userEmailDomain.includes("계정")
    && passwordValid
    && passwordEqualValid
    && userGender !== null
    && telValid
    && userIntro !== ""
    && termsAgree === "Y"
    && confirmBtn === "인증완료"
  ) {
    // 모든 항목이 입력되어있으면 가입하기 버튼 활성화 및 스타일 변경
    joinBtn.classList.remove('off');
    joinBtn.disabled = false;

    userInfo = {
      이름: userName,
      비밀번호: userPassword,
      이메일: userEmailValue,
      성별: userGender,
      전화번호: userPhone,
      약관동의여부: termsAgree,
      자기소개: userIntro,
      가입일시: joinDate,
    }

  } else {
    // 하나라도 입력되지 않은 항목이 있으면 가입하기 버튼 비활성화 및 스타일 변경
    joinBtn.classList.add('off');
    joinBtn.disabled = true;
  }
}

// 패스워드 유효성 체크
function passwordValidChk() {
  const password = document.querySelector('#userPassword').value;
  // 8자 이상, 숫자/대문자/소문자/특수문자를 모두 포함
  const password_regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const passwordCheckText1 = document.querySelector('.passwordCheckText1')

  if (password === "") {
    // 비밀번호 입력값이 없을때
    passwordValid = false;
    document.querySelector('.passwordCheckText1.checkText').style.marginTop = '0px';
    return passwordCheckText1.innerText = '';
  } else {
    // 비밀번호 입력값이 있을때 설명글 스타일 변경
    document.querySelector('.passwordCheckText1.checkText').style.marginTop = '10px';
  }

  if (!password_regex.test(password)) {
    // 비밀번호 유효성 체크 실패시 설명글 노출
    passwordCheckText1.innerText = '8자 이상, 숫자/대문자/소문자/특수문자를 모두 포함';
    passwordCheckText1.classList.remove('success');
    return passwordValid = false;
  } else {
    // 비밀번호 유효성 체크 성공시 설명글 노출 및 스타일 변경
    passwordCheckText1.innerText = '사용가능한 비밀번호입니다.';
    passwordCheckText1.classList.add('success');
    return passwordValid = true;
  }

}

// 패스워드 값 동일 여부 체크
function passwordEqualChk() {
  const password = document.querySelector('#userPassword').value;
  const passwordConfirm = document.querySelector('#userPasswordConfirm').value;
  // console.log(password, passwordConfirm);

  const passwordCheckText2 = document.querySelector('.passwordCheckText2');

  if (passwordConfirm === "") {
    // 비밀번호 입력값이 없을때
    passwordEqualValid = false; // 비밀번호 동일 여부 체크 실패 처리
    document.querySelector('.passwordCheckText2.checkText').style.marginTop = '0px';
    return passwordCheckText2.innerText = '';
  } else {
    // 비밀번호 입력값이 있을때 설명글 스타일 변경
    document.querySelector('.passwordCheckText2.checkText').style.marginTop = '10px';
  }

  if (password === passwordConfirm) {
    passwordCheckText2.innerText = '비밀번호가 일치합니다.';
    passwordCheckText2.classList.add('success');
    return passwordEqualValid = true;
  } else {
    passwordCheckText2.innerText = '비밀번호가 일치하지 않습니다.';
    passwordCheckText2.classList.remove('success');
    return passwordEqualValid = false;
  }
}

// 전화번호 유효성 체크 : 010-1234-5678
function telValidChk() {
  const tel = document.querySelector('#userPhone').value;
  const tel_regex = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  const phoneCheckText = document.querySelector('.phoneCheckText');

  if (tel === "") {
    document.querySelector('.phoneCheckText.checkText').style.marginTop = '0px';
    return phoneCheckText.innerText = '';
  } else {
    document.querySelector('.phoneCheckText.checkText').style.marginTop = '10px';
  }

  if (!tel_regex.test(tel)) {
    phoneCheckText.innerText = '전화번호 형식이 맞지 않습니다. ex) 010-1234-5678';
    phoneCheckText.classList.remove('success');
    return telValid = false;
  } else {
    phoneCheckText.innerText = '사용가능한 전화번호입니다.';
    phoneCheckText.classList.add('success');
    return telValid = true
  }
}



// 가입하기 버튼 클릭시 입력값 체크 및 가입처리
function 가입클릭시() {
  // 가입축하 알림창 띄우기
  alert(`
    회원가입을 축하합니다.
    (가입일시: ${joinDate})
  `);

  // 가입한 유저리스트에 가입한 유저 정보 추가
  userList.push(userInfo);

  if (userList.length > 0) {
    // 수강생이 한명 이상이 되면 리스트 보여주기
    const contentEl = document.querySelector(".sidebottom ul li:nth-child(2) .listcontent")
    contentEl.classList.add('student')
    contentEl.innerHTML = '<ul></ul>'
    userList.map((user, index) => {
      const li = document.createElement('li')
      li.innerHTML = `<img src="./img/내프로필_A.png" alt="profile" /> ${user.이름}`
      contentEl.querySelector('ul').appendChild(li)
    })

    // 각 수강생 클릭시 해당하는 상세정보 보여주기 실행
    document.querySelectorAll('.student ul li').forEach((li, index) => {
      li.addEventListener('click', () => {
        수강생클릭시(index)
      })
    })
  }

}

// 수강생 클릭시 상세정보 보여주기
function 수강생클릭시(index) {
  const userInfo = userList[index];
  // 수강생 정보보기 클릭시 핸드폰의 앞에서 0~4까지, 뒤에서 5번째부터 끝까지만 노출하고 가운데 별표시
  const userPhoneNumber = userInfo.전화번호.slice(0, 4) + "****" + userInfo.전화번호.slice(-5);
  alert(`
        이름: ${userInfo.이름}
        이메일: ${userInfo.이메일}
        성별: ${userInfo.성별}
        전화번호: ${userPhoneNumber}
        약관동의여부: ${userInfo.약관동의여부}
        자기소개: ${userInfo.자기소개}
        (가입일시: ${userInfo.가입일시})
   `);
}



let intervalBox;
function 타이머() {
  // 2. 인증번호 누를때 마다 기존 카운트는 초기화
  if (intervalBox) clearInterval(intervalBox);

  let time = 5;
  intervalBox = setInterval(() => {
    const 분 = Math.floor(time / 60);
    let 초 = Math.floor(time % 60);
    if (초 < 10) 초 = `0${초}`;
    const timerEl = document.querySelector("#타이머")
    timerEl.innerText = `${분}:${초}`;
    time -= 1;
    if (time <= 0) {
      clearInterval(intervalBox);
      timerEl.innerText = `시간초과`;

      const confirmBtn = document.getElementById("sendConfirm");
      confirmBtn.classList.add('off');
      confirmBtn.disabled = true;
    }
  }, 1000);
}

function 인증완료() {
  const confirmBtn = document.getElementById("sendConfirm");
  if (confirm) {
    confirmBtn.innerText = '인증완료'
    confirmBtn.classList.add('off');
    confirmBtn.disabled = true;
    document.querySelector("#타이머").innerText = "";

    allCheck() // 모든 항목 체크

    clearInterval(intervalBox);
  } else {
    allCheck() // 모든 항목 체크
    alert('인증번호를 받아주세요.')
  }
}

function 인증번호요청() {
  const 랜덤번호 = Math.floor(Math.random() * 1000000); // 0 ~ 999999
  const 인증번호 = String(랜덤번호).padStart(6, "0"); // 6자리 숫자로된 문자열 만들기
  document.querySelector("#인증번호").value = 인증번호;
  const confirmBtn = document.getElementById("sendConfirm");
  confirmBtn.classList.remove('off');
  confirmBtn.disabled = false;
}