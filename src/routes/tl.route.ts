import express, { type Request, type Response } from 'express';
import TLModel from '../models/TL.js';

const router = express.Router();

// Create a new TL
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, position } = req.body;

    const newTl = await TLModel.create({ name, description, position });
    res.status(201).json(newTl);
  } catch (error) {
    res.status(500).json({ message: 'Error creating TL', error });
  }
});

// Get all TLs
router.get('/', async (req: Request, res: Response) => {
  try {
    const tls = await TLModel.find();
    res.status(200).json(tls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching TLs', error });
  }
});

// Get a TL by ID

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tl = await TLModel.findById(id);

    if (!tl) {
      return res.status(404).json({ message: 'TL not found' });
    }
    res.status(200).json(tl);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching TL', error });
  }
});

// Update a TL by ID

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, description, position } = req.body;
    const updatedTL = await TLModel.findByIdAndUpdate(
      id,
      { name, description, position },
      { new: true }
    );

    if (!updatedTL) {
      return res.status(404).json({ message: 'TL not found' });
    }
    res.status(200).json(updatedTL);
  } catch (error) {
    res.status(500).json({ message: 'Error updating TL', error });
  }
});

// Delete a TL by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTL = await TLModel.findByIdAndDelete(id);

    if (!deletedTL) {
      return res.status(404).json({ message: 'TL not found' });
    }
    res.status(200).json({ message: 'TL deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting TL', error });
  }
});

export default router;
