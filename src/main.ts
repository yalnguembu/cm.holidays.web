import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/";
import { createPinia } from "pinia";
import "./assets/main.css";
import { useSessionStore } from "@/store/session";
import { USER_ROLE } from "@/utils/enum";
import { fetchUSerInformationsInsideStorage, prepareApis } from "@/utils/api";
import { userHasRole } from "@/utils/user";
import { ResquestStatus } from "./utils/api";

prepareApis();

const app = createApp(App);
app.use(createPinia());
app.use(router);
router.beforeEach(async (to, from, next) => {
  const sessionStore = useSessionStore();
  const isPublicRoute = to.meta.isPublic;
  const canUserGoToTheWantedPage = (): boolean =>
    (to.meta.requiredRolesList as USER_ROLE[])?.some((requiredRole: string) =>
      userHasRole(requiredRole as USER_ROLE, sessionStore.session.roles)
    );

  if (isPublicRoute) {
    next();
    return true;
  } else {
    if (!sessionStore.session.isNull) {
      if (canUserGoToTheWantedPage()) {
        return next();
      } else {
        await router.push({ replace: true, path: "/" });
        return next();
      }
    } else {
      console.log("User is not connected");
      const cachedUserInformations = fetchUSerInformationsInsideStorage();
      const fetchUSerInformationsResponse =
        await sessionStore.fetchUSerInformations(
          cachedUserInformations?.id ?? ""
        );
      if (fetchUSerInformationsResponse.status === ResquestStatus.SUCCESS) {
        console.log("User can Go To TheWantedPage after fetch");
        next();
      } else {
        await router.push({ replace: true, path: "/auth/sign-in" });
        return next()
      }
    }
  }
});
app.mount("#app");
