import { defineStore } from "pinia";
import { fetchCurrency } from "../modules/fetchCurrency";

export const useCurrenciesStore = defineStore("currencies", {
  state: () => ({
    currencies: null,
    favouriteCurrencies: {},
    originalCurrency: "",
  }),

  actions: {
    async fetchData(value) {
      const data = await fetchCurrency(value);

      this.currencies = data.conversion_rates;

      let temp = {};

      Object.entries(this.currencies).map(([currency, value]) => {
        temp[this.originalCurrency + currency] = {
          currency,
          value,
          starred: false,
        };
      });

      Object.entries(this.favouriteCurrencies).map(([currency, value]) => {
        temp[currency] = value;
      });

      this.currencies = temp;

      // this.concatCurrencies();
    },

    concatCurrencies() {
      this.currencies = this.favouriteCurrencies.concat(
        this.currencies.slice(0, 5)
      );
      console.log(this.currencies);
    },

    addFavorite(item) {
      item = { ...item, basicCurrency: this.originalCurrency };
      this.favouriteCurrencies[this.originalCurrency + item.currency] = item;
      console.log(this.favouriteCurrencies);
    },

    deleteFavorite(item) {
      this.favouriteCurrencies = this.favouriteCurrencies.filter(
        (fav) => fav.currency !== item.currency
      );
    },
  },
});
