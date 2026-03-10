import express from "express";
import Flavor from "../models/Flavor.js";

const router = express.Router();

// Get all flavors
router.get("/", async (req, res) => {
  const flavors = await Flavor.find();
  res.json(flavors);
});

// Add flavor
router.post("/", async (req, res) => {
  const newFlavor = new Flavor(req.body);
  const savedFlavor = await newFlavor.save();
  res.json(savedFlavor);
});

export default router;