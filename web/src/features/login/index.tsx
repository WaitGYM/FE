import logo from "@img/logo.svg"; //이미지로고
import googleLogo from "@img/icon-google.svg"; //이미지로고

export default function Login() {
  return (
    <div className="login-page">
      <div className="container">
        <div className="text-wrap">
          <h6>
            어서오세요!
            <br />
            오늘도 운동시작 해볼까요?
          </h6>
          <img src={logo} className="logo" alt="logo" />
        </div>
        <button className="btn btn-white">
          <img src={googleLogo} className="icon-google" alt="google-logo" />
          구글아이디로 로그인
        </button>
      </div>
    </div>
  );
}
