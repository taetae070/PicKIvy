// src/validators/userValidator.ts
import Joi from 'joi';

//사용자가 입력한 데이터가 서버로 전송되기 전에 그 데이터가 올바른 형식인지 확인
export const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': '비밀번호 확인이 일치하지 않습니다.',
  })
});
