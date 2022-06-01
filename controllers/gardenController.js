import asyncHandler from "express-async-handler";
import Garden from "../models/gardenModel.js";

export const getGardens = asyncHandler(async (req, res) => {
    const gardens = await Garden.find({user: req.user._id});
    res.json(gardens);
})

export const getGarden = asyncHandler(async (req, res) => {
    const garden = await Garden.findById(req.params.id);
    res.json(garden);
})

export const createGarden = asyncHandler(async (req, res) => {
    const {
        name, description, image, rows, cols, grid
    } = req.body;


    const garden = new Garden({user: req.user._id, name, description, image, rows, cols, grid})

    const created = await garden.save();
    res.status(201).json(created);
})

export const updateGarden = asyncHandler(async (req, res) => {
    const {
        name, description, image, rows, cols, grid
    } = req.body;

    const garden = await Garden.findByIdAndUpdate(req.params.id, {
        name, description, image, rows, cols, grid
    }, {new: true});

    res.json(garden);
})


