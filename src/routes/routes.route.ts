import express, { type Request, type Response } from 'express';
import Routes from '../models/Routes.js';

const router = express.Router();

// Create a new Route

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const newRoute = await Routes.create({ name, description });
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Route', error });
  }
});

// Get all Routes
router.get('/', async (req: Request, res: Response) => {
  try {
    const routes = await Routes.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Routes', error });
  }
});

// Get a Route by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const route = await Routes.findById(id);

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
    const { name, description } = req.body;
    const updatedRoute = await Routes.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

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
