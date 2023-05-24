import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import List from "@/components/ListCurrencies/List.vue";

describe("List", () => {
  it("renders properly", () => {
    const wrapper = mount(ConverterResult, {
      props: {
        currencies: {
          AED: 3.6725,
          AFN: 87.6087,
          ALL: 102.8124,
          AMD: 386.4611,
          ANG: 1.79,
        },
      },
    });
  });
});
