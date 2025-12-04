import Joi from "joi";

export const movieSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  director: Joi.string().min(1).max(50).required(),
  year: Joi.number().integer().min(1700).max(new Date().getFullYear()).required()
});
