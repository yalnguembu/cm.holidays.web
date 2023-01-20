import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import DateInput from "../DateInput.vue";
import AgendaIcon from "../icons/AgendaIcon.vue"

describe("DateInput", () => {
  const wrapper = mount(DateInput, {
    props: {
      label: "Starting date",
      placeholder: "Date",
      name: "date",
      modelValue: "",
      readonly: false,
      error: "",
    },
  });


  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the correct label", () => {
    expect(wrapper.find("label").text()).toBe("Starting date");
  });

  it("should display a date input", () => {
    expect(wrapper.find("input").element.placeholder).toBe("Date");
  });

  it("should display the agenda icon", () => {
    expect(wrapper.findComponent(AgendaIcon).exists()).toBe(true);
  });

  it("should display the error message", async () => {
    expect(wrapper.find('[data-test="date-input-text-error"]').exists()).toBe(
      false
    );

    await wrapper.setProps({
      error: "This field is required",
    });

    expect(wrapper.find('[data-test="date-input-text-error"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-test="date-input-text-error"]').text()).toBe(
      "This field is required"
    );
    expect(wrapper.find("div").classes("border-red-500")).toBe(true);
  });

  it("should input the date", async () => {
    await  wrapper.find("input").setValue("2023-01-17");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue").length).toBe(1);
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe("2023-01-17");
  });

});
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import DateInput from "../DateInput.vue";
import AgendaIcon from "../icons/AgendaIcon.vue"

describe("DateInput", () => {
  const wrapper = mount(DateInput, {
    props: {
      label: "Starting date",
      placeholder: "Date",
      name: "date",
      modelValue: "",
      readonly: false,
      error: "",
    },
  });


  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the correct label", () => {
    expect(wrapper.find("label").text()).toBe("Starting date");
  });

  it("should display a date input", () => {
    expect(wrapper.find("input").element.placeholder).toBe("Date");
  });

  it("should display the agenda icon", () => {
    expect(wrapper.findComponent(AgendaIcon).exists()).toBe(true);
  });

  it("should display the error message", async () => {
    await wrapper.setProps({
      error: "This field is required",
    });

    expect(wrapper.find('[data-test="date-input-text-error"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-test="date-input-text-error"]').text()).toBe(
      "This field is required"
    );
    expect(wrapper.find("div").classes("border-red-500")).toBe(true);
  });

  it("should input the date", async () => {
    await  wrapper.find("input").setValue("2023-01-17");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue").length).toBe(1);
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe("2023-01-17");
  });

});
