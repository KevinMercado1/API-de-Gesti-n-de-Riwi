import express, { type Request, type Response } from 'express';
import Clan from '../models/Clan.js';
import RoutesModel from '../models/Routes.js';

const router = express.Router();

// Create a new Clan
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, shift, routeId } = req.body;

    // Validation: Check if the Route exists before creating the Clan
    const routeExists = await RoutesModel.findById(routeId);
    if (!routeExists) {
      return res.status(404).json({
        message: 'Validation error: The specified Route does not exist',
      });
    }

    const newClan = await Clan.create({ name, shift, routeId });
    res.status(201).json(newClan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Clan', error });
  }
});

// Get all Clans (with .populate to include Route information)
router.get('/', async (req: Request, res: Response) => {
  try {
    const clans = await Clan.find().populate('routeId');
    res.status(200).json(clans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Clans', error });
  }
});

// Get a Clan by ID (with .populate)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clan = await Clan.findById(id).populate('routeId');

    if (!clan) {
      return res.status(404).json({ message: 'Clan not found' });
    }
    res.status(200).json(clan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Clan', error });
  }
});

// Update a Clan by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, shift, routeId } = req.body;

    // If a new routeId is sent in the update, validate that it exists
    if (routeId) {
      const routeExists = await RoutesModel.findById(routeId);
      if (!routeExists) {
        return res.status(404).json({
          message: 'Validation error: The specified Route does not exist',
        });
      }
    }

    const updatedClan = await Clan.findByIdAndUpdate(
      id,
      { name, shift, routeId },
      { new: true },
    ).populate('routeId');

    if (!updatedClan) {
      return res.status(404).json({ message: 'Clan not found' });
    }
    res.status(200).json(updatedClan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Clan', error });
  }
});

// Delete a Clan by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedClan = await Clan.findByIdAndDelete(id);

    if (!deletedClan) {
      return res.status(404).json({ message: 'Clan not found' });
    }
    res.status(200).json({ message: 'Clan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Clan', error });
  }
});

export default router;
