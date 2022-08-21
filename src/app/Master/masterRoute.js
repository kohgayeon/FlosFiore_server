module.exports = function (app) {
    const master = require("./masterController");
    const jwtMiddleware = require("../../../config/jwtMiddleware");

    // 1. 평균 싯가 계산
    app.get("/master/price:flowerName", master.avg_price); 

  };
  