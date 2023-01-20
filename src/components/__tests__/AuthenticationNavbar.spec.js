import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AuthenticationNavbar from "../AuthenticationNavbar.vue";

describe("AuthenticationNavbar", () => {

  it("Should render correctly", () => {
    const wrapper = mount(AuthenticationNavbar);
    expect(wrapper.exists()).toBe(true);
  });

  it("Should contain the text logo", () => {
    const wrapper = mount(AuthenticationNavbar);

    expect(wrapper.find("h2").text()).toBe("Logo");
  });

});
