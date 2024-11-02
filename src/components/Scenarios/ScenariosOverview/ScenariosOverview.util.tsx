import { MRT_Cell, MRT_ColumnDef, MRT_Row } from "mantine-react-table";
import {
  OperationalState,
  ScenarioSchema,
  TakeProfitLevelCreateSchema
} from "@/schemas/types";
import { ScenarioStateUtil } from "@/lib/scenario.state.util";
import { Button } from "@/components/ui/button";


interface getScenarioColumnsProps {
  isUpdatingScenario: boolean;
  updatingScenarioId: string | undefined;

  onUpdateScenarioState(scenario: ScenarioSchema, state: OperationalState): Promise<void>;

  onDeleteScenario(scenario: ScenarioSchema): Promise<void>;
}

export const getScenarioColumns = (
  {
    onUpdateScenarioState,
    isUpdatingScenario,
    updatingScenarioId,
    onDeleteScenario
  }: getScenarioColumnsProps) => [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "contract_id",
    header: "Contract ID"
  },
  {
    accessorKey: "is_quality_scenario",
    header: "Quality Scenario",
    Cell: ({ cell }: { cell: MRT_Cell<any> }) => (
      <span>{cell.getValue() ? "Yes" : "No"}</span>
    )
  },
  {
    accessorKey: "action",
    header: "Action"
  },
  {
    accessorKey: "select_strategy",
    header: "Select Strategy"
  },
  {
    accessorKey: "break_down_price",
    header: "Break Down Price"
  },
  {
    accessorKey: "enter_price",
    header: "Enter Price"
  },
  {
    accessorKey: "stop_price",
    header: "Stop Price"
  },
  {
    accessorKey: "stop_price_mode",
    header: "Stop Price Mode"
  },
  {
    accessorKey: "take_profit_levels",
    header: "Take Profit Levels",
    Cell: ({ row }: { row: MRT_Row<ScenarioSchema> }) => {
      const levels = row.original.take_profit_levels;
      return levels?.length ? (
        <span>
                    {levels.map((level: TakeProfitLevelCreateSchema, idx: number) => (
                      <div key={idx}>
                        <span className="mr-2">{level.price}</span>
                        <>/</>
                        <span className="ml-2">{level.quantity}</span>
                      </div>
                    ))}
                </span>
      ) : <span />;
    }
  },
  {
    accessorKey: "description",
    header: "Description"
  },
  {
    accessorKey: "date_trade",
    header: "Date Trade",
    Cell: ({ cell }: { cell: MRT_Cell<ScenarioSchema> }) =>
      cell.getValue() ? new Date(cell.getValue() as string).toLocaleDateString() : "-"
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    Cell: ({ cell }: { cell: MRT_Cell<ScenarioSchema> }) =>
      cell.getValue() ? new Date(cell.getValue() as string).toLocaleString() : "-"
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    Cell: ({ cell }: { cell: MRT_Cell<ScenarioSchema> }) =>
      cell.getValue() ? new Date(cell.getValue() as string).toLocaleString() : "-"
  },
  {
    accessorKey: "state",
    header: "State"
  },
  {
    accessorKey: "actions",
    header: "Actions",
    Cell: ({ row }: { row: MRT_Row<ScenarioSchema> }) => {
      const { operational_state, id } = row.original;
      if (!operational_state) {
        return <div />;
      }

      const stateUtil = new ScenarioStateUtil(operational_state as OperationalState);

      const buttonText = stateUtil.isPaused() ? "Resume" : "Pause";
      const stateToSet = stateUtil.isPaused() ? OperationalState.PENDING : OperationalState.PAUSED;
      const isDisabled = isUpdatingScenario && updatingScenarioId === id;
      return (
        <div>
          <Button disabled={isDisabled} onClick={() => onUpdateScenarioState(row.original, stateToSet)}>
            {buttonText}
          </Button>
          <Button onClick={() => onDeleteScenario(row.original)} className="ml-4">
            Delete
          </Button>
        </div>
      );
    }
  }
];


export const ScenariosOverviewDataInitialState = () => ({
  enableStickyHeader: true,
  enableTopToolbar: true,
  enableStickyFooter: true,
  enableColumnResizing: true,
  enableRowSelection: true,
  enableGrouping: true,
  editDisplayMode: "modal",
  enableFullScreenToggle: true,
  enableHiding: true,
  paginationDisplayMode: "pages",
  initialState: {
    density: "xs",
    expanded: true,
    pagination: { pageIndex: 0, pageSize: 20 },
    columnVisibility: {
      id: false,
      contract_id: false,
      stop_price_mode: false,
      description: false,
      created_at: false,
      updated_at: false
    }
  }
});

