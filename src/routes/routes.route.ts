import express, { type Request, type Response } from 'express';
import Routes from '../models/Routes.js';
import TLModel from '../models/TL.js';

const router = express.Router();

// Create a new Route
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, shift, tlId } = req.body;

    // Validation: Check if the TL exists before creating the Route
    const tlExists = await TLModel.findById(tlId);
    if (!tlExists) {
      return res
        .status(404)
        .json({ message: 'Validation error: The specified TL does not exist' });
    }

    const newRoute = await Routes.create({ name, description, shift, tlId });
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Route', error });
  }
});

// Get all Routes (with .populate to include TL information)
router.get('/', async (req: Request, res: Response) => {
  try {
    const routes = await Routes.find().populate('tlId');
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Routes', error });
  }
});

// Get a Route by ID (with .populate)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const route = await Routes.findById(id).populate('tlId');

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Route', error });
  }
});

// Update a Route by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, description, shift, tlId } = req.body;

    // If a new tlId is sent in the update, validate that it exists
    if (tlId) {
      const tlExists = await TLModel.findById(tlId);
      if (!tlExists) {
        return res.status(404).json({
          message: 'Validation error: The specified TL does not exist',
        });
      }
    }

    const updatedRoute = await Routes.findByIdAndUpdate(
      id,
      { name, description, shift, tlId },
      { new: true },
    ).populate('tlId');

    if (!updatedRoute) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json(updatedRoute);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Route', error });
  }
});

// Delete a Route by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedRoute = await Routes.findByIdAndDelete(id);

    if (!deletedRoute) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json({ message: 'Route deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Route', error });
  }
});

export default router;
