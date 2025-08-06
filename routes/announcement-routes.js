import express from 'express';

import { protect } from '../middlewares/authMiddleware.js';
import {createAnnouncement,getAllAnnouncements,getAnnouncementById,updateAnnouncement,deleteAnnouncementById} from '../controllers/announcement.contoller.js';

const router = express.Router();

router.post('/announcement',protect, createAnnouncement);

router.get('/announcements',protect, getAllAnnouncements);

router.get('/announcementId',protect, getAnnouncementById);

router.put('/announcementId',protect, updateAnnouncement);

router.delete('/announcementId',protect,deleteAnnouncementById);

export default router;