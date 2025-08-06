import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {createPolicy,getAllPolicies,getPolicyById,updatePolicy,deletePolicyById} from '../controllers/companypolicy.contoller.js';

const router = express.Router();


router.post('/policy',protect, createPolicy);

router.get('/policies',protect, getAllPolicies);

router.get('/policyId',protect, getPolicyById);

router.put('/policyId',protect, updatePolicy);

router.delete('/policyId',protect,deletePolicyById);

export default router;