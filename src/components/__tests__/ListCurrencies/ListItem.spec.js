import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ListItem from "@/components/ListCurrencies/ListItem.vue";

describe("List", () => {
  it("renders properly", () => {
    const wrapper = mount(ListItem, {
      store: {
        originalCurrency: "USD",
      },
      props: {
        item: {
          basicCurrency: "USD",
        },
      },
    });
  });
});
