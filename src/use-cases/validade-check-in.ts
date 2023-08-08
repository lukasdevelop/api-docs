import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidatorError } from "./errors/late-check-in-validator.error";

interface ValidateCheckInUseCaseRequest {
    checkInId: string
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkinsRepo: CheckInsRepository){}

  async execute({checkInId} : ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse>{
    const checkIn = await this.checkinsRepo.findById(checkInId);

    if(!checkIn){
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    );

    if(distanceInMinutesFromCheckInCreation > 20){
      throw new LateCheckInValidatorError();
    }

    checkIn.validated_at = new Date();

    await this.checkinsRepo.save(checkIn);

    return {
      checkIn
    };

  }
}
