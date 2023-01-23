import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CreationHolidayButton from "../CreationHolidayButton.vue";
import AddIcon from '../icons/AddIcon.vue'

describe("CreationHolidayButton", () => {
  const wrapper = mount(CreationHolidayButton);

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the awaitted title", () => {
    expect(wrapper.text()).toBe("New holiday");
  });

  it("should display the add icon", () => {
    expect(wrapper.findComponent(AddIcon).exists()).toBe(true);
  });
});
