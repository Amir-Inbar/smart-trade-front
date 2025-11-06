import {Button} from '@mantine/core';
import {MRT_ColumnDef, MRT_Row} from 'mantine-react-table';
import {UserTPLevelDefaultSchema} from '@/schemas/types';

type RowType = UserTPLevelDefaultSchema;

interface GetUserTakeProfitLevelsColumnsProps {
    onOpenAccountModal: (account: string) => void;
}

export const getUserTakeProfitLevelsColumns = ({
                                                   onOpenAccountModal,
                                               }: GetUserTakeProfitLevelsColumnsProps): MRT_ColumnDef<RowType>[] => [
    {
        accessorKey: 'account',
        header: 'Account',
    },
    {
        accessorKey: 'quantity',
        header: 'Qty',
    },
    {
        id: 'actions',
        header: 'Actions',
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 160,
        Cell: ({row}: { row: MRT_Row<RowType> }) => (
            <div className="flex gap-2">
                <Button
                    size="xs"
                    variant="outline"
                    onClick={() => onOpenAccountModal(row.original.account)}
                >
                    Edit Levels
                </Button>
            </div>
        ),
    },
];

export const initialUserTakeProfitLevelsConfig = {
    enableStickyHeader: true,
    enableTopToolbar: true,
    enableStickyFooter: true,
    enableColumnResizing: true,
    enableRowSelection: false,
    enableGrouping: true,
    enableEditing: false,
    editDisplayMode: 'modal',
    enableFullScreenToggle: true,
    enableHiding: true,
    paginationDisplayMode: 'pages',
    initialState: {
        density: 'xs',
        expanded: true,
        pagination: {pageIndex: 0, pageSize: 20},
        columnVisibility: {id: false},
    },
};
