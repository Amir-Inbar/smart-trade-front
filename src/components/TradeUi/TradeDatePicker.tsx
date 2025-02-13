import {TradeInputTypesProps} from "@/components/TradeUi/trade.util";
import {DatePicker} from "../ui/date-picker";

export const TradeDatePicker = ({field}: TradeInputTypesProps) => {
    const handleDateChange = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            const isoDate = selectedDate.toLocaleDateString().split("T")[0];
            field.onChange(isoDate);
        }
    };
    return <DatePicker date={field.value} onDateChange={handleDateChange}/>;
};
