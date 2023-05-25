import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ListItem from "@/components/ListCurrencies/ListItem.vue";
import { createPinia, setActivePinia } from "pinia";

describe("ListItem", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders properly", () => {
    const store = {
      originalCurrency: "USD",
    };

    const wrapper = mount(ListItem, {
      global: {
        mocks: { $store: store },
      },
      props: {
        item: {
          value: 1,
          basicCurrency: "USD",
          currency: "EUR",
        },
      },
    });

    expect(wrapper.find("p.text-body").text()).toBe("1 USD");
    expect(wrapper.find("span.text-primary").text()).toBe("1 EUR");
  });
});
