import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TheMainNavbar from "../TheMainNavbar.vue";
import AccountIcon from "../icons/AccountIcon.vue";

describe("TheMainNavbar", () => {
  let wrapper;
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-01-17"));
    wrapper = mount(TheMainNavbar);
  });

  beforeEach(() => {
    vi.useRealTimers();
  });

  it("should be render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Should have the awaited title", () => {
    expect(wrapper.find("h2").text()).toBe("Logo");
  });

  it("Should have the agenda icon", () => {
    expect(wrapper.findComponent(AccountIcon).exists()).toBe(true);
  });

  it("Should have current date", () => {
    expect(wrapper.find("h6").text()).toBe("mardi 17 janvier 2023");
  });
});
