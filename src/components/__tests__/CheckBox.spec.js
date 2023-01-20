import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import CheckBox from "../CheckBox.vue";

describe("CheckBox", () => {
  const wrapper = mount(CheckBox, {
    props: {
      label: "Check me",
      modelValue: false,
    },
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have the correct label", () => {
    expect(wrapper.find("label").text()).toBe("Check me");
  });

  it("should choose a value", async () => {
    await wrapper.find("input").setValue(true);

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue").length).toBe(1);
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(true);
  });
});
