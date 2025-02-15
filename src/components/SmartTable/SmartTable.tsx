import {FC, useEffect, useState} from "react";
import {
    MantineReactTable,
    MRT_ColumnDef,
    MRT_TableInstance,
    useMantineReactTable,
} from "mantine-react-table";
import {MantineProvider, useMantineColorScheme} from "@mantine/core";

export interface TableToolbarActionsProps<T extends Record<string, any>> {
    data: T[];
    table: MRT_TableInstance<T>;
    fileNameOnExport?: string;
}

interface OwnProps<T extends Record<string, any>> {
    className?: string;
    config?: any;
    TableToolbarActions?: FC<TableToolbarActionsProps<T>>;
    isLoading?: boolean;
    isError?: boolean;
    fileNameOnExport?: string;
    data: T[];
    columns: MRT_ColumnDef<T>[];
}

const NAVBAR_HEIGHT = 56;

export const SmartTable = <T extends Record<string, any>, >(
    {
        className,
        config,
        data,
        TableToolbarActions,
        isLoading,
        isError,
        fileNameOnExport,
        columns
    }: OwnProps<T>) => {

    const [hasFullScreen, setHasFullScreen] = useState(false);
    const {colorScheme} = useMantineColorScheme();
    const table = useMantineReactTable<T>({
        columns,
        data,
        enableColumnActions: true,
        enableStickyHeader: true,
        enableTopToolbar: false,
        enableColumnOrdering: false,
        enableSorting: true,
        mantineTopToolbarProps: {sx: {marginTop: hasFullScreen ? "0" : `${NAVBAR_HEIGHT}px`}},
        mantineTableContainerProps: {
            sx: {height: hasFullScreen ? "600px" : "600px", overflowY: "auto", width: "100%"},
        },
        mantineToolbarAlertBannerProps: isError
            ? {color: "red", children: "Error loading data, please try again later or contact support"}
            : undefined,
        showAlertBanner: true,
        state: {
            showLoadingOverlay: isLoading,
            showSkeleton: isLoading,
            showAlertBanner: isError,
        },
        renderTopToolbarCustomActions: ({table}) =>
            TableToolbarActions ? (
                <TableToolbarActions table={table} data={data} fileNameOnExport={fileNameOnExport}/>
            ) : null,
        mantinePaperProps: {sx: {borderRadius: "16px", borderBlockColor: "0"}},
        mantineTableProps: {sx: {tableLayout: "fixed"}},
        ...config,
    });

    useEffect(() => setHasFullScreen(table.getState().isFullScreen), [table]);


    return (
        <div className={className}>
            <MantineProvider theme={{colorScheme}}>
                <MantineReactTable table={table}/>
            </MantineProvider>
        </div>
    );
};
