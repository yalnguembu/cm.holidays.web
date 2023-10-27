import { UserInformation } from "@/utils/types";
import { ApiError, OpenAPI } from "@/services";

export const storeUserInformationsInsideStorage = (
  informations: UserInformation
): void => {
  localStorage.setItem("user-informations", JSON.stringify(informations));
};

export const fetchUSerInformationsInsideStorage = (): UserInformation => {
  const informations: string =
    localStorage.getItem("user-informations") ?? "{}";
  return JSON.parse(informations);
};

export const prepareApis = (): void => {
  OpenAPI.BASE = import.meta.env.VITE_BASE_URL;
  OpenAPI.TOKEN = fetchUSerInformationsInsideStorage()?.token;
};

export const setRequestHeaderToken = (token: string): void => {
  OpenAPI.TOKEN = token;
};

export class ErrorResponse {
  constructor(
    private readonly errorResponse: {
      statusCode: number;
      message: string;
    }
  ) {}

  get message(): string {
    return this.errorResponse.message;
  }

  get statusCode(): number {
    return this.errorResponse.statusCode;
  }
}

export enum ResquestStatus {
  FAILLED,
  SUCCESS,
}

export class RequestResponse<AwaitedData> {
  constructor(
    private readonly requestResponse: {
      status: ResquestStatus;
      data?: AwaitedData;
      error?: ErrorResponse;
    }
  ) {}

  get status(): ResquestStatus {
    return this.requestResponse.status;
  }

  set status(status: ResquestStatus) {
    this.requestResponse.status = status;
  }

  get data(): AwaitedData | undefined {
    return this.requestResponse.data;
  }

  set data(data: AwaitedData) {
    this.requestResponse.data = data;
  }

  get error(): ErrorResponse | undefined {
    return this.requestResponse.error;
  }

  set error(error: ErrorResponse) {
    this.requestResponse.error = error;
  }
}

export const handelRequest = async <ResponseType>(
  executeRequest: Function
): Promise<RequestResponse<ResponseType>> => {
  const requestResponse = new RequestResponse<ResponseType>({ status: ResquestStatus.FAILLED });

  try {
    requestResponse.data = await executeRequest();
    requestResponse.status = ResquestStatus.SUCCESS;
  } catch (error: ApiError | any) {
    requestResponse.error = new ErrorResponse({
      message: error?.statusText ?? "",
      statusCode: error?.status ?? 500,
    });
    console.log(error);
    requestResponse.status = ResquestStatus.FAILLED;
  } finally {
    return requestResponse;
  }
};
