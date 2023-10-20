import {createApp} from "vue";
import App from "./App.vue";
import router from "./router/";
import {createPinia} from "pinia";
import "./assets/main.css";
import {useSessionStore} from "@/store/session";
import {USER_ROLE} from "@/utils/enum";
import {fetchUSerInformationsInsideStorage, prepareApis} from "@/utils/api";
import {userHasRole} from "@/utils/user";
import { ResquestStatus } from "./utils/api";

prepareApis();

const app = createApp(App);
app.use(createPinia());
app.use(router);
router.beforeEach(async (to, from, next) => {
    const sessionStore = useSessionStore();
    const isPublicRoute = to.meta.isPublic;
    const canUserGoToTheWantedPage = ():boolean =>  (to.meta.requiredRolesList as USER_ROLE[])?.some(
        (requiredRole:string) =>
            userHasRole(requiredRole as USER_ROLE, sessionStore.session.roles)
    );

    if(isPublicRoute) next()
    else{
        if (!sessionStore.session.isNull) {
            if (canUserGoToTheWantedPage()) {
                next();
            }
            else await router.push("/")
        }
        else {
            const cachedUserInformations = fetchUSerInformationsInsideStorage()
            const fetchUSerInformationsResponse = await  sessionStore.fetchUSerInformations(cachedUserInformations?.id ?? "");
            if (fetchUSerInformationsResponse.status === ResquestStatus.SUCCESS) next();
            else await router.push("/auth/sign-in");
        }
    }
});
app.mount("#app");
