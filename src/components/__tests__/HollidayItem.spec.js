import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HolidayItem from "../HolidayItem.vue";

describe("HolidayItem", () => {
  let wrapper;
  
  beforeEach(() => {
    vi.useFakeTimers();
    const date = new Date("2023-01-17T10:49:27.837Z");
    vi.setSystemTime(date);

    wrapper = mount(HolidayItem, {
      props: {
        holiday: {
          id: 0,
          description: "Lorem ipsum dolor sit amet consectetur.",
          startingDate: "2023-01-14",
          endingDate: "2023-01-19",
          createdAt: 1673616739371,
          holidayType: "Maternite",
        },
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have the awaited `createdSince`", () => {
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 3 jours"
    );
  });

  it("should have the awaited creation time", () => {
    expect(wrapper.find("[data-test='creation-time']").text()).toBe("14:32");
  });

  it("should have the awaited date range", () => {
    expect(wrapper.find("[data-test='data-range']").text()).toBe(
      "Sat Jan 14 2023 - Thu Jan 19 2023"
    );
  });

  it("should have the awaited description", () => {
    expect(wrapper.find("[data-test='description']").text()).toBe(
      "Lorem ipsum dolor sit amet consectetur."
    );
  });

  it("should have the awaited holiday type", () => {
    expect(wrapper.find("[data-test='type']").text()).toBe("Maternite");
  });

  it("should have the `createdSince` in days", () => {
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 3 jours"
    );
  });

  it("should have the `createdSince` in hours", async () => {
    await wrapper.setProps({ holiday: { createdAt: 1673948967837 } });
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 1 heures"
    );
  });
  
  it("should have the `createdSince` in minutes", async () => {
    await wrapper.setProps({ holiday: { createdAt: 1673951967837 } });
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 10 minutes"
    );
  });

  it("should have the `createdSince` as `just now`", async () => {
    await wrapper.setProps({ holiday: { createdAt: 1673952567837 } });
    expect(wrapper.find("[data-test='created-at']").text()).toBe("A l'instant");
  });
});
