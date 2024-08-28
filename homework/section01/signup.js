
let userList = [];

// 전화번호 형식 체크 : 010-1234-5678
function telValidChk(tel) {
  const pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  if (pattern.test(tel) === false) { return false; }
  else { return true; }
}

// 가입하기 버튼 클릭시 입력값 체크 및 가입처리
function 가입클릭시() {

  const userName = document.getElementById('userName').value;
  const userEmail = document.getElementById('userEmail').value;
  const userPassword = document.getElementById('userPassword').value;
  const userGender = document.querySelector('input[name=성별]:checked')
    ? document.querySelector('input[name=성별]:checked').value
    : null;
  const userPhone = document.getElementById('userPhone').value;
  const 약관동의여부 = document.getElementById('약관동의체크').checked ? "Y" : "N";
  const userIntro = document.getElementById('userIntro').value;
  const confirmBtn = document.getElementById("sendConfirm").innerText;

  console.log(telValidChk(userPhone));

  if (userName === '') {
    alert('이름을 입력해주세요.');
    return;
  }
  if (userEmail === '') {
    alert('이메일을 입력해주세요.');
    return;
  }
  if (userPassword === '') {
    alert('비밀번호를 입력해주세요.');
    return;
  }
  if (userGender === null) {
    alert('성별을 선택해주세요.');
    return;
  }
  if (userPhone === '') {
    alert('전화번호를 입력해주세요.');
    return;
  }

  if (!telValidChk(userPhone)) {
    alert('전화번호 형식이 맞지 않습니다.');
    return;
  }

  if (confirmBtn !== '인증완료') {
    alert('인증을 완료해주세요.');
    return;
  }

  if (약관동의여부 === 'N') {
    alert('약관에 동의해주셔야 가입이 가능합니다.');
    return;
  }

  // 가입한 날짜 alert 노출
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1;
  const date = nowDate.getDate();
  const joinDate = `${year}-${month}-${date}`
  alert(`
  회원가입을 축하합니다.
  (가입일시: ${joinDate})
      `);

  const userInfo = {
    이름: userName,
    비밀번호: userPassword,
    이메일: userEmail,
    성별: userGender,
    전화번호: userPhone,
    약관동의여부: 약관동의여부,
    자기소개: userIntro,
    가입일시: joinDate,
  }

  // 모든 항목이 입력되었다면 가입 버튼 활성화 처리
  document.querySelector(".joinbtn").disabled = false;

  // 가입한 유저리스트에 추가
  userList.push(userInfo);

  if (userList.length > 0) {
    // 수강생 리스트 보여주기
    const contentEl = document.querySelector(".sidebottom ul li:nth-child(2) .listcontent")
    contentEl.classList.add('student')
    contentEl.innerHTML = '<ul></ul>'
    userList.map((user, index) => {
      const li = document.createElement('li')
      li.innerHTML = `<img src="./img/내프로필_A.png" alt="profile" /> ${user.이름}`
      contentEl.querySelector('ul').appendChild(li)
    })

    // 각 수강생 클릭시 상세정보 보여주기
    document.querySelectorAll('.student ul li').forEach((li, index) => {
      li.addEventListener('click', () => {
        수강생클릭시(index)
      })
    })
  }

  console.log(`
      이름: ${userName}
      비밀번호: ${userPassword} 
      이메일: ${userEmail}
      성별: ${userGender}
      전화번호: ${userPhone}
      약관동의여부: ${약관동의여부}
      자기소개: ${userIntro}
      (가입일시: ${joinDate})
 `);

}

// 수강생 클릭시 상세정보 보여주기
function 수강생클릭시(index) {
  const userInfo = userList[index];
  // 수강생 정보보기 클릭시 핸드폰의 앞에서 0~4까지, 뒤에서 5번째부터 끝까지만 노출하고 가운데 별표시
  const userPhoneNumber = userInfo.전화번호.slice(0, 4) + "****" + userInfo.전화번호.slice(-5);
  // console.log(userPhoneNumber);
  alert(`
        이름: ${userInfo.이름}
        비밀번호: ${userInfo.비밀번호} 
        이메일: ${userInfo.이메일}
        성별: ${userInfo.성별}
        전화번호: ${userPhoneNumber}
        약관동의여부: ${userInfo.약관동의여부}
        자기소개: ${userInfo.자기소개}
        (가입일시: ${userInfo.가입일시})
   `);
}



let 인터벌상자;
function 타이머() {
  // 2. 인증번호 누를때 마다 기존 카운트는 초기화
  clearInterval(인터벌상자);

  let time = 60 * 3;
  인터벌상자 = setInterval(() => {
    const 분 = Math.floor(time / 60);
    let 초 = Math.floor(time % 60);
    if (초 < 10) 초 = `0${초}`;
    const timerEl = document.querySelector("#타이머")
    timerEl.innerText = `${분}:${초}`;
    time -= 1;
    if (time <= 0) {
      clearInterval(인터벌상자);
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
    clearInterval(인터벌상자);
  } else {
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