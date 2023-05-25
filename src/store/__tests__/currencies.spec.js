import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCurrenciesStore } from "@/store/currencies";

describe("Data Store Test", () => {
  let store = null;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useCurrenciesStore();
  });

  it("initialize with zero values", () => {
    expect(store.currencies).toEqual(null);
    expect(store.favouriteCurrencies).toEqual({});
    expect(store.originalCurrency).toEqual("");
  });
});
