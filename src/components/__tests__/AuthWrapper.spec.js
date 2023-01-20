import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
// import { RouterView } from "vue-router";
import AuthenticationWrapper from "../AuthenticationWrapper.vue";
import AuthenticationNavbar from "../AuthenticationNavbar.vue";

describe("AuthenticationWrapper", () => {
  const wrapper = mount(AuthenticationWrapper);

  it("shoud render correctly", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should his child components", async () => {
    expect(wrapper.findComponent(AuthenticationNavbar).exists()).toBe(true);
    expect(wrapper.find("RouterView").exists()).toBe(true);
  });
});
