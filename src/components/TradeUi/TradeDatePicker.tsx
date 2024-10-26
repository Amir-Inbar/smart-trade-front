import React from "react";
import { TradeInputTypesProps } from "@/components/TradeUi/trade.util";
import { DatePicker } from "../ui/date-picker";

export const TradeDatePicker = ({ field, item }: TradeInputTypesProps) => {
  return <DatePicker date={field.value} onDateChange={field.onChange} />;
};
