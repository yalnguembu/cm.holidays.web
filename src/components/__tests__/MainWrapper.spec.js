import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MainWrapper from "../MainWrapper.vue";
import TheMainNavbar from "../TheMainNavbar.vue";

describe("MainWrapper", () => {
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

  let wrapper, push;
  beforeEach(() => {
    global.Storage.prototype.getItem = vi.fn((key) => {
      if (key === "user") {
        return '{ "email": "user@lao-sarl.cm" }';
      } else if (key === "users") {
        return users;
      }
    });
    vi.mock("vue-router", () => ({
      useRoute: vi.fn(),
      useRouter: vi.fn(() => ({
        push: () => {},
      })),
    }));

    push = vi.fn();

    useRouter.mockImplementationOnce(() => ({
      push,
    }));

    wrapper = mount(MainWrapper, {
      global: {
        stubs: ["RouterView"],
      },
    });
  });

  afterEach(() => {
    global.Storage.prototype.getItem.mockReset();
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the `RouterView` if an user is connected", () => {
    expect(push).not.toHaveBeenCalled();
    expect(wrapper.findComponent(TheMainNavbar).exists()).toBe(true);
    expect(wrapper.find("router-view-stub").exists()).toBe(true);
  });

  it("should redirect to login page when user is not connected", () => {
    global.Storage.prototype.getItem = vi.fn((key) => {
      if (key === "user") return "";
      else if (key === "users") return users;
    });

    vi.mock("vue-router", () => ({
      useRoute: vi.fn(),
      useRouter: vi.fn(() => ({
        push: () => {},
      })),
    }));

    push = vi.fn();

    useRouter.mockImplementationOnce(() => ({
      push,
    }));

    wrapper = mount(MainWrapper, {
      global: {
        stubs: ["RouterView"],
      },
    });
    mount(MainWrapper, {
      global: {
        stubs: ["RouterView"],
      },
    });

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/login");
  });
});
