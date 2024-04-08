import express, { Express, Request, Response, NextFunction } from 'express';
import { createHandler, HandlerOptions } from 'graphql-http/lib/use/express';
import cors from 'cors';
import { schema } from './Schema/index';
import expressPlayground from 'graphql-playground-middleware-express';
import logger from './Middleware/logger';

interface RootValue {
  hello: () => string;
}

const root: RootValue = {
  hello() {
    return 'Hello world!';
  }
};

const app: Express = express();
app.use(cors());
app.use(express.json());

const handlerOptions: HandlerOptions = {
  schema: schema,
  rootValue: root
};

// Create and use the GraphQL handler.
app.all('/graphql', createHandler(handlerOptions));

// Serve the GraphiQL IDE.
// app.get("/", (_req: Request, res: Response) => {
//   res.type("html");
// //   res.end(ruruHTML({ endpoint: "/graphql" }));
//   res.end(express.static(__dirname + '/playground'));
// });

app.get('/', expressPlayground({ endpoint: '/graphql' }));
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

// Last middleware
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(400).send('An error occurred');
});

// Start the server at port
// app.listen(4001);

const server = app.listen(4001, () => {
  logger.info(`Running a GraphQL API server at http://localhost:4001/graphql`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing http server.');
  server.close((err) => {
    logger.warn('Http server closed.');
    process.exit(err ? 1 : 0);
  });
});

export default app;
