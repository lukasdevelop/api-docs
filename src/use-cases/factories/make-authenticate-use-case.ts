import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const sut = new AuthenticateUseCase(usersRepository);

  return sut;
}