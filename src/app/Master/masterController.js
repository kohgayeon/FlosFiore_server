const jwtMiddleware = require("../../../config/jwtMiddleware");
const masterProvider = require("./masterProvider");
const masterService = require("../Master/masterService");
const { response, errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");

exports.avg_price = async function (req, res) {

    /**
     * Path Variable: flowerName
     */
    const flowerName = req.params.flowerName;

    if (!flowerName) 
        return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const flower_avg_price = await masterProvider.cal_avg_price(flowerName);
    
    if (flower_avg_price == 0)
        return res.send(errResponse(baseResponse.NO_FLOWER_SHOP));

    return res.send(response(baseResponse.SUCCESS, {
        flowerAgePrice : flower_avg_price
    }));
};