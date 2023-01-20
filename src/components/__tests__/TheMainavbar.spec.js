import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TheMainNavbar from "../TheMainNavbar.vue";
import AccountIcon from "../icons/AccountIcon.vue";

describe("TheMainNavbar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    vi.useRealTimers();
  });

  const wrapper = mount(TheMainNavbar);

  it("should be render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Should display correct title", () => {
    expect(wrapper.find("h2").text()).toBe("Logo");
  });

  it("Should display navbar content", () => {
    expect(wrapper.findComponent(AccountIcon).exists()).toBe(true);
  });

  it("Should display navbar content", () => {
    vi.setSystemTime(new Date("2023-01-17"));
    const wrapper = mount(TheMainNavbar);
    
    expect(wrapper.find("h6").text()).toBe("mardi 17 janvier 2023");
  });
});
