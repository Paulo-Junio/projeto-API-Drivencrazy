import {Router} from 'express';
import { OptionVoteRegister, OptionEnquetesData } from '../controllers/optionVoteControllers.js';
import { OptionEnqueteValidation } from '../middlewares/optionVotesValidationMiddleware.js';



const router = Router();

router.post("/choice", OptionEnqueteValidation, OptionVoteRegister);
router.get("/poll/:id/choice",OptionEnquetesData);

export default router;