import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import List from "@/components/ListCurrencies/List.vue";
import { createPinia, setActivePinia } from "pinia";

describe("List", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders properly", () => {
    const store = {
      originalCurrency: "USD",
    };

    const wrapper = mount(List, {
      global: {
        mocks: { $store: store },
      },

      props: {
        currencies: [
          { currency: "NIO", value: 36.5987, starred: false },
          { currency: "NOK", value: 10.9567, starred: false },
          { currency: "NPR", value: 132.3452, starred: false },
        ],
      },
    });

    expect(wrapper.findAll("li")).toHaveLength(
      wrapper.props("currencies").length
    );
  });
});
