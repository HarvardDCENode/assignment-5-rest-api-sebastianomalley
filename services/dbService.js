/**
 * services/dbService.js
 *
 * This file acts as the database for tips and family members.
 */

const Tip = require('../models/tip');
const FamilyMember = require('../models/familyMember');

class DBService {
  // ===== TIP OPERATIONS =====

  /**
   * Get all tips from database and sort newest to oldest.
   */
  static async getAllTips(filter = {}) {
    return await Tip.find(filter).populate('author').sort({ createdAt: -1 }).lean();
  }

  /**
   * Get one tip by its ID.
   */
  static async getTipById(id) {
    return await Tip.findById(id).populate('author').lean();
  }

  /**
   * Create and save a new tip in the database.
   */
  static async createTip(data) {
    const tip = new Tip(data);
    return await tip.save();
  }

  /**
   * Update a tip based on its ID and new data.
   */
  static async updateTip(id, data) {
    return await Tip.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Delete a tip by its ID.
   */
  static async deleteTip(id) {
    return await Tip.findByIdAndDelete(id);
  }

  // ===== FAMILY MEMBER OPERATIONS =====

  /**
   * Get all family members and sort alphabetically by name.
   */
  static async getAllFamilyMembers() {
    return await FamilyMember.find().sort({ name: 1 }).lean();
  }

  /**
   * Get specific family member by ID.
   */
  static async getFamilyMemberById(id) {
    return await FamilyMember.findById(id).lean();
  }

  /**
   * Create and save a new family member in the database.
   */
  static async createFamilyMember(data) {
    const member = new FamilyMember(data);
    return await member.save();
  }

  /**
   * Update a family member by ID with new data.
   */
  static async updateFamilyMember(id, data) {
    return await FamilyMember.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Delete a family member from the database by ID.
   */
  static async deleteFamilyMember(id) {
    return await FamilyMember.findByIdAndDelete(id);
  }
}

module.exports = DBService;
