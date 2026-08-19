import express, { type Request, type Response } from 'express';
import { Types } from 'mongoose';
import Coder from '../models/Coder.js';
import ClanModel from '../models/Clan.js';
import RoutesModel from '../models/Routes.js';

const router = express.Router();

// Get all coders belonging to a specific clan
router.get('/clan/:clanId', async (req: Request, res: Response) => {
  try {
    const { clanId } = req.params;

    const cleanClanId = new Types.ObjectId(String(clanId));

    const coders = await Coder.find({ clanId: cleanClanId }).populate('clanId');
    res.status(200).json(coders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coders by clan', error });
  }
});

// Get all coders belonging to a specific route
router.get('/route/:routeId', async (req: Request, res: Response) => {
  try {
    const { routeId } = req.params;

    const cleanRouteId = new Types.ObjectId(String(routeId));

    const coders = await Coder.find({ routeId: cleanRouteId })
      .populate('clanId')
      .populate('routeId');

    res.status(200).json(coders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coders by route', error });
  }
});

// Create a new Coder
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, status, shift, clanId, routeId } = req.body;

    const clanExists = await ClanModel.findById(clanId);
    if (!clanExists) {
      return res.status(404).json({
        message: 'Validation error: The specified Clan does not exist',
      });
    }

    const routeExists = await RoutesModel.findById(routeId);
    if (!routeExists) {
      return res.status(404).json({
        message: 'Validation error: The specified Route does not exist',
      });
    }

    const newCoder = await Coder.create({
      name,
      email,
      status,
      shift,
      clanId,
      routeId,
    });
    res.status(201).json(newCoder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Coder', error });
  }
});

// Get all Coders
router.get('/', async (req: Request, res: Response) => {
  try {
    const coders = await Coder.find().populate('clanId').populate('routeId');
    res.status(200).json(coders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Coders', error });
  }
});

// Get a Coder by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const coder = await Coder.findById(id)
      .populate('clanId')
      .populate('routeId');

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
    const { name, email, status, shift, clanId, routeId } = req.body;

    if (clanId) {
      const clanExists = await ClanModel.findById(clanId);
      if (!clanExists) {
        return res.status(404).json({
          message: 'Validation error: The specified Clan does not exist',
        });
      }
    }

    if (routeId) {
      const routeExists = await RoutesModel.findById(routeId);
      if (!routeExists) {
        return res.status(404).json({
          message: 'Validation error: The specified Route does not exist',
        });
      }
    }

    const updatedCoder = await Coder.findByIdAndUpdate(
      id,
      { name, email, status, shift, clanId, routeId },
      { new: true }
    )
      .populate('clanId')
      .populate('routeId');

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
