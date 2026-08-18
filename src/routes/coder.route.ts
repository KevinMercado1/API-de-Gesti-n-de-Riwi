import express, { type Request, type Response } from 'express';
import Coder from '../models/Coder.js';
import ClanModel from '../models/Clan.js';

const router = express.Router();

// Create a new Coder
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, status, shift, clanId } = req.body;

    // Validation: Check if the Clan exists before creating the Coder
    const clanExists = await ClanModel.findById(clanId);
    if (!clanExists) {
      return res.status(404).json({
        message: 'Validation error: The specified Clan does not exist',
      });
    }

    const newCoder = await Coder.create({ name, email, status, shift, clanId });
    res.status(201).json(newCoder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Coder', error });
  }
});

// Get all Coders (with .populate to include Clan information)
router.get('/', async (req: Request, res: Response) => {
  try {
    const coders = await Coder.find().populate('clanId');
    res.status(200).json(coders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Coders', error });
  }
});

// Get a Coder by ID (with .populate)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const coder = await Coder.findById(id).populate('clanId');

    if (!coder) {
      return res.status(404).json({ message: 'Coder not found' });
    }
    res.status(200).json(coder);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Coder', error });
  }
});

// Update a Coder by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, email, status, shift, clanId } = req.body;

    // If a new clanId is sent in the update, validate that it exists
    if (clanId) {
      const clanExists = await ClanModel.findById(clanId);
      if (!clanExists) {
        return res.status(404).json({
          message: 'Validation error: The specified Clan does not exist',
        });
      }
    }

    const updatedCoder = await Coder.findByIdAndUpdate(
      id,
      { name, email, status, shift, clanId },
      { new: true },
    ).populate('clanId');

    if (!updatedCoder) {
      return res.status(404).json({ message: 'Coder not found' });
    }
    res.status(200).json(updatedCoder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Coder', error });
  }
});

// Delete a Coder by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCoder = await Coder.findByIdAndDelete(id);

    if (!deletedCoder) {
      return res.status(404).json({ message: 'Coder not found' });
    }
    res.status(200).json({ message: 'Coder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Coder', error });
  }
});

export default router;
