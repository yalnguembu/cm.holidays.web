import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SelectInput from "@/components/forms/SelectInput.vue";

describe("SelectInput", () => {
  const options = ["Annual", "Maternite", "Christmas"];
  const wrapper = mount(SelectInput, {
    props: {
      label: "Holidays",
      modelValue: "",
      error: "",
      defaultOption: "Choose holidays type",
      options: options,
    },
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the awaited options", () => {
    wrapper.findAll('[data-test="select-option"]').map((option, index) => {
      expect(option.text()).toBe(options[index]);
    });
  });
  it("should have the default option", () => {
    expect(wrapper.find('[data-test="default-option"]').text()).toBe(
      "Choose holidays type"
    );
  });

  it("should display the awaited error message and the awaited design", async () => {
    expect(wrapper.find('[data-test="select-input-text-error"]').exists()).toBe(
      false
    );

    await wrapper.setProps({ error: "This field is required" });

    expect(wrapper.find('[data-test="select-input-text-error"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-test="select-input-text-error"]').text()).toBe(
      "This field is required"
    );
    expect(wrapper.find("select").classes("border-red-500")).toBe(true);
  });

  it("should have the awaited emit after the value was selected", async () => {
    await wrapper
      .findAll('[data-test="select-option"]')
      .at(1)
      .trigger("change");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue").length).toBe(1);
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe("Maternite");
  });
});
