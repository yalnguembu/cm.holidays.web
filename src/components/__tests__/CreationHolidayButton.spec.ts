import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CreationHolidayButton from "../CreationButton.vue";
import AddIcon from '../icons/AddIcon.vue'

describe("CreationHolidayButton", () => {
  const wrapper = mount(CreationHolidayButton);

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have the awaited title", () => {
    expect(wrapper.text()).toBe("New holidays");
  });

  it("should have the add icon", () => {
    expect(wrapper.findComponent(AddIcon).exists()).toBe(true);
  });
});
