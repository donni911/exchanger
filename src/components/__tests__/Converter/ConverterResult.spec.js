import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ConverterResult from "@/components/Converter/ConverterResult.vue";

describe("ConverterResult", () => {
  it("coorrect state", () => {
    const wrapper = mount(ConverterResult, {
      props: {
        convertInfo: {
          sum: 100,
          currency: "USD",
          convertedSum: "36000",
          currencyChange: "UAH",
          unit: 36.9327,
        },
      },
    });

    expect(wrapper.find("h2").text()).toBe("100 USD = 36000 UAH");
    expect(wrapper.find("p.text-sm").text()).toBe("1 USD = 36.9327 UAH");
  });

  it("renders message when convertInfo.convertedSum is falsy", () => {
    const wrapper = mount(ConverterResult, {
      props: {
        convertInfo: {
          sum: 0,
          currency: "USD",
          convertedSum: "",
          currencyChange: "UAH",
          unit: 36.9327,
        },
      },
    });

    expect(wrapper.find("h2.text-lg").exists()).toBe(true);
    expect(wrapper.find("div > img").exists()).toBe(true);
  });
});
