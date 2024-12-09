import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().populate("freelancer_id");
    res.status(200).json(services);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch services", error: error.message });
  }
};

export const createService = async (req, res) => {
  const { title, description, category_id, price, freelancer_id } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    if (!category_id) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }

    if (!freelancer_id) {
      return res.status(400).json({ message: "Freelancer ID is required" });
    }

    const existingService = await Service.findOne({ title });
    if (existingService) {
      return res.status(409).json({ message: "Service already exists" });
    }

    const newService = new Service({
      title,
      description,
      category_id,
      price,
      freelancer_id,
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create service", error: error.message });
  }
};

export const updateService = async (req, res) => {
  const { id } = req.params;
  const { title, description, category_id, price, freelancer_id } = req.body;

  try {
    if (!title || !description || !category_id || !price || !freelancer_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category_id,
        price,
        freelancer_id,
      },
      { new: true }
    );

    await updatedService.save();
    res.status(200).json(updatedService);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update service", error: error.message });
  }
};

export const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete service", error: error.message });
  }
};
