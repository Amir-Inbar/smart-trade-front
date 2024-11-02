"use client";

import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { TradeInputTypesProps } from "@/components/TradeUi/trade.util";

export const TradeCheckbox = ({ field, item }: TradeInputTypesProps) => {
  const isChecked = field.value === undefined ? item.default : field.value;

  return (
    <div className="flex flex-col space-y-2">
      <label key={item.name} className="flex items-center space-x-2">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => {
            field.onChange(checked);
          }}
          className="border border-gray-300 rounded-sm"
        />
        <span>{item.label}</span>
      </label>
    </div>
  );
};
