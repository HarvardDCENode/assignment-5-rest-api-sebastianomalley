/**
 * test/testApi.js
 *
 * This file tests the deployed REST API on DigitalOcean (production).
 * It checks the /api/tips and /api/family endpoints from the live server.
 */

/**
 * Test GET request to /api/tips on production.
 * Logs the list of tips if successful, else logs error.
 */
fetch('http://68.183.54.98:4000/api/tips')
  .then(response => response.json())
  .then(data => console.log('Tips:', data))
  .catch(error => console.error('Tips Error:', error));

/**
 * Test GET request to /api/family on production.
 * Logs the list of family members if successful, else logs error.
 */
fetch('http://68.183.54.98:4000/api/family')
  .then(response => response.json())
  .then(data => console.log('Family Members:', data))
  .catch(error => console.error('Family Error:', error));
