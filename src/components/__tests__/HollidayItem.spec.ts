import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HolidayItem from "@/src/components/holidays/HolidayRequestListItem.vue";

describe("HolidayItem", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    vi.useFakeTimers();
    const date = new Date("Tue, 17 Jan 2023 10:49:00 GMT");
    console.log(date.toUTCString());
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

  it("should have the awaited created since", () => {
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 4 jours"
    );
  });

  it("should have the awaited creation time", () => {
    expect(wrapper.find("[data-test='creation-time']").text()).toBe("14:32");
  });

  it("should have the awaited date range", () => {
    expect(wrapper.find("[data-test='date-range']").text()).toBe(
      "Sat Jan 14 2023 - Thu Jan 19 2023"
    );
  });

  it("should have the awaited description", () => {
    expect(wrapper.find("[data-test='description']").text()).toBe(
      "Lorem ipsum dolor sit amet consectetur."
    );
  });

  it("should have the awaited holidays type", () => {
    expect(wrapper.find("[data-test='type']").text()).toBe("Maternite");
  });

  it("should have the created since in days", () => {
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 4 jours"
    );
  });

  it("should have the created since in hours", async () => {
    await wrapper.setProps({ holiday: { createdAt: 1673948937637 } });
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 1 heures"
    );
  });

  it("should have the created since in minutes", async () => {
    await wrapper.setProps({ holiday: { createdAt: 1673951967837 } });
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 10 minutes"
    );
  });

  it("should have the created since as `just now`", async () => {
    await wrapper.setProps({ holiday: { createdAt: 1673952567837 } });

    expect(wrapper.find("[data-test='created-at']").text()).toBe("A l'instant");
  });
});
