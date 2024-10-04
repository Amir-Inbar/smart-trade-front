"use client";

import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { TradeInputTypesProps } from "@/components/TradeUi/trade.util";

export const TradeCheckbox = ({ field, item }: TradeInputTypesProps) => {
  const isChecked = field.value?.includes(item.default) || false;

  return (
    <div className='flex flex-col space-y-2'>
      <label key={item.name} className='flex items-center space-x-2'>
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => {
            const newValue = checked
              ? [...(field.value || []), item.default] // Initialize field.value as array if undefined
              : (field.value || []).filter((v: string) => v !== item.default); // Filter the value
            field.onChange(newValue);
          }}
          className='border border-gray-300 rounded-sm'
        />
        <span>{item.label}</span>
      </label>
    </div>
  );
};
