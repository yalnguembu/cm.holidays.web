import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import CardWrapper from "../CardWrapper.vue";

describe("CardWrapper", () => {
  const TestComponent = {
    template: `
        <div>
          <h1>Welcome</h1>
        </div>
        `,
  };
  const wrapper = mount(CardWrapper, { slots: { default: TestComponent } });

  it("shoud render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should haven the awaited slot", () => {
    expect(wrapper.findComponent(TestComponent).exists()).toBe(true);
  });
});
