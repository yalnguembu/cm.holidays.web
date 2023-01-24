import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AuthenticationNavbar from "../AuthenticationNavbar.vue";

describe("AuthenticationNavbar", () => {
  const wrapper = mount(AuthenticationNavbar);

  it("Should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Should display the awaited title", () => {
    expect(wrapper.find("h2").text()).toBe("Logo");
  });
});
