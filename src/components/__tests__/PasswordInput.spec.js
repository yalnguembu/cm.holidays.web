import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import PasswordInput from "../PasswordInput.vue";

describe("PasswordInput", () => {
  const wrapper = mount(PasswordInput, {
    props: {
      label: "Password",
      placeholder: "Enter your Password",
      error: "",
      modelValue: "",
    },
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the correct label", () => {
    expect(wrapper.find("label").text()).toBe("Password");
  });

  it("should display the password input", () => {
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("should display the correct placeholder inside the password input", () => {
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("should display the error message",async () => {
   await  wrapper.setProps({
      error: "This field is required",
    });
    
    expect(
      wrapper.find('[data-test="password-input-text-error"]').exists()
    ).toBe(true);
    expect(wrapper.find('[data-test="password-input-text-error"]').text()).toBe(
      "This field is required"
    );
    expect(wrapper.find("div").classes("border-red-500")).toBe(true);
  });

  it("should input the password", async () => {
    await wrapper.find("input").setValue("Hello");
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue").length).toBe(1);
    expect(wrapper.emitted("update:modelValue")[0][0]).toEqual("Hello");
  });
});
