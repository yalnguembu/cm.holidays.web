import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SelectInput from "../SelectInput.vue";

describe("SelectInput", () => {
  const wrapper = mount(SelectInput, {
    props:  {
      label: "Holidays",
      modelValue: "Choose holidays type",
      error: "",
      options: ["Choose holidays type", "maternite"],
    },
  });

  it("should render correctly", () => {
    expect(wrapper.exists("option")).toBe(true);
  });

  it("should display the awaited options", () => {
    const options = wrapper.findAll("option");
    expect(options[0].text()).toBe("Choose holidays type");
    expect(options[1].text()).toBe("maternite");
  });

  it("should display the error message", async () => {
    expect(
      wrapper.find('[data-test="password-input-text-error"]').exists()
    ).toBe(false);
    
    await wrapper.setProps({ error: "This field is required" });

    expect(wrapper.find('[data-test="select-input-text-error"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-test="select-input-text-error"]').text()).toBe(
      "This field is required"
    );
    expect(wrapper.find("select").classes("border-red-500")).toBe(true);
  });

  it("shouldshould have the awaited emit after the value was selected", async () => {
    await wrapper.find("select").setValue("Annual");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue").length).toBe(1);
    expect(wrapper.find("select").element._value).toBe("Choose holidays type")
  });
});
