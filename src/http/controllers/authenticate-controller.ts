import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from "zod";
import { RegisterUseCase } from '@/use-cases/register';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { name, email, password} = authenticateBodySchema.parse(request.body);

  try {
    const usersRepo = new PrismaUsersRepository();
    
    const authenticateUseCase = new RegisterUseCase(usersRepo);

    await authenticateUseCase.execute({name, email, password});
    
  } catch (err) {
    if(err instanceof InvalidCredentialsError){
      return reply.status(400).send({message: err.message});
    }

    throw err;
  }
  return reply.status(200).send();
}