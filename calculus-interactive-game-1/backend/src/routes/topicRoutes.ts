import { Router } from 'express';
import { getAllTopics, getTopicById, getLessonById } from '../controllers/topicController';

const router = Router();

// Route to get all topics
router.get('/', getAllTopics);

// Route to get a specific topic by ID
router.get('/:topicId', getTopicById);

// Route to get a specific lesson within a topic
router.get('/:topicId/lessons/:lessonId', getLessonById);

export default router;
