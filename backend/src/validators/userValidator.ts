// src/validators/userValidator.ts
import Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': '비밀번호 확인이 일치하지 않습니다.',
  })
});
