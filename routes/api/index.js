/**
 * REST API router index file.
 * 
 * This file pulls everything together for the REST API side of the app.
 */

const express = require('express');
const router = express.Router();

// Separate router files for tips and family.
const tipsRouter = require('./tips');
const familyRouter = require('./family');

/**
 * Mount tips and family routers onto the main /api route.
 */
router.use('/tips', tipsRouter);
router.use('/family', familyRouter);

module.exports = router;
