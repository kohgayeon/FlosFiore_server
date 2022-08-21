const { pool } = require("../../../config/database");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const authDao = require("./authDao");
const authProvider = require("./authProvider");
const userProvider = require("../User/userProvider");
const crypto = require("crypto"); //password 암호화
//jwt 발급
const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");

exports.postSignIn = async function (email, pwd) {
  try {
    const emailRows = await userProvider.emailCheck(email);

    if (emailRows.length < 1) {
      //email이 없는 경우 -> 에러 출력
      return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
    }

    const hashedPassword = crypto //pwd 암호화하는 과정
      .createHash("sha512")
      .update(pwd)
      .digest("hex");

    const passwordRows = await userProvider.passwordCheck(email);

    if (passwordRows[0].pwd != hashedPassword) {
      //조회한 pwd와 암호화한 pwd가 같은지 확인하는 과정
      return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    }

    //user 계정의 status 확인하기 -> 계정이 휴면상태이거나 삭제되었을 경우 로그인할 수 없기 때문
    const userAccountRows = await userProvider.accountCheck(email);

    let token = jwt.sign(
      // 토큰의 내용 (payload)
      {
        userIdx: userAccountRows[0].userIdx,
      },
      // 비밀키
      secret_config.jwtsecret,
      // 유효기간 365일
      {
        expiresIn: "365d",
        subject: "User",
      }
    );

    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(`App - authService Service error\n: ${err.message}`);

    return errResponse(baseResponse.SERVER_ERROR);
  }
};
