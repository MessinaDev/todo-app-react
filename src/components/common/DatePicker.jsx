import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { it } from "date-fns/locale/it";

export default function DateField({ label, date, changeDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={it}>
      <DatePicker
        label={label}
        slotProps={{
          textField: {
            helperText: "DD/MM/YYYY",
          },
          field: {
            clearable: true,
          },
        }}
        value={date}
        onChange={(value) => changeDate(value)}
      />
    </LocalizationProvider>
  );
}
