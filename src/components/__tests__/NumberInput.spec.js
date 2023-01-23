import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NumberInput from "../NumberInput.vue";

describe("NumberInput", () => {
  const wrapper = mount(NumberInput, {
    props: {
      label: "Numbers of days",
      placeholder: "Enter the Numbers of days",
      modelValue: 10,
      readonly: false,
    },
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the awaitted label", () => {
    expect(wrapper.find("label").text()).toBe("Numbers of days");
  });

  it("should display the awaitted number", () => {
    expect(wrapper.find("input").element.placeholder).toBe(
      "Enter the Numbers of days"
    );
  });

  it("should display the awaited placeholder", () => {
    expect(wrapper.find("input").attributes('placeholder')).toBe(
      "Enter the Numbers of days"
    );
  });
});
