import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AuthenticationWrapper from "../AuthenticationWrapper.vue";
import AuthenticationNavbar from "../AuthenticationNavbar.vue";

describe("AuthenticationWrapper", () => {
  const wrapper = mount(AuthenticationWrapper, {
    global: { stubs: ["RouterView"] },
  });

  it("shoud render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the navbar", () => {
    expect(wrapper.findComponent(AuthenticationNavbar).exists()).toBe(true);
  });

  it("should display the `RouterView`", () => {
    expect(wrapper.find('router-view-stub').exists()).toBe(true);
  });
});
