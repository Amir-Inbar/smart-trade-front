import { TradeInputTypesProps } from "@/components/TradeUi/trade.util";
import { DatePicker } from "../ui/date-picker";
import { useEffect, useState } from "react";

export const TradeDatePicker = ({ field }: TradeInputTypesProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        field.value ? new Date(field.value) : undefined
    );

    useEffect(() => {
        if (selectedDate) {
            const isoDate = selectedDate.toLocaleDateString("en-CA");
            field.onChange(isoDate);
        }
    }, [selectedDate, field]);

    return <DatePicker date={selectedDate} onDateChange={setSelectedDate} />;
};
