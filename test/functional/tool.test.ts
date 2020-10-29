import { Tool } from '@src/models/tool';

describe('Tools functional tests', () => {
  beforeEach(async () => await Tool.deleteMany({}));

  describe('When search the tools', () => {
    it('should return a list of registered tools', async () => {
      const newTool1 = {
        title: 'Notion',
        link: 'https://notion.so',
        description:
          'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
        tags: [
          'organization',
          'planning',
          'collaboration',
          'writing',
          'calendar',
        ],
      };

      const newTool2 = {
        title: 'json-server',
        link: 'https://github.com/typicode/json-server',
        description:
          'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
        tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
      };

      const newTool3 = {
        title: 'fastify',
        link: 'https://www.fastify.io/',
        description:
          'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
        tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost'],
      };

      await new Tool(newTool1).save();
      await new Tool(newTool2).save();
      await new Tool(newTool3).save();

      const { body, status } = await global.testRequest.get('/tools');

      expect(status).toBe(200);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining(newTool1),
          expect.objectContaining(newTool2),
          expect.objectContaining(newTool3),
        ])
      );
    });
  });

  describe('When creating a tool', () => {
    it('should create a tool whith success', async () => {
      const newTool = {
        title: 'hotel',
        link: 'https://github.com/typicode/hotel',
        description:
          'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: [
          'node',
          'organizing',
          'webapps',
          'domain',
          'developer',
          'https',
          'proxy',
        ],
      };

      const response = await global.testRequest.post('/tools').send(newTool);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newTool));
    });
  });
});
