const express = require('express');
const router = express.Router();
const FamilyMember = require('../models/familyMember');
const Tip = require('../models/tip');  // Import the Tip model

/**
 * GET /family
 * List all family members sorted alphabetically by name (case-insensitive).
 */
router.get('/', async (req, res) => {
  try {
    // Retrieve all family members.
    const members = await FamilyMember.find()
      .collation({ locale: 'en', strength: 2 })
      .sort({ name: 1 })
      .lean();
    // Render the family index view with the list of members.
    res.render('family/index', { title: 'Family Members', members });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading family members');
  }
});

/**
 * GET /family/add
 * Display form for adding a new family member.
 */
router.get('/add', async (req, res) => {
  try {
    res.render('family/add');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading add form');
  }
});

/**
 * POST /family/add
 * Process the form submission to add a new family member.
 */
router.post('/add', async (req, res) => {
  const { name, birthYear, notes } = req.body;

  try {
    // Create a new FamilyMember instance.
    const newMember = new FamilyMember({ name, birthYear, notes });
    // Save the new family member and redirect to the list.
    await newMember.save();
    res.redirect('/family');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving new family member');
  }
});

/**
 * GET /family/:id/edit
 * Display the edit form for a specific family member.
 */
router.get('/:id/edit', async (req, res) => {
  try {
    // Find the family member to edit.
    const member = await FamilyMember.findById(req.params.id);
    res.render('family/edit', { member });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading edit form');
  }
});

/**
 * POST /family/:id/edit
 * Process the form submission to update a family member's details.
 */
router.post('/:id/edit', async (req, res) => {
  const { name, birthYear, notes } = req.body;

  try {
    // Retrieve the member to update.
    const member = await FamilyMember.findById(req.params.id);
    if (!member) return res.status(404).send('Family member not found');

    // Update member details.
    member.name = name;
    member.birthYear = birthYear;
    member.notes = notes;

    // Save the updated member and redirect to the list.
    await member.save();
    res.redirect('/family');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating member');
  }
});

/**
 * POST /family/:id/delete
 * Delete family member by ID.
 */
router.post('/:id/delete', async (req, res) => {
  try {
    await FamilyMember.findByIdAndDelete(req.params.id);
    res.redirect('/family');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting member');
  }
});

/**
 * GET /family/:id/tips
 * Display all tips associated with a specific family member.
 */
router.get('/:id/tips', async (req, res) => {
  try {
    // Find family member by ID.
    const member = await FamilyMember.findById(req.params.id);
    // Retrieve all tips authored by family member.
    const tips = await Tip.find({ author: member._id });
    // Render the tips view.
    res.render('tips/memberTips', { member, tips });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving member tips');
  }
});

module.exports = router;