import { MRT_Cell, MRT_Row } from "mantine-react-table";
import {
  OperationalState, ProgressState, ProgressStateSchema,
  ScenarioSchema,
  TakeProfitLevelCreateSchema
} from "@/schemas/types";
import { ScenarioStateUtil } from "@/lib/scenario.state.util";
import { Button } from "@/components/ui/button";
import { recentScenarioProgressState } from "@/components/Scenarios/Scenarios.util";
import { IconAlertTriangle, IconArrowRight, IconCheck, IconClock, IconTrendingUp, IconX } from "@tabler/icons-react";


interface getScenarioColumnsProps {
  isUpdatingScenario: boolean;
  updatingScenarioId: string | undefined;

  onUpdateScenarioState(scenario: ScenarioSchema, state: OperationalState): Promise<void>;

  onDeleteScenario(scenario: ScenarioSchema): Promise<void>;
}

export const ProgressStateToConfig: {
  [key in ProgressState]: {
    label: string;
    color: string;
    icon: JSX.Element;
  }
} = {
  [ProgressState.INITIAL]: {
    label: "Initial",
    color: "text-gray-500",
    icon: <IconClock size={16} className="text-gray-500" />
  },
  [ProgressState.BREAKOUT_OCCURRED]: {
    label: "Breakout Occurred",
    color: "text-blue-500",
    icon: <IconArrowRight size={16} className="text-blue-500" />
  },
  [ProgressState.MINIMUM_BREAKOUT_POINTS_ACHIEVED]: {
    label: "Minimum Breakout Points Achieved",
    color: "text-green-500",
    icon: <IconTrendingUp size={16} className="text-green-500" />
  },
  [ProgressState.PRICE_RETURNED_TO_SIGNIFICANT_LEVEL]: {
    label: "Price Returned to Significant Level",
    color: "text-yellow-500",
    icon: <IconAlertTriangle size={16} className="text-yellow-500" />
  },
  [ProgressState.FIRST_15_MIN_CANDLE_CLOSED]: {
    label: "First 15 Min Candle Closed",
    color: "text-purple-500",
    icon: <IconCheck size={16} className="text-purple-500" />
  },
  [ProgressState.TWO_5_MIN_CANDLES_CLOSED]: {
    label: "Two 5 Min Candles Closed",
    color: "text-red-500",
    icon: <IconCheck size={16} className="text-red-500" />
  }
};

export const OperationalStateToConfig: {
  [key in OperationalState]: {
    label: string;
    color: string;
    icon: JSX.Element;
  };
} = {
  [OperationalState.PENDING]: {
    label: "Pending",
    color: "text-blue-500",
    icon: <IconClock size={16} className="text-blue-500" />
  },
  [OperationalState.COMPLETED]: {
    label: "Completed",
    color: "text-green-500",
    icon: <IconCheck size={16} className="text-green-500" />
  },
  [OperationalState.CANCELLED]: {
    label: "Cancelled",
    color: "text-red-500",
    icon: <IconX size={16} className="text-red-500" />
  },
  [OperationalState.ERROR]: {
    label: "Error",
    color: "text-yellow-500",
    icon: <IconAlertTriangle size={16} className="text-yellow-500" />
  },
  [OperationalState.PAUSED]: {
    label: "Paused",
    color: "text-gray-500",
    icon: <IconClock size={16} className="text-gray-500" />
  }
};

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
    accessorKey: "operational_state",
    header: "Operational State",
    Cell: ({ cell }: { cell: MRT_Cell<ScenarioSchema> }) => {
      const operationalState = cell.getValue() as OperationalState;

      if (!operationalState) {
        return <span>No operational state</span>;
      }

      const stateConfig = OperationalStateToConfig[operationalState];

      if (!stateConfig) {
        return <span>Unknown state</span>;
      }

      return (
        <div className="flex items-center gap-2">
          {stateConfig.icon}
          <span className={stateConfig.color}>{stateConfig.label}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "progress_state",
    header: "Progress State",
    Cell: ({ cell }: { cell: MRT_Cell<ScenarioSchema> }) => {
      const scenarioProgressState = cell.getValue() as ProgressStateSchema[];
      const scenarioRecentState = recentScenarioProgressState(scenarioProgressState);

      if (!scenarioRecentState) {
        return <span>No progress state</span>;
      }

      const { state } = scenarioRecentState;
      const stateConfig = ProgressStateToConfig[state];

      if (!stateConfig) {
        return <span>Unknown state</span>;
      }

      return (
        <div className="flex items-center gap-2">
          {stateConfig.icon}
          <span className={stateConfig.color}>{stateConfig.label}</span>
        </div>
      );
    }
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

