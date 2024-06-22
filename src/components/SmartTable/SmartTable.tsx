import {FC, useEffect, useState} from "react";
import {
    MantineReactTable,
    MRT_TableInstance,
    MRT_TableOptions,
    useMantineReactTable,
} from "mantine-react-table";

export interface TableToolbarActionsProps<T> {
    data: T[];
    table: MRT_TableInstance;
    fileNameOnExport?: string;
}

export const dataInitialState = {
    enableStickyHeader: true,
    enableTopToolbar: true,
    enableStickyFooter: true,
    enableColumnResizing: true,
    enableRowSelection: true,
    enableGrouping: true,
    enableFullScreenToggle: true,
    enableHiding: true,
    paginationDisplayMode: "pages",
    initialState: {
        grouping: ["billing_entity"],
        density: "xs",
        expanded: true,
        pagination: {pageIndex: 0, pageSize: 20},
        sorting: [{id: "timestamp", asc: true}],
        columnVisibility: {
            usage_category: false,
            usage: false,
            usage_units: false,
        },
    },
};

interface OwnProps<T> extends MRT_TableOptions<any> {
    className?: string;
    config?: any;
    TableToolbarActions?: FC<TableToolbarActionsProps<T>>;
    isLoading?: boolean;
    isError?: boolean;
    fileNameOnExport?: string;
}

const NAVBAR_HEIGHT = 56;

export const SmartTable = <T extends Record<string, any>>(
    props: OwnProps<T>,
) => {
    const {
        className,
        config,
        data,
        TableToolbarActions,
        isLoading,
        isError,
        fileNameOnExport,
    } = props;

    const [hasFullScreen, setHasFullScreen] = useState<boolean>(false);
    const table = useMantineReactTable({
        enableColumnActions: true,
        enableStickyHeader: true,
        enableTopToolbar: false,
        enableColumnOrdering: false,
        enableSorting: true,
        mantineTopToolbarProps: {
            sx: {marginTop: hasFullScreen ? "0" : `${NAVBAR_HEIGHT}px`},
        },
        mantineTableContainerProps: {
            sx: {height: hasFullScreen ? "600px" : "auto"},
        },
        mantineToolbarAlertBannerProps: isError
            ? {
                  color: "red",
                  children:
                      "Error loading data, please try again later or contact support",
              }
            : undefined,
        showAlertBanner: true,
        state: {
            showLoadingOverlay: isLoading,
            showSkeleton: isLoading,
            showAlertBanner: isError,
        },
        renderTopToolbarCustomActions: (tableProps: {
            table: MRT_TableInstance;
        }) =>
            TableToolbarActions ? (
                <TableToolbarActions
                    table={tableProps.table}
                    data={data}
                    fileNameOnExport={fileNameOnExport}
                />
            ) : null,
        mantinePaperProps: {
            sx: {
                borderRadius: "16px",
                borderBlockColor: "0",
            },
        },
        mantineTableProps: {
            sx: {
                tableLayout: "fixed",
            },
        },
        ...config,
        ...props,
    });
    const {isFullScreen} = table.getState();
    useEffect(() => {
        setHasFullScreen(!isFullScreen);
    }, [isFullScreen]);

    return (
        <div className={className}>
            <MantineReactTable table={table} />
        </div>
    );
};
