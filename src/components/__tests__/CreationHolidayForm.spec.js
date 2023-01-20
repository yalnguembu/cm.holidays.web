import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import CreationHolidayForm from "../CreationHolidayForm.vue";
import BaseButton from "../BaseButton.vue";
import DateInput from "../DateInput.vue";
import SelectInput from "../SelectInput.vue";
import NumberInput from "../NumberInput.vue";
import TextArea from "../TextArea.vue";

describe("CreationHolidayForm", () => {
  // beforeEach(() => {
  //   vi.useFakeTimers();
  //   // vi.setSystemTime(date);
  // });

  // afterEach(() => {
  //   vi.useRealTimers();
  // });

  const date = new Date("2023-01-17");
  vi.setSystemTime(date);
  const wrapper = mount(CreationHolidayForm);

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the correct title", () => {
    expect(wrapper.find('[data-test="form-title"]').text()).toBe(
      "Create a holiday"
    );
  });

  it("should display the type field", () => {
    expect(wrapper.findComponent(SelectInput).exists()).toBe(true);
  });

  it("should display the end, date, return field", () => {
    expect(wrapper.findAllComponents(DateInput).length).toBe(3);
  });

  it("should display the number of day field", () => {
    expect(wrapper.findComponent(NumberInput).exists()).toBe(true);
  });

  it("should display the description field", () => {
    expect(wrapper.findComponent(TextArea).exists()).toBe(true);
  });

  it("should display the submit button", () => {
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
  });

  it("should shows errors messages if we submit the form empty", async () => {
    await wrapper.find('[data-test="creation-form"]').trigger("submit");

    expect(wrapper.find('[data-test="select-input-text-error"]').exists()).toBe(
      true
    );
    expect(wrapper.findAll('[data-test="date-input-text-error"]').length).toBe(
      2
    );
    expect(
      wrapper.find('[data-test="textarea-input-text-error"]').exists()
    ).toBe(true);
  });

  it("should display the error message if he pass a date lower than today's to the start date field", async () => {
    await wrapper
      .find('[data-test="starting-date"] input')
      .setValue("2023-01-08");
    expect(
      wrapper
        .find('[data-test="starting-date"] [data-test="date-input-text-error"]')
        .exists()
    ).toBe(true);
    expect(
      wrapper
        .find('[data-test="starting-date"] [data-test="date-input-text-error"]')
        .text()
    ).toBe("It must be after today");
  });

  it("should display the error message if he pass a date greater than today's to the start date field", async () => {
    await wrapper
      .find('[data-test="starting-date"] input')
      .setValue("2023-01-28");

    expect(
      wrapper
        .find('[data-test="starting-date"] [data-test="date-input-text-error"]')
        .exists()
    ).toBe(false);
  });

  it("should display the error message if he pass a date lower than starting's to the end date field", async () => {
    await wrapper
      .find('[data-test="ending-date"] input')
      .setValue("2023-01-28");

    expect(
      wrapper
        .find('[data-test="ending-date"] [data-test="date-input-text-error"]')
        .exists()
    ).toBe(true);
    expect(
      wrapper
        .find('[data-test="ending-date"] [data-test="date-input-text-error"]')
        .text()
    ).toBe("It nust be after starting date");
  });

  it("should display the number of days if start date and end date are fields", async () => {
    const startingDateInput = wrapper.find('[data-test="starting-date"] input');
    const endingDateInput = wrapper.find('[data-test="ending-date"] input');
    const numberOfDays = wrapper.find('[data-test="number-of-days"] input');

    await startingDateInput.setValue("2023-01-20");

    await endingDateInput.setValue("2023-01-28");
    expect(numberOfDays.element.value).toBe(8);
  });

  it("should display the return date if end date field is not empty", async () => {
    const endingDateInput = wrapper.find('[data-test="ending-date"] input');
    const returningDate = wrapper.find('[data-test="returning-date"] input');

    await endingDateInput.setValue("2023-01-24");
    expect(returningDate.element.value).toBe("2023-01-24");
  });

  it("should set the return date to the next business day if it falls on a non-business day", async () => {
    const startingDateInput = wrapper.find('[data-test="starting-date"] input');
    const endingDateInput = wrapper.find('[data-test="ending-date"] input');
    const returningDate = wrapper.find('[data-test="returning-date"] input');

    await startingDateInput.setValue("2023-01-20");
    await endingDateInput.setValue("2023-01-28");

    expect(returningDate.element.value).toBe("2023-01-30");

    await startingDateInput.setValue("2023-01-20");
    await endingDateInput.setValue("2023-01-29");

    expect(returningDate.element.value).toBe("2023-01-30");
  });

  it("should create holiday when everythings is fiels", async () => {
    await wrapper.findComponent({ name: "SelectInput" }).setValue("Annual");
    await wrapper
      .find('[data-test="starting-date"] input')
      .setValue("2023-01-20");
    await wrapper
      .find('[data-test="ending-date"] input')
      .setValue("2023-01-29");
    await wrapper
      .find('[data-test="description"] textarea')
      .setValue(
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati molestias"
      );
    await wrapper.find('[data-test="creation-form"]').trigger("submit");
    expect(wrapper.emitted()).toHaveProperty("close");
  });
});
