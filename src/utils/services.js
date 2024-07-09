let data = [];

export const updateLavorazioni = (lavorazioni) => {
  data = [...lavorazioni];
};


export const getItems = () => {
  return data;
};
export const updateItem = (item) => {
  let index = data.findIndex((record) => record.Tariffa === item.Tariffa);
  data[index] = item;
  return data;
};
export const deleteItem = (item) => {
  let index = data.findIndex((record) => record.Tariffa === item.Tariffa);
  data.splice(index, 1);
  return data;
};