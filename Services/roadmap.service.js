// Import the query function from the db.config.js file
const conn = require("../config/db.config");

// A function to check if roadmap exists in the database
async function checkIfRoadmapExists(roadmap_title) {
  const query = "SELECT * FROM roadmaps WHERE title = ? ";
  const rows = await conn.executeQuery(query, [roadmap_title]);
  //   console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new roadmap
async function createRoadmap(roadmapData) {
  const { title, description, category, created_by } = roadmapData;

  const roadmapExists = await checkIfRoadmapExists(title);
  if (roadmapExists) {
    throw new Error("Roadmap with this title already exists");
  }

  const query = `
        INSERT INTO roadmaps (title, description, category, created_by)
        VALUES (?, ?, ?, ?)
    `;
  const result = await conn.executeQuery(query, [
    title,
    description,
    category || null,
    created_by, // MUST be valid admin_id (e.g., 1)
  ]);
  return result;
}
// A function to get all roadmaps
async function getAllRoadmaps() {
  const query = "SELECT * FROM roadmaps ORDER BY roadmap_id DESC";
  return await conn.executeQuery(query);
}
// A function to get roadmap by id
async function getRoadmap(roadmap_id) {
  const query = "SELECT * FROM roadmaps WHERE roadmap_id = ?";
  const result = await conn.executeQuery(query, [roadmap_id]);
  return result;
}

// A function to delete roadmap by id
async function deleteRoadmap(roadmap_id) {
  const query = "DELETE FROM roadmaps WHERE roadmap_id = ? ";
  const result = await conn.executeQuery(query, [roadmap_id]);
  return result;
}

//  A function to update roadmap details
async function updateRoadmap(roadmap_id, roadmapData) {
  const { title, description, category, created_by } = roadmapData;
  const query =
    "UPDATE roadmaps SET title = ?, description = ? WHERE roadmap_id = ? ";
    const result = await conn.executeQuery(query, [
      title ?? null,
      description ?? null,
      category ?? null,
      created_by ?? null,
      roadmap_id
    ]);
  return result;
}

// Export the functions
module.exports = {
  createRoadmap,
  checkIfRoadmapExists,
  getAllRoadmaps,
  getRoadmap,
  deleteRoadmap,
  updateRoadmap,
};
