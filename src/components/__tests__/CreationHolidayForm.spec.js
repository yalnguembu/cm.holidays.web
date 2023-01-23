import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import CreationHolidayForm from "../CreationHolidayForm.vue";
import BaseButton from "../BaseButton.vue";
import DateInput from "../DateInput.vue";
import SelectInput from "../SelectInput.vue";
import NumberInput from "../NumberInput.vue";
import TextArea from "../TextArea.vue";

let wrapper;

describe("CreationHolidayForm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const date = new Date("2023-01-17");
    vi.setSystemTime(date);
    wrapper = mount(CreationHolidayForm);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the correct title", () => {
    expect(wrapper.find('[data-test="form-title"]').text()).toBe(
      "Create a holiday"
    );
  });

  it("should display the type field", () => {
    const selectInput = wrapper.findComponent(SelectInput);
    expect(selectInput.exists()).toBe(true);
    expect(selectInput.props().label).toBe("Type");
    expect(selectInput.props().options).toEqual([
      "Choose your holiday's type...",
      "Annual",
      "Maternite",
      "Abscence",
      "christmas",
    ]);
    expect(selectInput.props().modelValue).toBe(
      "Choose your holiday's type..."
    );
    expect(selectInput.props().error).toBe("");
  });

  it("should display the start, end, and return date field", () => {
    expect(wrapper.findAllComponents(DateInput).length).toBe(3);
  });

  it("should display the start date field", () => {
    const startingDateInput = wrapper.findAllComponents(DateInput)[0];
    expect(startingDateInput.props()).toEqual({
      modelValue: "",
      placeholder: "Date",
      label: "Starting date",
      name: "starting-date",
      error: "",
      readonly: false,
    });
  });

  it("should display the end date field", () => {
    const endingDateInput = wrapper.findAllComponents(DateInput)[1];
    expect(endingDateInput.props()).toEqual({
      modelValue: "",
      placeholder: "Date",
      label: "Ending date",
      name: "ending-date",
      error: "",
      readonly: false,
    });
  });

  it("should display the return date field", () => {
    const returningDateInput = wrapper.findAllComponents(DateInput)[2];
    expect(returningDateInput.props()).toEqual({
      modelValue: "",
      placeholder: "Date",
      label: "Returning date",
      name: "returning-date",
      error: "",
      readonly: false,
    });
  });

  it("should display the number of day field", () => {
    const numberOfDays = wrapper.findComponent(NumberInput);
    expect(numberOfDays.exists()).toBe(true);
    expect(numberOfDays.props()).toEqual({
      modelValue: "",
      placeholder: "Number of days",
      label: "Number of day",
      readonly: false,
    });
  });

  it("should display the description field", () => {
    const description = wrapper.findComponent(TextArea);
    expect(description.exists()).toBe(true);
    expect(description.props()).toEqual({
      modelValue: "",
      placeholder: "Enter the description",
      label: "Description",
      error: "",
    });
  });

  it("should display the submit button", () => {
    const submitButton = wrapper.findComponent(BaseButton);
    expect(submitButton.exists()).toBe(true);
    expect(submitButton.props()).toEqual({ title: "SUBMIT" });
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

describe("Failling cases", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const date = new Date("2023-01-17");
    vi.setSystemTime(date);
    wrapper = mount(CreationHolidayForm);
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it("should not display the error message if he pass a date greater than today's to the start date field", async () => {
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
    ).toBe("It must be after starting date");
  });
});

describe("individuals", () => {
  let selectInput, startingDateInput, endingDateInput, description;

  beforeEach(() => {
    vi.useFakeTimers();
    const date = new Date("2023-01-17");
    vi.setSystemTime(date);
    wrapper = mount(CreationHolidayForm);

    selectInput = wrapper.findComponent(SelectInput);
    startingDateInput = wrapper.findAllComponents(DateInput)[0];
    endingDateInput = wrapper.findAllComponents(DateInput)[1];
    description = wrapper.findComponent(TextArea);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shoud display the awaitted error if all fields are input except holiday type", async () => {
    await startingDateInput.setValue("2023-01-20");
    await endingDateInput.setValue("2023-01-25");
    await description.setValue("2023-01-20");
    await wrapper.find('[data-test="creation-form"]').trigger("submit");

    expect(selectInput.props().error).toBe("This field is required");
  });

  it("shoud display the awaitted error if all fields are input except start date", async () => {
    await selectInput.setValue("Annual");
    await endingDateInput.setValue("2023-01-25");
    await description.setValue("2023-01-20");
    await wrapper.find('[data-test="creation-form"]').trigger("submit");

    expect(startingDateInput.props().error).toBe("This field is required");
  });

  it("shoud display the awaitted error if all fields are input except end date", async () => {
    await selectInput.setValue("Annual");
    await startingDateInput.setValue("2023-01-20");
    await description.setValue("2023-01-20");
    await wrapper.find('[data-test="creation-form"]').trigger("submit");

    expect(endingDateInput.props().error).toBe(
      "It must be after starting date"
    );
  });

  it("shoud display the awaitted error if all fields are input except description", async () => {
    await selectInput.setValue("Annual");
    await startingDateInput.setValue("2023-01-20");
    await endingDateInput.setValue("2023-01-25");
    // await description.setValue("2023-01-20");
    await wrapper.find('[data-test="creation-form"]').trigger("submit");

    expect(description.props().error).toBe("This field is required");
  });

  it("shoud display the awaitted error if all fields are input but start date is wrong", async () => {
    await selectInput.setValue("Annual");
    await startingDateInput.setValue("2023-01-15");
    await endingDateInput.setValue("2023-01-25");
    await description.setValue("2023-01-20");
    await wrapper.find('[data-test="creation-form"]').trigger("submit");

    expect(startingDateInput.props().error).toBe("It must be after today");
  });

  it("shoud display the awaitted error if all fields are input but end date is wrong", async () => {
    await selectInput.setValue("Annual");
    await startingDateInput.setValue("2023-01-20");
    await endingDateInput.setValue("2023-01-19");
    await description.setValue("2023-01-20");
    await wrapper.find('[data-test="creation-form"]').trigger("submit");

    expect(endingDateInput.props().error).toBe(
      "It must be after starting date"
    );
  });

  it("shoud display the awaitted error if all fields are empty and start and end date are wrong", async () => {
    await startingDateInput.setValue("2023-01-10");
    await endingDateInput.setValue("2023-01-16");
    await wrapper.find('[data-test="creation-form"]').trigger("submit");

    expect(selectInput.props().error).toBe(
      "This field is required"
    );
    expect(startingDateInput.props().error).toBe(
      "It must be after today"
    );
    expect(description.props().error).toBe(
      "This field is required"
    );
  });

});
