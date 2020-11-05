import { Controller, Delete, Get, Post } from '@overnightjs/core';
import { Tool } from '@src/models/tool';
import { Request, Response } from 'express';
import { BaseController } from '.';

@Controller('tools')
export class ToolController extends BaseController {
  @Get('')
  public async getAllTools(req: Request, res: Response): Promise<void> {
    try {
      const { tag } = req.query;
      let tools;

      if (tag) {
        tools = await Tool.find({ tags: { $in: tag as string[] } }).exec();
      } else {
        tools = await Tool.find({}).exec();
      }

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

  @Delete(':id')
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      await Tool.deleteOne({ _id: req.params.id });
      res.status(204).send();
    } catch (error) {
      this.sendErrorResponse(res, {
        code: 500,
        message: 'Something went wrong',
      });
    }
  }
}
