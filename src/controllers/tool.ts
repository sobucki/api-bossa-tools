import { Controller, Get, Post } from '@overnightjs/core';
import { Tool } from '@src/models/tool';
import { Request, Response } from 'express';
import { BaseController } from '.';

@Controller('tools')
export class ToolController extends BaseController {
  @Get('')
  public async getAllTools(_: Request, res: Response): Promise<void> {
    try {
      const tools = await Tool.find({}).exec();
      res.send(tools);
    } catch (error) {
      this.sendErrorResponse(res, {
        code: 500,
        message: 'Something went wrong',
      });
    }
  }

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const tool = new Tool(req.body);
      const result = await tool.save();
      res.status(201).send(result);
    } catch (error) {
      this.sendErrorResponse(res, {
        code: 500,
        message: 'Something went wrong',
      });
    }
  }
}
