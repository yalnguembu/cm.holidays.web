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

  it("Should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Should have the awaited route", () => {
    const wrapper = mount(TheBreadcrumb, {
      global: {
        mocks: {
          $route: {
            params: { id: 1 },
            path: "/list",
          },
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    const breacrumbLink = wrapper.find('[data-test="breadcrumb-link"] > span');
    const lastItem = wrapper.find('[data-test="last-item"]');

    expect(wrapper.findComponent(ArrowRigthIcon).exists()).toBe(true);

    expect(breacrumbLink.exists()).toBe(true);
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe("/");
    expect(breacrumbLink.text()).toBe("Home");
    expect(breacrumbLink.classes("text-gray-500")).toBe(true);
    expect(breacrumbLink.classes("text-lg")).toBe(true);

    expect(lastItem.exists()).toBe(true);
    expect(lastItem.text()).toBe("holiday details");
    expect(lastItem.classes("text-black")).toBe(true);
    expect(lastItem.classes("text-2xl")).toBe(true);
    expect(lastItem.classes("font-bold")).toBe(true);
  });

  it("Should display correctly in holiday details page", () => {
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
    const breacrumbLink = wrapper.findAll(
      '[data-test="breadcrumb-link"] > span'
    );
    const lastItem = wrapper.find('[data-test="last-item"]');

    expect(wrapper.findAllComponents(ArrowRigthIcon).length).toBe(2);

    expect(wrapper.findAllComponents(RouterLinkStub).at(0).props().to).toBe("/");
    expect(breacrumbLink.at(0).exists()).toBe(true);
    expect(breacrumbLink.at(0).text()).toBe("Home");
    expect(breacrumbLink.at(0).classes("text-gray-500")).toBe(true);
    expect(breacrumbLink.at(0).classes("text-lg")).toBe(true);

    expect(wrapper.findAllComponents(RouterLinkStub).at(1).props().to).toBe(
      "/list"
    );
    expect(breacrumbLink.at(1).exists()).toBe(true);
    expect(breacrumbLink.at(1).text()).toBe("list");
    expect(breacrumbLink.at(1).classes("text-gray-500")).toBe(true);
    expect(breacrumbLink.at(1).classes("text-lg")).toBe(true);

    expect(lastItem.exists()).toBe(true);
    expect(lastItem.text()).toBe("holiday details");
    expect(lastItem.classes("text-black")).toBe(true);
    expect(lastItem.classes("text-2xl")).toBe(true);
    expect(lastItem.classes("font-bold")).toBe(true);
  });
});
