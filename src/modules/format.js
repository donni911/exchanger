export const formatSum = (data) => {
  return `${data.sum} ${data.currency}  = ${data.convertedSum} ${data.currencyChange}`;
};

export const formatUnit = (data) => {
  return `1 ${data.currency} = ${data.unit} ${data.currencyChange}`;
};
