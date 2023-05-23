const API_KEY = import.meta.env.VITE_API_KEY_EXCHANGE;
export const fetchCurrencyByName = async (cur) => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${cur.currency}`
    );
    const data = await response.json();

    if (data.result === "error") {
      throw new Error(`Invalid currency: ${cur.currency}`);
    }

    const isCurrencyChange = data.conversion_rates[cur.currencyChange];

    if (!isCurrencyChange) {
      throw new Error(`Invalid currency: ${cur.currencyChange}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCurrency = async (cur) => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${cur}`
    );
    const data = await response.json();

    if (data.result === "error") {
      throw new Error(`Invalid currency: ${cur}`);
    }

    return data;

  } catch (error) {
    throw error;
  }
};
