import express, { type Request, type Response } from 'express';
import Clan from '../models/Clan.js';

const router = express.Router();

// Create a new Clan
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const newClan = await Clan.create({ name });
    res.status(201).json(newClan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Clan', error });
  }
});

// Get all Clans
router.get('/', async (req: Request, res: Response) => {
  try {
    const clans = await Clan.find();
    res.status(200).json(clans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Clans', error });
  }
});

// Get a Clan by ID

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clan = await Clan.findById(id);

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
    const { name } = req.body;
    const updatedClan = await Clan.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

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
