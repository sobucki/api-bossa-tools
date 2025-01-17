import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { authMiddleware } from '@src/midlewares/auth';
import { User } from '@src/models/user';
import AuthService from '@src/services/auth';
import { Request, Response } from 'express';
import { BaseController } from '.';

@Controller('users')
export class UsersController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      const newUser = await user.save();
      res.status(201).send(newUser);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Post('authenticate')
  public async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return this.sendErrorResponse(res, {
          code: 401,
          message: 'User not found!',
        });
      }

      if (!(await AuthService.comparePassword(password, user.password))) {
        return this.sendErrorResponse(res, {
          code: 401,
          message: 'Password does not match!',
        });
      }

      const token = AuthService.generateToken(user.toJSON());
      return res.status(200).send({ token });
    } catch (error) {
      return this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Get('me')
  @Middleware(authMiddleware)
  public async me(req: Request, res: Response): Promise<Response> {
    const email = req.decoded ? req.decoded.email : undefined;
    const user = await User.findOne({ email });

    if (!user) {
      return this.sendErrorResponse(res, {
        code: 404,
        message: 'User not found!',
      });
    }

    return res.send({ user });
  }
}
