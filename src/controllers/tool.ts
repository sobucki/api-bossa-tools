import { Controller, Get, Post } from '@overnightjs/core';
import { Tool } from '@src/models/tool';
import { Request, Response } from 'express';

@Controller('tools')
export class ToolController {
  @Get('')
  public async getAllTools(_: Request, res: Response): Promise<void> {
    const tools = await Tool.find({}).exec();

    res.send(tools);
  }

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    const tool = new Tool(req.body);
    const result = await tool.save();
    res.status(201).send(result);
  }
}
