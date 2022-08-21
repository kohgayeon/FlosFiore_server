const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const masterDao = require("./masterDao");

exports.cal_avg_price = async function (flowerName) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const masterFlowerInfo = await masterDao.selecFlowerPrice(connection, flowerName);
        
        var addFlowerPrice = 0;
        var count = 0;
        
        for (var i in masterFlowerInfo){
            const tempDict = masterFlowerInfo[i]["flowerInfo"]; //해당 꽃집의 flowerInfo 객체를 가져온다.
            if (Object.keys(tempDict).includes(flowerName)) { //flowerInfo에 입력받은 꽃 이름이 있으면
                addFlowerPrice = addFlowerPrice + Number(tempDict[flowerName]); //해당 꽃 값을 가져와 더한다.
                count = count +1; //해당 꽃을 가진 꽃가게의 수
            }             
        }

        connection.release();

        if (addFlowerPrice == 0) { //입력 받은 꽃을 가진 꽃가게가 없다.
            return 0; 
        } else {
            return addFlowerPrice/count; //평균 싯가 반환
        }
    } catch (err) {
        logger.error(`App - masterProvider Service error\n: ${err.message}`);
        return errResponse(baseResponse.SERVER_ERROR);
    }

  };