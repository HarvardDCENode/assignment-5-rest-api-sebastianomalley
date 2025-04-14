/**
 * test/testApi-local.js
 *
 * This file tests the REST API locally on http://localhost:4000.
 * It checks that the /api/tips and /api/family endpoints return data.
 */

/**
 * Test GET request to /api/tips.
 * Logs the list of tips if successful, else logs error.
 */
fetch('http://localhost:4000/api/tips')
  .then(response => response.json())
  .then(data => console.log('Local Tips:', data))
  .catch(error => console.error('Local Tips Error:', error));

/**
 * Test GET request to /api/family.
 * Logs the list of family members if successful, else logs error.
 */
fetch('http://localhost:4000/api/family')
  .then(response => response.json())
  .then(data => console.log('Local Family:', data))
  .catch(error => console.error('Local Family Error:', error));
