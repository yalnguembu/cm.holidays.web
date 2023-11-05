import { defineStore } from "pinia";
import { EmployeeService, USER_ROLE } from "@/services";
import { newNullSession, Session } from "@/domain/Session";
import { ref } from "vue";
import { Credential } from "@/domain/Credential";
import {
  type RequestResponse,
  handelRequest,
  storeUserInformationsInsideStorage,
  setRequestHeaderToken,
} from "../utils/api";

export const useSessionStore = defineStore("session", () => {
  const session = ref<Session>(newNullSession());

  const login = async (
    credential: Credential
  ): Promise<RequestResponse<void>> => {
    return handelRequest(async () => {

      const authenticationResponse = await EmployeeService.authenticateEmployee(
        { requestBody: credential.credentialAsDTO }
      );

      session.value = new Session({
        id: authenticationResponse.id,
        email: credential.email,
      });
      storeUserInformationsInsideStorage(authenticationResponse);
      setRequestHeaderToken(authenticationResponse.token ?? "" )
    });
  };

  const fetchUSerInformations = async (
    id: string
  ): Promise<RequestResponse<void>> => {
    return handelRequest(async () => {
      const informations = await EmployeeService.getEmployeeById({ id });
      session.value = new Session(informations);
    });
  };

  const signOut = () => {
    session.value = newNullSession();
  };

  return {
    login,
    session,
    fetchUSerInformations,
    signOut,
  };
});
