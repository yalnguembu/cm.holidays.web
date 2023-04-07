import { mount, VueWrapper } from "@vue/test-utils";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import TheMainNavbar from "../TheMainNavbar.vue";
import AccountIcon from "../icons/AccountIcon.vue";

describe("TheMainNavbar", () => {
  let wrapper:VueWrapper;
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-01-17"));
    wrapper = mount(TheMainNavbar);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should be render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have the awaited title", () => {
    expect(wrapper.find("h2").text()).toBe("Logo");
  });

  it("should have the agenda icon", () => {
    expect(wrapper.findComponent(AccountIcon).exists()).toBe(true);
  });

  it("should have current date", () => {
    expect(wrapper.find("h6").text()).toBe("mardi 17 janvier 2023");
  });
});
