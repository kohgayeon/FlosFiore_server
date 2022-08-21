const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const userDao = require("./userDao");
const userProvider = require("./userProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const crypto = require("crypto"); //password 암호화
//jwt 발급
const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");

//1. service에서 해당 기능을 처리한다.
exports.createUser = async function (userName, email, region, pwd) {
    try {
        /** 이메일 중복을 확인하여야 한다. **/
        /* 비밀번호를 암호화 한 상태로 저장을 하여야한다. */

        
        const connection = await pool.getConnection(async (conn) => conn);

        const DuplicateEmail = await userProvider.CheckEmailDuplicate(email); //email 중복 처리

        if (DuplicateEmail) {
            return errResponse(baseResponse.SIGNIN_EMAIL_DUPLICATE); //이메일 중복 에러 표시
        }
    
        const hashedPassword = crypto //pwd 암호화하는 과정
            .createHash("sha512")
            .update(pwd)
            .digest("hex");

        const insertUserInfoParams = [userName, email, region, hashedPassword];

        const userIdResult = await userDao.insertUserSignUp(connection, insertUserInfoParams);
       
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
