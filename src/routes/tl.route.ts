import express {type: Request, Response} from 'express';
import TLModel from '../models/TL';

const router = express.Router();

// Create a new TL
router.post('/', async (req:Request, res:Response) => {

try{
    const {name, description, Position} = req.body;

    const newTl = await TLModel.create({name, description, Position})
    res.status(201).json(newTl);
}

catch (error) {
    res.status(500).json({message: 'Error creating TL', error});
}

});

// Get all TLs
router.get('/', async (req:Request, res:Response) => {
    try {
        const tls = await TlModel.find();
        res.status(200).json(tls);
    } catch (error) {
        res.status(500).json({message: 'Error fetching TLs', error});
    }
});