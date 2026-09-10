import { NextFunction, Request, Response } from "express";
import service from "../service/service";

const controller = {
    appliedJob: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const result = await service.createApplication(data);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default controller;