import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ErrorAlert from "../ErrorAlert.vue";
import InfoIcon from "../icons/InfoIcon.vue"

describe("ErrorAlert", () => {
  const wrapper = mount(ErrorAlert, {
    props: { title: "Invalid crudential" },
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });
  
  it("should display the alert message", () => {
    expect(wrapper.text()).toBe("Invalid crudential");
  });
  
  it("should display the alert information icon", () => {
    expect(wrapper.findComponent(InfoIcon).exists()).toBe(true);
  });
});
