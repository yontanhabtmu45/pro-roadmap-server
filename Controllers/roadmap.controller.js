// Import roadmap service
const roadmapService = require("../Services/roadmap.service");
// create add roadmap controller
async function createRoadmap(req, res, next) {
  // check if roadmap already exist in database
  const roadmapExists = await roadmapService.checkIfRoadmapExists(
    req.body.title
  );
  // if roadmap exists, send a response to client
  if (roadmapExists) {
    return res.status(400).json({ message: "roadmap already exists" });
  } else {
    try {
      const roadmapData = req.body;
      // create a new roadmap
      const newRoadmap = await roadmapService.createRoadmap(roadmapData);
      // send a response to client
      if (!newRoadmap) {
        return res.status(400).json({ message: "Failed to create roadmap" });
      } else {
        return res
          .status(201)
          .json({ status: "true", message: "roadmap created successfully" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

// create get all roadmaps controller
async function getAllRoadmaps(req, res) {
  try {
    const result = await roadmapService.getAllRoadmaps();

    return res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// create get roadmap controller
async function getRoadmap(req, res) {
  try {
    const { roadmap_id } = req.params;
    if (!roadmap_id) {
      return res.status(404).json({ message: "roadmap_id required" });
    }

    const result = await roadmapService.getRoadmap(roadmap_id);

    return res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

//  create delete roadmap controller
async function deleteRoadmap(req, res, next) {
  try {
    const roadmapId = req.params.roadmap_id;
    const result = await roadmapService.deleteRoadmap(roadmapId);
    return res
      .status(200)
      .json({ status: "success", message: "Roadmap deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// create update roadmap controller
async function updateRoadmap(req, res, next) {
  try {
    const roadmapId = req.params.roadmap_id;
    const roadmapData = req.body;
    const result = await roadmapService.updateRoadmap(roadmapId, roadmapData);
    if (!roadmapData) {
      return res.status(400).json({ error: "Failed to update roadmap" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Roadmap updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Export the controllers
module.exports = {
  createRoadmap,
  getAllRoadmaps,
  getRoadmap,
  deleteRoadmap,
  updateRoadmap,
};
