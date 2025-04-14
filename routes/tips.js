const express = require('express');
const router = express.Router();
const Tip = require('../models/tip'); // Mongoose model for Tip.
const FamilyMember = require('../models/familyMember'); // Mongoose model for FamilyMember.
const categories = require('../helpers/categories');  // Helper for tip categories.

/**
 * GET /tips
 * List all tips or filter by category.
 *
 * Structure: - If a category is provided as a query parameter, tips in that category will be returned.
 *            - Tips are sorted by creation date in descending order.
 *            - The author field is populated with corresponding family member document.
 */
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    const tips = category
      ? await Tip.find({ category })
          .populate('author')
          .sort({ createdAt: -1 })
      : await Tip.find()
          .populate('author')
          .sort({ createdAt: -1 });
    
    // Render the tips index view, passing the list of tips, available categories, and the selected category, if any.
    res.render('tips/index', { tips, categories, selectedCategory: category });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving tips');
  }
});

/**
 * POST /tips
 * Process form submission to add a new tip.
 */
router.post('/', async (req, res) => {
  const { title, category, author, content } = req.body;

  try {
    const newTip = new Tip({ title, category, author, content });
    await newTip.save();
    res.redirect('/tips');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving new tip');
  }
});

/**
 * GET /tips/new
 * Display the form to add a new tip.
 * Retrieves all family members (sorted alphabetically) to populate the author select options.
 */
router.get('/new', async (req, res) => {
  try {
    const members = await FamilyMember.find().sort({ name: 1 });
    res.render('tips/new', { categories, members });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading form');
  }
});

/**
 * GET /tips/:id/edit
 * Display the edit form for a specific tip.
 * 
 * Structure - Retrieves the tip by its ID.
 *           - Fetches all family members to allow the selection of a new author.
 */
router.get('/:id/edit', async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);
    if (!tip) return res.status(404).send('Tip not found');

    const members = await FamilyMember.find().sort({ name: 1 });
    res.render('tips/edit', { tip, categories, members });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading tip for edit');
  }
});

/**
 * POST /tips/:id
 * Process form submission to update an existing tip.
 *
 * Updates tip and then redirects to the tips list.
 */
router.post('/:id', async (req, res) => {
  const { title, category, author, content } = req.body;

  try {
    const updatedTip = await Tip.findByIdAndUpdate(
      req.params.id,
      { title, category, author: author ? author : "Anonymous", content },
      { new: true } // Return the updated tip document.
    );

    res.redirect('/tips');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating tip');
  }
});

/**
 * POST /tips/:id/delete
 * Delete a tip by its ID.
 */
router.post('/:id/delete', async (req, res) => {
  try {
    await Tip.findByIdAndDelete(req.params.id);
    res.redirect('/tips');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting tip');
  }
});

module.exports = router;