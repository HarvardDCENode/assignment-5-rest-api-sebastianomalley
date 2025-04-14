/**
 * This file handles the REST API routes for tips.
 *
 * Each route connects to dbService.js so there is no duplicate logic.
 */

const express = require('express');
const router = express.Router();
const DBService = require('../../services/dbService');

/**
 * GET /api/tips
 * READ (get) all tips from database.
 */
router.get('/', async (req, res) => {
  try {
    const tips = await DBService.getAllTips();
    res.json(tips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving tips.' });
  }
});

/**
 * GET /api/tips/:id
 * READ (get) a tip by its ID.
 */
router.get('/:id', async (req, res) => {
  try {
    const tip = await DBService.getTipById(req.params.id);
    if (!tip) return res.status(404).json({ error: 'Tip not found.' });
    res.json(tip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving tip.' });
  }
});

/**
 * POST /api/tips
 * CREATE a new tip in the database.
 */
router.post('/', async (req, res) => {
  try {
    const tip = await DBService.createTip(req.body);
    res.status(201).json(tip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating tip.' });
  }
});

/**
 * PUT /api/tips/:id
 * UPDATE an existing tip by its ID.
 */
router.put('/:id', async (req, res) => {
  try {
    const tip = await DBService.updateTip(req.params.id, req.body);
    if (!tip) return res.status(404).json({ error: 'Tip not found.' });
    res.json(tip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating tip.' });
  }
});

/**
 * DELETE /api/tips/:id
 * DELETE a tip from the database by its ID.
 */
router.delete('/:id', async (req, res) => {
  try {
    const tip = await DBService.deleteTip(req.params.id);
    if (!tip) return res.status(404).json({ error: 'Tip not found.' });
    res.json({ message: 'Tip deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting tip.' });
  }
});

module.exports = router;
