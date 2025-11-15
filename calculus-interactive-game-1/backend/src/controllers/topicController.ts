import { Request, Response } from 'express';
import { TopicService } from '../services/topicService';

const topicService = new TopicService();

export const getAllTopics = (req: Request, res: Response): void => {
    try {
        const topics = topicService.getAllTopics();
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching topics', error });
    }
};

export const getTopicById = (req: Request, res: Response): void => {
    try {
        const { topicId } = req.params;
        const topic = topicService.getTopicById(topicId);
        
        if (!topic) {
            res.status(404).json({ message: 'Topic not found' });
            return;
        }
        
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching topic', error });
    }
};

export const getLessonById = (req: Request, res: Response): void => {
    try {
        const { topicId, lessonId } = req.params;
        const lesson = topicService.getLessonById(topicId, lessonId);
        
        if (!lesson) {
            res.status(404).json({ message: 'Lesson not found' });
            return;
        }
        
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lesson', error });
    }
};
