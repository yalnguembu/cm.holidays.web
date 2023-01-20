import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import BaseButton from "../BaseButton.vue";
import AgendaIcon from "../icons/AgendaIcon.vue";

describe("BaseButton", () => {
  const wrapper = mount(BaseButton, {
    props: { title: "Open" },
    slots: {
      default: AgendaIcon,
    },
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have agenda icon", () => {
    expect(wrapper.findComponent(AgendaIcon).exists()).toBe(true);
  });
});
