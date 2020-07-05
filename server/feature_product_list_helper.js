const { query } = require("../db_config");
const { getDiscountByProductId } = require("./helpers");

const getProductDetailsByProductId = async productId => {
  try {
    return await query(`
      SELECT 
        id as product_id, 
        product_name, 
        productPrice, 
        home_image, 
        DATEDIFF(CURRENT_TIMESTAMP, created_date) <= 15 AS newProduct 
      FROM 
        products
      WHERE 
        status='active' AND isApprove='authorize' AND softDelete=0 AND id=${productId}
    `);
  } catch (e) {
    return e;
  }
};

const getFeatureProductIdsByFeatureId = async feature_id => {
  try {
    let products = await query(`
        SELECT 
          feature_products
        FROM 
          feature_products 
        WHERE 
          feature_id=${feature_id} AND status=1
      `);

    products = JSON.parse(products[0].feature_products);

    return products.map(item => item.productId * 1);
  } catch (e) {
    return e;
  }
};

const getFeatureProductsInfo = async (id, discountArr) => {
  try {
    const productIds = await getFeatureProductIdsByFeatureId(id);

    let products = [];

    for (const productId of productIds) {
      let productDetails = await getProductDetailsByProductId(productId);
      const discountAmount = getDiscountByProductId(discountArr, productId);

      productDetails = [{ ...productDetails[0], discountAmount }];
      products = [...products, ...productDetails];
    }

    return products;
  } catch (e) {
    return e;
  }
};

module.exports = {
  getFeatureProductIdsByFeatureId,
  getProductDetailsByProductId,
  getFeatureProductsInfo
};
