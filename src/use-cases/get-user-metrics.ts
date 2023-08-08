
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsUseCaseRequest {
    userId: string
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkinsRepo: CheckInsRepository){}

  async execute({
    userId,
  } : GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse>{
    const checkInsCount = await this.checkinsRepo.countByUserId(userId);

    return {
      checkInsCount
    };
  }
}