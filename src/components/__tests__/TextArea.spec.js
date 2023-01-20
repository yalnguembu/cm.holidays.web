import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TextArea from "../TextArea.vue";

describe("TextArea", () => {
  const wrapper = mount(TextArea, {
    props: {
      label: "The label",
      placeholder: "Enter the description",
      error: "",
    },
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the correct label", () => {
    expect(wrapper.find("label").text()).toBe("The label");
  });

  it("should display the correct placeholder in the field", () => {
    expect(wrapper.find("label").text()).toBe("The label");
    expect(wrapper.find("textarea").attributes("placeholder")).toBe(
      "Enter the description"
    );
  });

  it("should display the error message", async () => {
    await wrapper.setProps({ error: "This field is required" });

    expect(
      wrapper.find('[data-test="textarea-input-text-error"]').exists()
    ).toBe(true);
    expect(wrapper.find('[data-test="textarea-input-text-error"]').text()).toBe(
      "This field is required"
    );
    expect(wrapper.find("textarea").classes("border-red-500")).toBe(true);
  });

  it("should manage the text input", async () => {
    await wrapper.find("textarea").setValue("descriptive text");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue").length).toBe(1);
    expect(wrapper.emitted("update:modelValue")[0][0]).toEqual(
      "descriptive text"
    );
  });
});
