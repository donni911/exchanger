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

      console.log(this.currencies);
      console.log(this.favouriteCurrencies);
      this.concatCurrencies();
    },

    concatCurrencies() {
      this.currencies = this.favouriteCurrencies.concat(
        this.currencies.slice(0, 5)
      );
    },

    addFavorite(item, currectCur) {
      item = { ...item, basicCurrency: currectCur };
      this.favouriteCurrencies[this.originalCurrency + item.currency] = item;

      // const itemIndex = this.currencies.findIndex((x) => x === item);
      // const itemFinded = this.currencies[itemIndex];
      // itemFinded.basicCurrency = currentCur;

      // console.log(this.currencies);
    },

    deleteFavorite(item) {
      this.favouriteCurrencies = this.favouriteCurrencies.filter(
        (fav) => fav.currency !== item.currency
      );
    },
  },
});
