const userService = require("../User/userService");
const { response, errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const regexEmail = require("regex-email");
const regexPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//const {emit} = require("nodemon");

/*
    1. Controller에서 body를 가져온다.
    API NAME : 회원가입
    method : POST /new/users
*/
exports.newUsers = async function (req, res) {
    /*
        Body : username, email, pwd
    */
    const { userName, email, region, pwd } = req.body;

      // email validation
    if (!email) {
        return res.send(errResponse(baseResponse.SIGNIN_EMAIL_EMPTY));
    } else if (email.length > 255) {
        return res.send(errResponse(baseResponse.SIGNIN_EMAIL_LENGTH));
    } else if (!regexEmail.test(email)) {
        return res.send(errResponse(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));
    }
    
    // pwd validation
    // pwd 영문자와 숫자 포함 8자리 이상
    if (!pwd) {
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));
    } else if (pwd.length < 8) {
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_LENGTH));
    } else if (!regexPwd.test(pwd)) {
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_WRONG));
    }
    // Region validation
    if (!region) {
        return res.send(errResponse(baseResponse.NO_REGION));
    }
    // Name validation
    if (!userName) {
        return res.send(errResponse(baseResponse.NO_USERNAME));
    }

    /* 각각에 대한 validation 필요 */
    const signUpRes = await userService.createUser(
        userName,
        email,
        region,
        pwd
    );

    return res.send(signUpRes);
}
