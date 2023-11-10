import { UserInformation } from "@/utils/types";
import { ApiError, OpenAPI } from "@/services";
import { StatusCode } from "@/utils/enum";
import { useSessionStore } from "@/store/session";

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

export enum RequestsStatus {
  FAILED,
  SUCCESS,
}

export class RequestResponse<AwaitedData> {
  constructor(
    private readonly requestResponse: {
      status: RequestsStatus;
      data?: AwaitedData;
      error?: ErrorResponse;
    }
  ) {}

  get status(): RequestsStatus {
    return this.requestResponse.status;
  }

  set status(status: RequestsStatus) {
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
  const requestResponse = new RequestResponse<ResponseType>({ status: RequestsStatus.FAILED });

  try {
    requestResponse.data = await executeRequest();
    requestResponse.status = RequestsStatus.SUCCESS;
  } catch (error: ApiError | any) {
    requestResponse.error = new ErrorResponse({
      message: error?.statusText ?? "",
      statusCode: error?.status ?? 500,
    });
    requestResponse.status = RequestsStatus.FAILED;
  } finally {
    const isTheRequestUnauthorized =
        requestResponse.error?.statusCode === StatusCode.UNAUTHORIZE

    if (isTheRequestUnauthorized) {
      useSessionStore().signOut();
      localStorage.clear();
      window.location.replace("/auth/sign-in")
    }
  }
  return requestResponse;
};
