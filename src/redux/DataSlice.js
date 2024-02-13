import { createSlice } from "@reduxjs/toolkit";
import formData from "../Json/form-data.json";
const initialFieldsState = formData.fields.reduce((acc, field) => {
  return {
    ...acc,
    [field.name]: "",
  };
}, {});

const initialState = {
  fields: initialFieldsState,
};

export const dataSlice = createSlice({
  name: "dataHandeler",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state.fields[name] = value;
    },
  },
});

export const { updateField } = dataSlice.actions;

export default dataSlice.reducer;
