import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TheBreadcrumb from "../TheBreadcrumb.vue";
import ArrowRigthIcon from "../icons/ArrowRigthIcon.vue";

describe("TheBreadcrumb", () => {
  const wrapper = mount(TheBreadcrumb, {
    global: {
      mocks: {
        $route: {
          params: {},
          path: "/list",
        },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });

  it("Should render correctly", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Should display the current route", async () => {
    expect(wrapper.findAllComponents(ArrowRigthIcon).length).toBe(1);
    expect(wrapper.findAllComponents(RouterLinkStub).length).toBe(1);
    expect(wrapper.find('[data-test="last-item"]').exists()).toBe(true);
  });

  it("Should display the last route as holiday details", async () => {
    const wrapper = mount(TheBreadcrumb, {
      global: {
        mocks: {
          $route: {
            params: { id: 1 },
            path: "/list/1",
          },
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.findAllComponents(ArrowRigthIcon).length).toBe(2);
    expect(wrapper.findAllComponents(RouterLinkStub).length).toBe(2);
    expect(wrapper.find('[data-test="last-item"]').text()).toBe(
      "holiday details"
    );
  });
});
