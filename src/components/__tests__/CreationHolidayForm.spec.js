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
    expect(wrapper.findComponent(SelectInput).props().placeholder).toBe(
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
    await wrapper.findAllComponents(DateInput)[0].setValue("2023-01-20");
    await wrapper.findAllComponents(DateInput)[1].setValue("2023-01-28");

    expect(wrapper.findComponent(NumberInput).props().modelValue).toBe(8);
  });

  it("should display the return date if end date is filled", async () => {
    await wrapper.findAllComponents(DateInput)[1].setValue("2023-01-24");
    expect(wrapper.findAllComponents(DateInput)[2].props().modelValue).toBe(
      "2023-01-24"
    );
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
    await wrapper.findComponent(SelectInput).setValue("Annual");
    await wrapper.findAllComponents(DateInput)[0].setValue("2023-01-20");
    await wrapper.findAllComponents(DateInput)[1].setValue("2023-01-29");
    await wrapper
      .findComponent(TextArea)
      .setValue(
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati molestias"
      );
    await wrapper.find('[data-test="creation-form"]').trigger("submit");
    expect(wrapper.emitted()).toHaveProperty("close");
  });

  describe("Failling cases", () => {
    it("should display the awaited errors messages if the form is submit empty", async () => {
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(wrapper.findComponent(SelectInput).props("error")).toBe(
        "This field is required"
      );
      expect(wrapper.findAllComponents(DateInput)[0].props("error")).toBe(
        "This field is required"
      );
      expect(wrapper.findAllComponents(DateInput)[1].props("error")).toBe(
        "This field is required"
      );
      expect(wrapper.findComponent(TextArea).props("error")).toBe(
        "This field is required"
      );
    });

    it("should display the awaited error message if the start date is lower than today's", async () => {
      const startingDate = wrapper.findAllComponents(DateInput)[0];

      await startingDate.setValue("2023-01-08");

      expect(startingDate.props("error")).toBe("It must be after today");
    });

    it("should display the awaited error message if the end date is lower than the starting date", async () => {
      const endingDate = wrapper.findAllComponents(DateInput)[1];

      await wrapper.findAllComponents(DateInput)[0].setValue("2023-02-02");
      await endingDate.setValue("2023-01-08");

      expect(endingDate.props("error")).toBe("It must be after starting date");
    });

    it("shoud display the awaited error if all fields are filled except holiday type", async () => {
      await wrapper.findAllComponents(DateInput)[0].setValue("2023-01-20");
      await wrapper.findAllComponents(DateInput)[1].setValue("2023-01-25");
      await wrapper.findComponent(TextArea).setValue("2023-01-20");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(wrapper.findComponent(SelectInput).props().error).toBe(
        "This field is required"
      );
    });

    it("shoud display the awaited error if all fields are filled except start date", async () => {
      await wrapper.findComponent(SelectInput).setValue("Annual");
      await wrapper.findAllComponents(DateInput)[1].setValue("2023-01-25");
      await wrapper.findComponent(TextArea).setValue("2023-01-20");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(wrapper.findAllComponents(DateInput)[0].props().error).toBe(
        "This field is required"
      );
    });

    it("shoud display the awaited error if all fields are filled except end date", async () => {
      await wrapper.findComponent(SelectInput).setValue("Annual");
      await wrapper.findAllComponents(DateInput)[0].setValue("2023-01-20");
      await wrapper.findComponent(TextArea).setValue("I'm ill");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(wrapper.findAllComponents(DateInput)[1].props().error).toBe(
        "It must be after starting date"
      );
    });

    it("shoud display the awaited error if all fields are filled except description", async () => {
      await wrapper.findComponent(SelectInput).setValue("Annual");
      await wrapper.findAllComponents(DateInput)[0].setValue("2023-01-20");
      await wrapper.findAllComponents(DateInput)[1].setValue("2023-01-25");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(wrapper.findComponent(TextArea).props().error).toBe(
        "This field is required"
      );
    });

    it("shoud display the awaited error if all fields are filled but start date is wrong", async () => {
      const startingDateInput = wrapper.findAllComponents(DateInput)[0];

      await wrapper.findComponent(SelectInput).setValue("Annual");
      await startingDateInput.setValue("2023-01-15");
      await wrapper.findAllComponents(DateInput)[1].setValue("2023-01-25");
      await wrapper.findComponent(TextArea).setValue("2023-01-20");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(startingDateInput.props().error).toBe("It must be after today");
    });

    it("shoud display the awaited error if all fields are filled but end date is wrong", async () => {
      const endingDateInput = wrapper.findAllComponents(DateInput)[1];

      await wrapper.findComponent(SelectInput).setValue("Annual");
      await wrapper.findAllComponents(DateInput)[0].setValue("2023-01-20");
      await endingDateInput.setValue("2023-01-19");
      await wrapper.findComponent(TextArea).setValue("2023-01-20");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(endingDateInput.props().error).toBe(
        "It must be after starting date"
      );
    });

    it("shoud display the awaited error if all fields are empty and start and end date are wrong", async () => {
      const startingDateInput = wrapper.findAllComponents(DateInput)[0];
      const endingDateInput = wrapper.findAllComponents(DateInput)[1];

      await startingDateInput.setValue("2023-01-10");
      await endingDateInput.setValue("2023-01-16");
      await wrapper.find('[data-test="creation-form"]').trigger("submit");

      expect(wrapper.findComponent(SelectInput).props().error).toBe(
        "This field is required"
      );
      expect(startingDateInput.props().error).toBe("It must be after today");
      expect(wrapper.findComponent(TextArea).props().error).toBe(
        "This field is required"
      );
    });
  });
});
