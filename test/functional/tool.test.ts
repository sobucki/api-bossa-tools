import { Tool } from '@src/models/tool';
import { User, UserModel } from '@src/models/user';
import AuthService from '@src/services/auth';

describe('Tools functional tests', () => {
  const defaultUserData = {
    name: 'John Doe',
    email: 'john@mail.com',
    password: '1234',
  };
  let token: string;
  let defaultUser: UserModel;

  beforeEach(async () => {
    await Tool.deleteMany({});
    await User.deleteMany({});
    defaultUser = await new User(defaultUserData).save();
    token = AuthService.generateToken(defaultUser.toJSON());
  });

  describe('When search the tools', () => {
    it('should return a list of registered tools without filters', async () => {
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
        user: defaultUser.id,
      };

      const newTool2 = {
        title: 'json-server',
        link: 'https://github.com/typicode/json-server',
        description:
          'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
        tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
        user: defaultUser.id,
      };

      const newTool3 = {
        title: 'fastify',
        link: 'https://www.fastify.io/',
        description:
          'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
        tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost'],
        user: defaultUser.id,
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

    it('should return a list filtered by tag', async () => {
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
        user: defaultUser.id,
      };

      const newTool2 = {
        title: 'json-server',
        link: 'https://github.com/typicode/json-server',
        description:
          'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
        tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
        user: defaultUser.id,
      };

      const newTool3 = {
        title: 'fastify',
        link: 'https://www.fastify.io/',
        description:
          'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
        tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost'],
        user: defaultUser.id,
      };

      await new Tool(newTool1).save();
      await new Tool(newTool2).save();
      await new Tool(newTool3).save();

      const tagFilter = 'node';

      const { body, status } = await global.testRequest.get(
        `/tools?tag=${tagFilter}`
      );

      expect(status).toBe(200);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining(newTool2),
          expect.objectContaining(newTool3),
        ])
      );
    });

    it('should not return any tool, filtering by unknown tag', async () => {
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
        user: defaultUser.id,
      };

      await new Tool(newTool1).save();

      const tagFilter = 'invalid-tag';

      const { body, status } = await global.testRequest.get(
        `/tools?tag=${tagFilter}`
      );

      expect(status).toBe(200);
      expect(body).toEqual([]);
    });
  });

  describe('When creating a tool', () => {
    it('should create a tool with success', async () => {
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

      const response = await global.testRequest
        .post('/tools')
        .set({ 'x-access-token': token })
        .send(newTool);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newTool);
    });
  });

  describe('When deleting a tool', () => {
    it('should delete a tool by id with success', async () => {
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
        user: defaultUser.id,
      };

      const savedTool = await new Tool(newTool).save();

      const response = await global.testRequest
        .delete(`/tools/${savedTool.id}`)
        .set({ 'x-access-token': token });

      expect(response.status).toBe(204);
    });
  });
});
