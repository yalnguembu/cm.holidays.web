import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SelectInput from "../SelectInput.vue";

describe("SelectInput", () => {
  const options = ["Annual", "Maternite", "Christmas"];
  const wrapper = mount(SelectInput, {
    props: {
      label: "Holidays",
      modelValue: "",
      error: "",
      placeholder: "Choose holidays type",
      options: options,
    },
  });

  it("should render correctly", () => {
    expect(wrapper.exists("option")).toBe(true);
  });

  it("should display the awaited options", () => {
    wrapper.findAll("option").map((option, index) => {
      index > 0 ? expect(option.text()).toBe(options[index - 1]) : "";
    });
  });

  it("should display the awaited error message", async () => {
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
    const selectInput = wrapper.find("select");

    await selectInput.setValue("Maternite");
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue").length).toBe(1);
  });
});
