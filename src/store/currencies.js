import { defineStore } from "pinia";
import { fetchCurrency } from "../modules/fetchCurrency";

export const useCurrenciesStore = defineStore("currencies", {
  state: () => ({
    currencies: null,
    favouriteCurrencies: {},
    originalCurrency: "USD",
  }),

  actions: {
    async fetchData(value) {
      const data = await fetchCurrency(value);
      const conversionRates = data.conversion_rates;

      const temp = {};

      Object.entries(conversionRates).forEach(([currency, value]) => {
        const currencyKey = this.originalCurrency + currency;

        if (!(currencyKey in this.favouriteCurrencies)) {
          temp[currencyKey] = {
            currency,
            value,
            starred: false,
          };
        }
      });

      this.currencies = {
        ...this.favouriteCurrencies,
        ...temp,
      };
      this.concatCurrencies();
    },

    concatCurrencies() {
      const favoriteCurrencies = Object.values(this.favouriteCurrencies);
      const otherCurrencies = Object.values(this.currencies).filter(
        (currency) => !favoriteCurrencies.includes(currency)
      );

      this.currencies = [...favoriteCurrencies, ...otherCurrencies];
    },

    findCurrencies(value) {
      const currenciesToFind = Object.values(this.currencies).filter((cur) =>
        cur.currency.toUpperCase().includes(value.toUpperCase())
      );
      return currenciesToFind;
    },

    addFavourite(item) {
      item = { ...item, basicCurrency: this.originalCurrency };
      this.favouriteCurrencies[this.originalCurrency + item.currency] = item;
    },

    deleteFavorite(item) {
      const key = this.originalCurrency + item.currency;
      delete this.favouriteCurrencies[key];
    },
  },
});
