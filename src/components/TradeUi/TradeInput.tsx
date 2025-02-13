import {TradeInputTypesProps} from "@/components/TradeUi/trade.util";
import {Input} from "@/components/ui/input";

interface TradeInputProps extends TradeInputTypesProps {
    type: string | undefined;
}

export const TradeInput = ({field, item, type}: TradeInputProps) => (
    <Input
        {...field}
        type={type}
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder={item.placeholder}
    />
)