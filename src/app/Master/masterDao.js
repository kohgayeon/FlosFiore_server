async function selecFlowerPrice(connection) {
    const selectFlowerPriceQuery = `
                  SELECT flowerInfo
                  FROM Master;
                  `;
    const [flowerPrice] = await connection.query(selectFlowerPriceQuery);
    return flowerPrice;
  }

  module.exports = {
    selecFlowerPrice
  };
  