import React from "react";
import { TradeInputTypesProps } from "@/components/TradeUi/trade.util";
import { DatePicker } from "../ui/date-picker";

export const TradeDatePicker = ({ field, item }: TradeInputTypesProps) => {
  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split("T")[0]; // "2024-10-16"
      field.onChange(isoDate);
    }
  };
  return <DatePicker date={field.value} onDateChange={handleDateChange} />;
};
