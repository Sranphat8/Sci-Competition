import Activity from "../models/activity.model.js";
const activityController = {};
// Create a new activity
activityController.createActivity = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    } = req.body;
    // Validate required fields
    if (
      !name ||
      !description ||
      !type ||
      !level ||
      !team_size ||
      !date ||
      !location ||
      !reg_open ||
      !reg_close ||
      !contact_name ||
      !contact_phone ||
      !contact_email
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    // Check for duplicate activity name
    await Activity.findOne({ where: { name } }).then((activity) => {
      if (activity) {
        res.status(400).send({ message: "Activity name is already existed" });
        return;
      }
    });

    // Create the activity
    const newActivity = await Activity.create({
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    });

    res.status(201).json(newActivity);
  } catch (error) {
    console.error("Error creating activity:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while creating the activity" });
  }
};

// Get all activities
activityController.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching activities" });
  }
};
// Get activity by ID
activityController.getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.error("Error fetching activity:", error);
    res.status(500).json({
      message: "Something went wrong while fetching the activity by ID",
    });
  }
};
// Update activity by ID
activityController.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);

    // Validate ID
    if (!id) {
      return res.status(400).json({ message: "Activity ID is required" });
    }
    // Check if activity exists
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Extract fields from request body
    const {
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    } = req.body;
    // Validate required fields
    if (
      !name ||
      !description ||
      !type ||
      !level ||
      !team_size ||
      !date ||
      !location ||
      !reg_open ||
      !reg_close ||
      !contact_name ||
      !contact_phone ||
      !contact_email
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    // Check for duplicate activity name
    await Activity.findOne({ where: { name } }).then((activity) => {
      if (activity && activity.id !== parseInt(id)) {
        res.status(400).send({ message: "Activity name is already existed" });
        return;
      }
    });

    // Update the activity
    await activity
      .update({
        name,
        description,
        type,
        level,
        team_size,
        date,
        location,
        reg_open,
        reg_close,
        contact_name,
        contact_phone,
        contact_email,
        status,
      })
      .then((num) => {
        console.log("num", num);

        if (num) {
          // console.log("Activity was updated successfully.");
          res
            .status(200)
            .send({ message: "Activity was updated successfully." });
        } else {
          // console.log(
          //   `Cannot update Activity with id=${id}. Maybe Activity was not found or req.body is empty!`
          // );
          res.status(404).send({
            message: `Cannot update Activity with id=${id}. Maybe Activity was not found or req.body is empty!`,
          });
        }
      });
  } catch (error) {
    console.error("Error updating activity:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating the activity" });
  }
};
// Delete activity by ID
activityController.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate ID
    if (!id) {
      return res.status(400).json({ error: "Activity ID is required" });
    }
    // Check if activity exists
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }
    await activity.destroy();
    res.status(204).json({ message: "Delete activity Successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while deleting the activity" });
  }
};

activityController.searchActivities = async (req, res) => {
  try {
    const { name, type, level, status } = req.query;
    const whereClause = {};
    if (name) {
      whereClause.name = { [Op.iLike]: `%${name}%` }; // Case-insensitive search
    }
    if (type) {
      whereClause.type = type;
    }
    if (level) {
      whereClause.level = level;
    }
    if (status) {
      whereClause.status = status;
    }
    const activities = await Activity.findAll({ where: whereClause });
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error searching activities:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while searching activities" });
  }
};

export default activityController;
