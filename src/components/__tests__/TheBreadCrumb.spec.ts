import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import TheBreadcrumb from "../TheBreadcrumb.vue";
import ArrowRigthIcon from "../icons/ArrowRigthIcon.vue";
import { useRoute, useRouter } from "vue-router";

describe("TheBreadcrumb", () => {
  vi.mock("vue-router", () => ({
    useRoute: vi.fn(() => ({
      params: { id: 1 },
      path: "/list",
    })),
  }));

  useRoute.mockImplementationOnce(() => ({
    params: {
      id: 1,
    },
    path: "/",
  }));

  const wrapper = mount(TheBreadcrumb, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have the awaited route", () => {
    useRoute.mockImplementationOnce(() => ({
      params: {},
      path: "/list",
    }));

    const wrapper = mount(TheBreadcrumb, {
      global: {
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
    expect(breacrumbLink.attributes().class).toContain("text-gray-500 text-lg");

    expect(lastItem.exists()).toBe(true);
    expect(lastItem.text()).toBe("list");
    expect(lastItem.attributes().class).toContain(
      "text-black text-2xl font-bold"
    );
  });

  it("Should display correctly in holidays details page", () => {
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: 1,
      },
      path: "/list/1",
    }));

    const wrapper = mount(TheBreadcrumb, {
      global: {
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

    expect(wrapper.findAllComponents(RouterLinkStub).at(0).props().to).toBe(
      "/"
    );
    expect(breacrumbLink.at(0).exists()).toBe(true);
    expect(breacrumbLink.at(0).text()).toBe("Home");
    expect(breacrumbLink.at(0).attributes().class).toContain(
      "text-gray-500 text-lg"
    );

    expect(wrapper.findAllComponents(RouterLinkStub).at(1).props().to).toBe(
      "/list"
    );
    expect(breacrumbLink.at(1).exists()).toBe(true);
    expect(breacrumbLink.at(1).text()).toBe("list");
    expect(breacrumbLink.at(1).attributes().class).toContain(
      "text-gray-500 text-lg"
    );

    expect(lastItem.exists()).toBe(true);
    expect(lastItem.text()).toBe("holidays details");
    expect(lastItem.attributes().class).toContain(
      "text-black text-2xl font-bold"
    );
  });
});
