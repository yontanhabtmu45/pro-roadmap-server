// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// A function to set steps for a roadmap
async function setSteps(roadmap_id, steps) {
  // First, delete existing steps for the roadmap
  // const deleteQuery = "DELETE FROM roadmap_steps WHERE step_id = ? ";
  // await conn.executeQuery(deleteQuery, [roadmap_id]);
  // Insert new steps
  const insertQuery =
    "INSERT INTO roadmap_steps (roadmap_id, step_order, step_title, step_description) VALUES (?, ?, ?, ?)";
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    await conn.executeQuery(insertQuery, [
      roadmap_id,
      step.step_order,
      step.step_title,
      step.step_description,
    ]);
  }
  return true;
}

// Get steps for a roadmap by roadmap_id
async function getSteps() {
  const query = `
    SELECT * FROM roadmap_steps`;
  const data = await conn.executeQuery(query);
  return data;
}

async function getSingleStep(step_id) {
  const query = `
    SELECT * FROM roadmap_steps
    WHERE step_id = ?
    LIMIT 1
  `;
  return await conn.executeQuery(query, [step_id]);
}

// A function to get steps by a roadmap
async function getStepsByRoadmap(roadmap_id) {
  const query = "SELECT * FROM roadmap_steps WHERE roadmap_id = ? ORDER BY step_order ASC";
  const data = await conn.executeQuery(query, [roadmap_id]);
  return data;
}

//  A function to delete steps for a roadmap
async function deleteSteps(step_id) {
  const deleteQuery = "DELETE FROM roadmap_steps WHERE step_id = ? ";
  await conn.executeQuery(deleteQuery, [step_id]);
  return true;
}

// A function to update steps for a roadmap
async function updateSteps(step_id, updateData) {
  const query = `
    UPDATE roadmap_steps
    SET step_title = ?, step_description = ?, step_order = ?
    WHERE step_id = ?
  `;

  await conn.executeQuery(query, [
    updateData.step_title,
    updateData.step_description,
    updateData.step_order,
    step_id,
  ]);

  return true;
}

// Export the functions
module.exports = {
  setSteps,
  getSteps,
  getSingleStep,
  getStepsByRoadmap,
  deleteSteps,
  updateSteps,
};
