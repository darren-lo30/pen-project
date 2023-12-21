import { NextFunction, RequestHandler } from 'express';
import { AnyZodObject, z } from 'zod';

const validate = (schema: AnyZodObject): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
};

export default validate;
