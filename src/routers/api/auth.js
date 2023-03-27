import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { passportCall } from '../../services/external/passport-config.js';
import upload from '../../services/external/upload.js';
import config from '../../config.js';
import { checkAuthorization } from '../../auth/index.js';
import { returnMessage } from '../../utils/functions.js';
import UserDto from '../../dtos/UserDto.js';

const authApiRouter = new Router();

authApiRouter.post(
  '/register',
  upload.single('avatar'),
  passportCall('signup'),
  (req, res) => {
    const user = new UserDto(req.user.payload);
    const userString = JSON.stringify(user);
    const token = jwt.sign(userString, config.JWT_SECRET);
    const returnObject = returnMessage(
      false,
      200,
      'El usuario se registró correctamente',
      { token, user },
      null
    );
    res.send(returnObject);
  }
);

authApiRouter.post('/login', passportCall('login'), (req, res) => {
  const user = new UserDto(req.user.payload);
  const userString = JSON.stringify(user);
  const token = jwt.sign(userString, config.JWT_SECRET);
  const returnObject = returnMessage(
    false,
    200,
    'El usuario iniciado sesión correctamente',
    { token, user },
    null
  );
  res.send(returnObject);
});

export default authApiRouter;
