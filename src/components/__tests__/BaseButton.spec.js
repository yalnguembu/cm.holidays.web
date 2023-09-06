import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import BaseButton from "../BaseButton.vue";
import AgendaIcon from "../icons/AgendaIcon.vue";

describe("BaseButton", () => {
  const wrapper = mount(BaseButton, {
    props: { title: "Open" },
    slots: {
      icon: AgendaIcon,
    },
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have the awaited icon", () => {
    expect(wrapper.findComponent(AgendaIcon).exists()).toBe(true);
  });

  it("should have the awaited title", () => {
    expect(wrapper.text()).toBe("Open");
  });
});
