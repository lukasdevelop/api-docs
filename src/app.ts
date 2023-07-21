import fastify from 'fastify';
import { appRouter } from './http/routes';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();

app.register(appRouter);

app.setErrorHandler((error, _request, reply) => {
  if(error instanceof ZodError){
    return reply.status(400)
      .send({ message: 'Validation error:', issues: error.format()});
  }

  if(env.NODE_ENV !== 'production'){
    console.error(error);
  }else {
    // TODO log to file or sentry
  }

  return reply.status(500).send({ message: 'Internal server errors.'});
});