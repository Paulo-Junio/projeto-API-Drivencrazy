import {Router} from 'express';
import { VoteValidation } from '../middlewares/voteValidationMiddleware.js';
import { VoteRegister } from '../controllers/voteControllers.js';


const router = Router();


router.post("/choice/:id/vote", VoteValidation, VoteRegister);


export default router;