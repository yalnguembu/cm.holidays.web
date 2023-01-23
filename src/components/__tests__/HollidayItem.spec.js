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

  it("should have the awaited informations", () => {
    const wrapper = mount(HolidayItem, {
      props: {
        holiday: holidayProps,
      },
    });
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 3 jours"
    );
    expect(wrapper.find("[data-test='creation-time']").text()).toBe("14:32");
    expect(wrapper.find("[data-test='data-range']").text()).toMatch(
      "Sat Jan 14 2023 - Thu Jan 19 2023"
    );
    expect(wrapper.find("[data-test='description']").text()).toBe(
      holidayProps.description
    );
    expect(wrapper.find("[data-test='type']").text()).toBe(
      holidayProps.holidayType
    );
  });

  it("should have the props", () => {
    const wrapper = mount(HolidayItem, {
      props: {
        holiday: holidayProps,
      },
    });
    expect(wrapper.props()).toEqual({ holiday: holidayProps });
  });

  it("it must have the created at a in days", () => {
    const wrapper = mount(HolidayItem, {
      props: {
        holiday: holidayProps,
      },
    });

    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 3 jours"
    );
  });

  it("it must have the created at a in hours", () => {
    const wrapper = mount(HolidayItem, {
      props: {
        holiday: {
          ...holidayProps,
          createdAt: 1673948967837,
        },
      },
    });
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 1 heures"
    );
  });
  it("it must have the created at a in minutes", () => {
    const wrapper = mount(HolidayItem, {
      props: {
        holiday:{
          ...holidayProps,
          createdAt: 1673951967837,
        },
      },
    });
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 10 minutes"
    );
  });
  it("it must have the created equal to just now", () => {
    const wrapper = mount(HolidayItem, {
      props: {
        holiday: {
          ...holidayProps,
          createdAt: 1673952567837,
        },
      },
    });
    expect(wrapper.find("[data-test='created-at']").text()).toBe("A l'instant");
  });
});
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HolidayItem from "../HolidayItem.vue";

describe("HolidayItem", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const date = new Date("2023-01-17T10:49:27.837Z");
    vi.setSystemTime(date);
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  const holidayProps = {
    id: 0,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor a blanditiis cupiditate dolore",
    startingDate: "2023-01-14",
    endingDate: "2023-01-19",
    createdAt: 1673616739371,
    holidayType: "Maternite",
  };

  it("should render correctly", () => {
    const wrapper = mount(HolidayItem, {
      props: {
        holiday: holidayProps,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("should have the holiday informations", () => {
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 3 jours"
    );
    expect(wrapper.find("[data-test='creation-time']").text()).toBe("14:32");
    expect(wrapper.find("[data-test='data-range']").text()).toMatch(
      "Sat Jan 14 2023 - Thu Jan 19 2023"
    );
    expect(wrapper.find("[data-test='description']").text()).toBe(
      "Lorem ipsum dolor sit amet consectetur."
    );
    expect(wrapper.find("[data-test='type']").text()).toBe("Maternite");
  });

  it("it must have the created at a in days", () => {
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 3 jours"
    );
  });

  it("it must have the created at a in hours", async () => {
    await wrapper.setProps({ holiday: { createdAt: 1673948967837 } });
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 1 heures"
    );
  });
  it("it must have the created at a in minutes", async () => {
    await wrapper.setProps({ holiday: { createdAt: 1673951967837 } });
    expect(wrapper.find("[data-test='created-at']").text()).toBe(
      "il y'a 10 minutes"
    );
  });
  it("it must have the created equal to just now", async () => {
    await wrapper.setProps({ holiday: { createdAt: 1673952567837 } });
    expect(wrapper.find("[data-test='created-at']").text()).toBe("A l'instant");
  });
});
