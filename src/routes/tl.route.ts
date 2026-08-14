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

export default router;
