import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const sut = new RegisterUseCase(usersRepository);

  return sut;
}