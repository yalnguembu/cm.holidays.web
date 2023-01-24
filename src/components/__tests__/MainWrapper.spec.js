import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MainWrapper from "../MainWrapper.vue";
import TheMainNavbar from "../TheMainNavbar.vue";

describe("MainWrapper", async () => {
  const users = JSON.stringify([
    {
      id: "0",
      email: "user@lao-sarl.cm",
      password: "1234",
    },
    {
      id: "1",
      email: "yal@lao-sarl.cm",
      password: "1234",
    },
  ]);

  beforeEach(() => {
    global.Storage.prototype.getItem = vi.fn((key) => {
      if (key === "user") {
        return '{ "email": "user@lao-sarl.cm" }';
      } else if (key === "users") {
        return users;
      }
    });
  });

  afterEach(() => {
    global.Storage.prototype.getItem.mockReset();
  });

  it("should render correctly", async () => {
    const wrapper = mount(MainWrapper, {
      global: {
        mocks: {
          $router: { push: vi.fn() },
        },
        stubs: ["RouterView"],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("should display the `RouterView` if an user is connected", async () => {
    const mockRouter = {
      push: vi.fn(),
    };

    const wrapper = mount(MainWrapper, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        stubs: ["RouterView"],
      },
    });

    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(wrapper.findComponent(TheMainNavbar).exists()).toBe(true);
    expect(wrapper.find("router-view-stub").exists()).toBe(true);
  });

  it("should redirect to login page when user is not connected", async () => {
    global.Storage.prototype.getItem = vi.fn((key) => {
      if (key === "user") return "";
      else if (key === "users") return users;
    });
    const mockRouter = {
      push: vi.fn(),
    };
    mount(MainWrapper, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        stubs: ["RouterView"],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/login");
  });
});
