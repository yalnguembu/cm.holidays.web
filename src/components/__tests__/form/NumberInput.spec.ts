import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NumberInput from "@/components/forms/NumberInput.vue";

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

  it("should have the awaited label", () => {
    expect(wrapper.find("label").text()).toBe("Numbers of days");
  });

  it("should have the awaited placeholder", () => {
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      "Enter the Numbers of days"
    );
  });

  it("should display the awaited value", () => {
    expect(wrapper.find("input").element.value).toBe(10);
  });
});
