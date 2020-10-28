describe('Tools functional tests', () => {
  describe('When search the tools', () => {
    it('should return a list of registered tools', async () => {
      const { body, status } = await global.testRequest.get('/tool');

      expect(status).toBe(200);
      expect(body).toEqual([
        {
          id: 1,
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
        },
        {
          id: 2,
          title: 'json-server',
          link: 'https://github.com/typicode/json-server',
          description:
            'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
          tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
        },
        {
          id: 3,
          title: 'fastify',
          link: 'https://www.fastify.io/',
          description:
            'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
          tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost'],
        },
      ]);
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

      const response = await global.testRequest.post('/tool').send(newTool);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(newTool);
    });
  });
});
