import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateDailyTradeLimitMutation, useSearchDailyTradeLimitQuery } from "@/store/api/dailyTradeLimitApi";

export const DailyTradeLimit = () => {
    const { data, isLoading } = useSearchDailyTradeLimitQuery();
    const [createDailyTradeLimit] = useCreateDailyTradeLimitMutation();

    const [tradeLimit, setTradeLimit] = useState("");
    const [date, setDate] = useState<Date | null>(null);

    const onDateChange = (newDate: Date | null) => {
        setDate(newDate);
    };

    const onSubmit = async () => {
        if (!tradeLimit || !date) {
            alert("Please enter a trade limit and select a date.");
            return;
        }

        try {
            await createDailyTradeLimit({ limit: tradeLimit, date }).unwrap();
            alert("Daily trade limit set successfully!");
        } catch (error) {
            console.error("Error setting trade limit:", error);
        }
    };

    return (
        <div className="flex space-x-4">
            <Input
                type="text"
                placeholder="Trade limit"
                className="w-1/6"
                value={tradeLimit}
                onChange={(e) => setTradeLimit(e.target.value)}
            />
            <DatePicker value={date} onChange={onDateChange} />
            <Button onClick={onSubmit}>Set Daily Trade Limit</Button>
        </div>
    );
};
