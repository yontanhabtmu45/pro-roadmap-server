// Import step service
const stepService = require("../Services/steps.service");

// Create/set steps for a roadmap
async function setSteps(req, res) {
  try {
    const { roadmap_id, steps } = req.body;

    if (!roadmap_id) {
      return res.status(400).json({ error: "roadmap_id is required" });
    }

    if (!steps || !Array.isArray(steps) || steps.length === 0) {
      return res.status(400).json({ error: "Steps must be a non-empty array" });
    }

    // Validate each step
    for (const step of steps) {
      if (
        typeof step.step_order !== "number" ||
        step.step_order < 1 ||
        !step.step_description
      ) {
        return res.status(400).json({
          error:
            "Each step must have step_order (positive number) and step_description",
        });
      }
    }

    await stepService.setSteps(roadmap_id, steps);

    return res.status(200).json({
      status: "success",
      message: "Steps saved successfully",
    });
  } catch (error) {
    console.error("SET STEPS ERROR:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get all steps for a roadmap
async function getSteps(req, res) {
  try {
    const result = await stepService.getSteps();

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get a single set for a roadmap
async function getSingleStep(req, res) {
  try {
    const { step_id } = req.params;

    if (!step_id) {
      return res.status(400).json({ error: "step_id is required" });
    }

    const step = await stepService.getSingleStep(step_id);

    return res.status(200).json({
      status: "success",
      data: step,
    });
  } catch (error) {
    console.error("GET STEP ERROR:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// A function to get all steps for a single roadmap
async function getStepsByRoadmap(req, res) {
  try {
    
    const { roadmap_id } = req.params;
  
    const result = await stepService.getStepsByRoadmap(roadmap_id);
  
    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("GET STEP ERROR:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


// Delete all steps for a roadmap
async function deleteSteps(req, res) {
  try {
    const { step_id } = req.params;

    if (!step_id) {
      return res.status(400).json({ error: "step_id is required" });
    }

    await stepService.deleteSteps(step_id);

    return res.status(200).json({
      status: "success",
      message: "Steps deleted successfully",
    });
  } catch (error) {
    console.error("DELETE STEPS ERROR:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update a single step
async function updateSteps(req, res) {
  try {
    const { step_id } = req.params;
    const { step_title, step_order, step_description } = req.body;

    if (!step_id) {
      return res.status(400).json({ error: "step_id is required" });
    }

    // check if step_id exists
    const existingSteps = await stepService.getSingleStep(step_id);
    if (existingSteps.length === 0) {
      return res.status(404).json({ error: "Step not found" });
    }

    // check if at least one field is provided for update
    if (!step_title && !step_order && !step_description) {
      return res
        .status(400)
        .json({ error: "At least one field must be provided for update" });
    }
    // check if step_order is a positive number if provided
    if (
      step_order !== undefined &&
      (typeof step_order !== "number" || step_order < 1)
    ) {
      return res
        .status(400)
        .json({ error: "step_order must be a positive number" });
    }

    const updateData = { step_title, step_order, step_description };

    await stepService.updateSteps(step_id, updateData);

    return res.status(200).json({
      status: "success",
      message: "Step updated successfully",
    });
  } catch (error) {
    console.error("UPDATE STEP ERROR:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  setSteps,
  getSteps,
  getSingleStep,
  getStepsByRoadmap,
  deleteSteps,
  updateSteps,
};
