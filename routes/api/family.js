/**
 * This file handles the REST API routes for family members.
 *
 * Each route connects to dbService.js so there is no duplicate logic.
 */

const express = require('express');
const router = express.Router();
const DBService = require('../../services/dbService');

/**
 * GET /api/family
 * READ (get) all family members from the database and return as JSON.
 */
router.get('/', async (req, res) => {
  try {
    const members = await DBService.getAllFamilyMembers();
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving family members.' });
  }
});

/**
 * GET /api/family/:id
 * READ (get) one specific family member by their ID.
 */
router.get('/:id', async (req, res) => {
  try {
    const member = await DBService.getFamilyMemberById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Family member not found.' });
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving family member.' });
  }
});

/**
 * POST /api/family
 * CREATE a new family member.
 */
router.post('/', async (req, res) => {
  try {
    const member = await DBService.createFamilyMember(req.body);
    res.status(201).json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating family member.' });
  }
});

/**
 * PUT /api/family/:id
 * UPDATE an existing family member.
 */
router.put('/:id', async (req, res) => {
  try {
    const member = await DBService.updateFamilyMember(req.params.id, req.body);
    if (!member) return res.status(404).json({ error: 'Family member not found.' });
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating family member.' });
  }
});

/**
 * DELETE /api/family/:id
 * DELETE a specific family member by ID.
 */
router.delete('/:id', async (req, res) => {
  try {
    const member = await DBService.deleteFamilyMember(req.params.id);
    if (!member) return res.status(404).json({ error: 'Family member not found.' });
    res.json({ message: 'Family member deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting family member.' });
  }
});

module.exports = router;
