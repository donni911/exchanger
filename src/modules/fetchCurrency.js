const API_KEY = import.meta.env.VITE_API_KEY_EXCHANGE;

export default async (cur) => {
  const data = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${cur}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return data;
};
