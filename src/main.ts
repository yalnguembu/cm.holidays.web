import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/main.css";
import { useSessionStore } from "@/store/session";
import { USER_ROLE } from "@/utils/enum";
import {fetchUSerInformationsInsideStorage, prepareApis, RequestResponse} from "@/utils/api";
import { userHasRole } from "@/utils/user";
import { RequestsStatus } from "./utils/api";
import {Role} from "@/domain/Role";

prepareApis();

const app = createApp(App);
app.use(router).use(createPinia());

router.beforeEach(async (to, from, next) => {
  const sessionStore = useSessionStore();
  const isPublicRoute = to.meta.isPublic;
  const canUserGoToTheWantedPage = (): boolean =>
    (to.meta.requiredRolesList as USER_ROLE[])?.some((requiredRole: string) =>
      userHasRole(requiredRole as USER_ROLE, sessionStore.session.roles as Role[])
    );

  const getUserInformation = async (): Promise<RequestResponse<unknown>> => {
    const cachedUserInformation = fetchUSerInformationsInsideStorage();
    return await sessionStore.fetchUSerInformation(
            cachedUserInformation?.id ?? ""
        );
  }
  if (isPublicRoute) {
    next();
  } else {
    if (!sessionStore.session.isNull) {
      if (sessionStore.session.roles.length) {
        if (canUserGoToTheWantedPage())
          return next();
      } else {
        const fetchUSerInformationResponse = await getUserInformation();
        if (fetchUSerInformationResponse.status === RequestsStatus.SUCCESS) {
          return next();
        } else {
          await router.push({ replace: true, path: "/auth/sign-in" });
          return next();
        }
      }
    } else {
      const cachedUserInformation = fetchUSerInformationsInsideStorage();
      const fetchUSerInformationResponse =
        await sessionStore.fetchUSerInformation(
          cachedUserInformation?.id ?? ""
        );
      if (fetchUSerInformationResponse.status === RequestsStatus.SUCCESS) {
        next();
      } else {
        await router.push({ replace: true, path: "/auth/sign-in" });
        return next()
      }
    }
  }
});
app.mount("#app");
