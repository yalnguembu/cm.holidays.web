import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import CreationHolidayForm from "../CreationHolidayForm.vue";
import BaseButton from "../BaseButton.vue";
import DateInput from "../DateInput.vue";
import SelectInput from "../SelectInput.vue";
import NumberInput from "../NumberInput.vue";
import TextArea from "../TextArea.vue";

describe("CreationHolidayForm", () => {
  let wrapper;
  //   holidayTypeInput,
  //   startingDateInput,
  //   endingDateInput,
  //   numberOfDaysInput,
  //   returningDateInput,
  //   submitButton,
  //   description;

  beforeEach(() => {
    vi.useFakeTimers();
    const date = new Date("2023-01-17");
    vi.setSystemTime(date);
    wrapper = mount(CreationHolidayForm);

    // holidayTypeInput = wrapper.findComponent(SelectInput);
    // startingDateInput = wrapper.findAllComponents(DateInput)[0];
    // endingDateInput = wrapper.findAllComponents(DateInput)[1];
    // numberOfDaysInput = wrapper.findComponent(NumberInput);
    // returningDateInput = wrapper.findAllComponents(DateInput)[2];
    // description = wrapper.findComponent(TextArea);
    // submitButton = wrapper.findComponent(BaseButton);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have the awaited title", () => {
    expect(wrapper.find('[data-test="form-title"]').text()).toBe(
      "Create a holiday"
    );
  });

  it("should have the holiday type field", () => {
    const holidayTypeInput = wrapper.findComponent(SelectInput);

    expect(holidayTypeInput.exists()).toBe(true);
    expect(holidayTypeInput.props().label).toBe("Type");
    expect(holidayTypeInput.props().options).toEqual([
      "Annual",
      "Maternite",
      "Abscence",
      "christmas",
    ]);
  });

  it("should have the awaited placeholder in holliday type field", () => {
    const holidayTypeInput = wrapper.findComponent(SelectInput);
    expect(holidayTypeInput.props().placeholder).toBe(
      "Choose your holiday's type..."
    );
  });

  it("should have the start date field", () => {
    const startingDateInput = wrapper.findAllComponents(DateInput)[0];

    expect(startingDateInput.exists()).toBe(true);
    expect(startingDateInput.props()).toEqual({
      modelValue: "",
      placeholder: "Date",
      label: "Starting date",
      error: "",
      readonly: false,
    });
  });

  it("should have the end date field", () => {
    const endingDateInput = wrapper.findAllComponents(DateInput)[1];

    expect(endingDateInput.exists()).toBe(true);
    expect(endingDateInput.props()).toEqual({
      modelValue: "",
      placeholder: "Date",
      label: "Ending date",
      error: "",
      readonly: false,
    });
  });

  it("should have the return date field", () => {
    const returningDateInput = wrapper.findAllComponents(DateInput)[2];

    expect(returningDateInput.exists()).toBe(true);
    expect(returningDateInput.props()).toEqual({
      modelValue: "",
      placeholder: "Date",
      label: "Returning date",
      error: "",
      readonly: false,
    });
  });

  it("should have the number of day field", () => {
    const numberOfDaysInput = wrapper.findComponent(NumberInput);

    expect(numberOfDaysInput.exists()).toBe(true);
    expect(numberOfDaysInput.props()).toEqual({
      modelValue: "",
      placeholder: "Number of days",
      label: "Number of day",
      readonly: false,
    });
  });

  it("should have the description field", () => {
    const description = wrapper.findComponent(TextArea);

    expect(description.exists()).toBe(true);
    expect(description.props()).toEqual({
      modelValue: "",
      placeholder: "Enter the description",
      label: "Description",
      error: "",
    });
  });

  it("should have the creation button", () => {
    const submitButton = wrapper.findComponent(BaseButton);

    expect(submitButton.exists()).toBe(true);
    expect(submitButton.text()).toBe("SUBMIT");
  });

  it("should display the number of days if start date and end date are filled", async () => {
    const startingDateInput = wrapper.findAllComponents(DateInput)[0];
    const endingDateInput = wrapper.findAllComponents(DateInput)[1];
    const numberOfDaysInput = wrapper.findComponent(NumberInput);

    await startingDateInput.setValue("2023-01-20");
    await endingDateInput.setValue("2023-01-28");

    expect(numberOfDaysInput.props().modelValue).toBe(8);
  });

  it("should display the return date if end date is filled", async () => {
    const endingDateInput = wrapper.findAllComponents(DateInput)[1];
    const returningDateInput = wrapper.findAllComponents(DateInput)[2];

    await endingDateInput.setValue("2023-01-24");
    expect(returningDateInput.props().modelValue).toBe("2023-01-24");
  });

  it("should set the return date to the next working day if it falls on a non-working day", async () => {
    const startingDateInput = wrapper.findAllComponents(DateInput)[0];
    const endingDateInput = wrapper.findAllComponents(DateInput)[1];
    const returningDateInput = wrapper.findAllComponents(DateInput)[2];

    await startingDateInput.setValue("2023-01-20");
    await endingDateInput.setValue("2023-01-28");

    expect(returningDateInput.props().modelValue).toBe("2023-01-30");

    await startingDateInput.setValue("2023-01-20");
    await endingDateInput.setValue("2023-01-29");

    expect(returningDateInput.props().modelValue).toBe("2023-01-30");
  });

  it("should create holiday when every fields are filled correctly", async () => {
    const holidayTypeInput = wrapper.findComponent(SelectInput);
    const startingDateInput = wrapper.findAllComponents(DateInput)[0];
    const endingDateInput = wrapper.findAllComponents(DateInput)[1];
    const description = wrapper.findComponent(TextArea);

    await holidayTypeInput.setValue("Annual");
    await startingDateInput.setValue("2023-01-20");
    await endingDateInput.setValue("2023-01-29");
    await description.setValue(
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati molestias"
    );
    await wrapper.find('[data-test="creation-form"]').trigger("submit");
    expect(wrapper.emitted()).toHaveProperty("close");
  });

  describe("Failling cases", () => {
    it("should display the awaited errors messages if the form is submit empty", async () => {
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(
        wrapper.find('[data-test="select-input-text-error"]').exists()
      ).toBe(true);
      expect(
        wrapper.findAll('[data-test="date-input-text-error"]').length
      ).toBe(2);
      expect(
        wrapper.find('[data-test="textarea-input-text-error"]').exists()
      ).toBe(true);
    });

    it("should display the awaited error message if the start date is lower than today's", async () => {
      await wrapper
        .find('[data-test="starting-date"] input')
        .setValue("2023-01-08");
      expect(
        wrapper
          .find(
            '[data-test="starting-date"] [data-test="date-input-text-error"]'
          )
          .exists()
      ).toBe(true);
      expect(
        wrapper
          .find(
            '[data-test="starting-date"] [data-test="date-input-text-error"]'
          )
          .text()
      ).toBe("It must be after today");
    });

    it("should display the awaited error message if the end date is lower than the starting date", async () => {
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

    it("shoud display the awaited error if all fields are filled except holiday type", async () => {
      const holidayTypeInput = wrapper.findComponent(SelectInput);
      const startingDateInput = wrapper.findAllComponents(DateInput)[0];
      const endingDateInput = wrapper.findAllComponents(DateInput)[1];
      const description = wrapper.findComponent(TextArea);
      await startingDateInput.setValue("2023-01-20");
      await endingDateInput.setValue("2023-01-25");
      await description.setValue("2023-01-20");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(holidayTypeInput.props().error).toBe("This field is required");
    });

    it("shoud display the awaited error if all fields are filled except start date", async () => {
      const holidayTypeInput = wrapper.findComponent(SelectInput);
      const startingDateInput = wrapper.findAllComponents(DateInput)[0];
      const endingDateInput = wrapper.findAllComponents(DateInput)[1];
      const description = wrapper.findComponent(TextArea);

      await holidayTypeInput.setValue("Annual");
      await endingDateInput.setValue("2023-01-25");
      await description.setValue("2023-01-20");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(startingDateInput.props().error).toBe("This field is required");
    });

    it("shoud display the awaited error if all fields are filled except end date", async () => {
      const holidayTypeInput = wrapper.findComponent(SelectInput);
      const startingDateInput = wrapper.findAllComponents(DateInput)[0];
      const endingDateInput = wrapper.findAllComponents(DateInput)[1];
      const description = wrapper.findComponent(TextArea);

      await holidayTypeInput.setValue("Annual");
      await startingDateInput.setValue("2023-01-20");
      await description.setValue("2023-01-20");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(endingDateInput.props().error).toBe(
        "It must be after starting date"
      );
    });

    it("shoud display the awaited error if all fields are filled except description", async () => {
      const holidayTypeInput = wrapper.findComponent(SelectInput);
      const startingDateInput = wrapper.findAllComponents(DateInput)[0];
      const endingDateInput = wrapper.findAllComponents(DateInput)[1];
      const description = wrapper.findComponent(TextArea);

      await holidayTypeInput.setValue("Annual");
      await startingDateInput.setValue("2023-01-20");
      await endingDateInput.setValue("2023-01-25");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(description.props().error).toBe("This field is required");
    });

    it("shoud display the awaited error if all fields are filled but start date is wrong", async () => {
      const holidayTypeInput = wrapper.findComponent(SelectInput);
      const startingDateInput = wrapper.findAllComponents(DateInput)[0];
      const endingDateInput = wrapper.findAllComponents(DateInput)[1];
      const description = wrapper.findComponent(TextArea);

      await holidayTypeInput.setValue("Annual");
      await startingDateInput.setValue("2023-01-15");
      await endingDateInput.setValue("2023-01-25");
      await description.setValue("2023-01-20");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(startingDateInput.props().error).toBe("It must be after today");
    });

    it("shoud display the awaited error if all fields are filled but end date is wrong", async () => {
      const holidayTypeInput = wrapper.findComponent(SelectInput);
      const startingDateInput = wrapper.findAllComponents(DateInput)[0];
      const endingDateInput = wrapper.findAllComponents(DateInput)[1];
      const description = wrapper.findComponent(TextArea);

      await holidayTypeInput.setValue("Annual");
      await startingDateInput.setValue("2023-01-20");
      await endingDateInput.setValue("2023-01-19");
      await description.setValue("2023-01-20");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(endingDateInput.props().error).toBe(
        "It must be after starting date"
      );
    });

    it("shoud display the awaited error if all fields are empty and start and end date are wrong", async () => {
      const holidayTypeInput = wrapper.findComponent(SelectInput);
      const startingDateInput = wrapper.findAllComponents(DateInput)[0];
      const endingDateInput = wrapper.findAllComponents(DateInput)[1];
      const description = wrapper.findComponent(TextArea);

      await startingDateInput.setValue("2023-01-10");
      await endingDateInput.setValue("2023-01-16");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(holidayTypeInput.props().error).toBe("This field is required");
      expect(startingDateInput.props().error).toBe("It must be after today");
      expect(description.props().error).toBe("This field is required");
    });
  });
});
