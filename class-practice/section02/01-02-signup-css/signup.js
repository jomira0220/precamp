function join() {
  const email = document.getElementById('email').value; // 이메일 입력값
  if (!email) {
    alert('이메일을 입력해주세요.');
    return
  }
  const emailInfo = { emailId: email.split('@')[0], emailDomain: email.split('@')[1] }; // 이메일 아이디와 도메인 분리

  function emailIdSlice(emailId) {
    // emailId : @를 제외한 이메일 아이디
    // sliceCount 만큼의 글자를 뒤에서부터 *로 대체
    const emailIdLength = emailId.length; // emailId의 길이
    const emailHalfLength = Math.floor(emailIdLength / 2); // emailId의 절반 길이
    const star = Array.from({ length: emailHalfLength }, () => "*").join("");
    // emailId의 절반길이의 뒷부분을 *로 대체
    return emailId.slice(0, emailId.length - emailHalfLength) + star;
  }

  const 보안처리된이메일 = emailIdSlice(emailInfo.emailId) + "@" + emailInfo.emailDomain;

  alert(`회원가입을 축하합니다. 가입하신 이메일은 ${보안처리된이메일} 입니다.`);
}