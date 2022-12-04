import {Router} from 'express';
import {EnqueteRegister, EnquetesData, Result} from "../controllers/enqueteControllers.js";
import { EnqueteValidation} from "../middlewares/enqueteValidationMiddlewares.js";


const router = Router();

router.post("/poll", EnqueteValidation, EnqueteRegister);
router.get("/poll", EnquetesData);
router.get("/poll/:id/result", Result);


export default router;