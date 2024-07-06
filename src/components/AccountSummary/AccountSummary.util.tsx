import {MRT_ColumnDef} from "mantine-react-table";

export const accountSummaryColumns: MRT_ColumnDef<any>[] = [
    {accessorKey: 'account', header: 'Account'},
    {accessorKey: 'AccountType', header: 'Account Type'},
    {accessorKey: 'Cushion', header: 'Cushion'},
    {accessorKey: 'DayTradesRemaining', header: 'Day Trades Remaining'},
    {accessorKey: 'AccruedCash', header: 'Accrued Cash'},
    {accessorKey: 'AvailableFunds', header: 'Available Funds'},
    {accessorKey: 'BuyingPower', header: 'Buying Power'},
    {accessorKey: 'EquityWithLoanValue', header: 'Equity With Loan Value'},
    {accessorKey: 'ExcessLiquidity', header: 'Excess Liquidity'},
    {accessorKey: 'FullAvailableFunds', header: 'Full Available Funds'},
    {accessorKey: 'FullExcessLiquidity', header: 'Full Excess Liquidity'},
    {accessorKey: 'FullInitMarginReq', header: 'Full Init Margin Req'},
    {accessorKey: 'FullMaintMarginReq', header: 'Full Maint Margin Req'},
    {accessorKey: 'GrossPositionValue', header: 'Gross Position Value'},
    {accessorKey: 'InitMarginReq', header: 'Init Margin Req'},
    {accessorKey: 'LookAheadAvailableFunds', header: 'Look Ahead Available Funds'},
    {accessorKey: 'LookAheadExcessLiquidity', header: 'Look Ahead Excess Liquidity'},
    {accessorKey: 'LookAheadInitMarginReq', header: 'Look Ahead Init Margin Req'},
    {accessorKey: 'LookAheadMaintMarginReq', header: 'Look Ahead Maint Margin Req'},
    {accessorKey: 'MaintMarginReq', header: 'Maint Margin Req'},
    {accessorKey: 'NetLiquidation', header: 'Net Liquidation'},
    {accessorKey: 'PreviousDayEquityWithLoanValue', header: 'Previous Day Equity With Loan Value'},
    {accessorKey: 'RegTEquity', header: 'Reg T Equity'},
    {accessorKey: 'RegTMargin', header: 'Reg T Margin'},
    {accessorKey: 'SMA', header: 'SMA'},
    {accessorKey: 'TotalCashValue', header: 'Total Cash Value'},
];


export const formattedData = (rawData: any) => {
    if (!rawData) return {};
    return rawData.reduce((acc, item) => {
        const [account, metric, value, currency] = item;
        if (!acc[account]) {
            acc[account] = {account};
        }
        acc[account][metric] = value + (currency ? ` ${currency}` : '');
        return acc;
    }, {});
}