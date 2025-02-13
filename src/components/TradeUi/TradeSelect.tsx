import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {TradeInputTypesProps} from "@/components/TradeUi/trade.util";

export const TradeSelect = ({field, item}: TradeInputTypesProps) => (
    <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
            <SelectValue placeholder="Select an option"/>
        </SelectTrigger>
        <SelectContent>
            {item.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
)