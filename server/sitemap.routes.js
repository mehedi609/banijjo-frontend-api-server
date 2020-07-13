const express = require('express')
const urlSlug = require('url-slug')
const {getIdFromSlug} = require("./slug.helpers");
const { query } = require('../db_config');

const router = express.Router();

router.get('/product_ids_for_site_map', async (req, res) => {
  try {
    const ids = await query(`
    SELECT
        id 
    FROM
        products 
    WHERE
        status='active'     
        AND isApprove='authorize' 
        AND softDelete=0
    `);
    res.status(200).json(ids);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.get('/category_ids_for_site_map', async (req, res) => {
  try {
    const ids = await query(`
    SELECT
        id 
    FROM
        category 
    WHERE
        status='active'     
        AND softDel=0
    `);
    res.status(200).json(ids);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.get('/featureproduct_ids_for_site_map', async (req, res) => {
  try {
    const ids = await query(`
        SELECT
            id
        FROM
            feature_name
        WHERE
            softDel=0 AND status=1
      `);
    res.status(200).json(ids);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.get('/vendor_ids_for_site_map', async (req, res) => {
  try {
    const ids = await query(`
      SELECT
          id
      FROM
          vendor
      WHERE
          status='active'
          AND softDel=0
      `);
    res.status(200).json(ids);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

module.exports = router;
