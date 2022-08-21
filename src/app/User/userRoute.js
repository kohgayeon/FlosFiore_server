module.exports = function (app) {
    const user = require("./userController");
    const jwtMiddleware = require("../../../config/jwtMiddleware");

    // 1. 유저 회원가입 회원가입 과정
    app.post("/new/users", user.newUsers); //1. Route 에 기능 생성

  };
  