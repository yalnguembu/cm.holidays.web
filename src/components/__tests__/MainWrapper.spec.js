import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { createWebHistory, createRouter } from "vue-router";
import { routes } from "@/router/router";
import MainWrapper from "../MainWrapper.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

describe("MainWrapper", async () => {
  it("should render correctly", async () => {
    const mockRouter = {
      push: vi.fn(),
    };

    router.push("/");
    await router.isReady();

    const wrapper = mount(MainWrapper, {
      global: {
        mocks: {
          sessionStorage: {
            getItem: vi.fn(() => {}),
          },
          localStorage: {
            getItem: vi.fn(() => {}),
          },
          $router: mockRouter,
        },
        plugins: [router],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("should display the page", async () => {
    const mockRouter = {
      push: vi.fn(),
    };

    const wrapper = mount(MainWrapper, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [router],
      },
    });

    expect(wrapper.findComponent({ name: "TheMainNavbar" }).exists()).toBe(
      true
    );
    expect(wrapper.findComponent({ name: "RouterView" }).exists()).toBe(true);
  });

  it("should redirect to login page when user is not connected", async () => {
    const mockRouter = {
      push: vi.fn(),
    };

    router.push("/");
    await router.isReady();

    mount(MainWrapper, {
      global: {
        mocks: {
          sessionStorage: {
            getItem: vi.fn(() => {}),
          },
          localStorage: {
            getItem: vi.fn(() => {}),
          },
          $router: mockRouter,
        },
        plugins: [router],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledTimes(2);
    expect(mockRouter.push).toHaveBeenLastCalledWith("/login");
  });
});
