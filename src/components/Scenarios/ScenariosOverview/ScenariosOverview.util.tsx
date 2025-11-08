import {MRT_Cell, type MRT_ColumnDef, MRT_Row} from 'mantine-react-table';
import {
    OperationalState,
    ProgressState,
    ProgressStateSchema,
    ScenarioSchema,
    StrategyTypeEnum,
} from '@/schemas/types';
import {
    IconAlertTriangle,
    IconArrowRight,
    IconCheck,
    IconClock,
    IconTrendingUp,
    IconX,
} from '@tabler/icons-react';
import {ScenarioActionButtons} from './ScenarioActionButtons';
import {ScenarioTradeResultButtons} from './ScenarioTradeResultButtons';

interface getScenarioColumnsProps {
    isUpdatingScenario: boolean;
    updatingScenarioId: string | undefined;

    onUpdateScenarioState(
        scenario: ScenarioSchema,
        state: OperationalState,
        tradeResult?: string
    ): Promise<void>;

    onDeleteScenario(scenario: ScenarioSchema): Promise<void>;

    onCancelTradesByScenario(scenario: ScenarioSchema): Promise<void>;

    onOpenPendingModal: (scenario: ScenarioSchema) => void; // new
    onSellMarketModal: (scenario: ScenarioSchema) => void; // new
}

export const ProgressStateToConfig: {
    [key in ProgressState]: {
        label: string;
        color: string;
        icon: JSX.Element;
    };
} = {
    [ProgressState.INITIAL]: {
        label: 'Initial',
        color: 'text-gray-500',
        icon: <IconClock size={16} className='text-gray-500'/>,
    },
    [ProgressState.BREAKOUT_OCCURRED]: {
        label: 'Breakout Occurred',
        color: 'text-blue-500',
        icon: <IconArrowRight size={16} className='text-blue-500'/>,
    },
    [ProgressState.MINIMUM_BREAKOUT_POINTS_ACHIEVED]: {
        label: 'Minimum Breakout Points Achieved',
        color: 'text-green-500',
        icon: <IconTrendingUp size={16} className='text-green-500'/>,
    },
    [ProgressState.PRICE_RETURNED_TO_SIGNIFICANT_LEVEL]: {
        label: 'Price Returned to Significant Level',
        color: 'text-yellow-500',
        icon: <IconAlertTriangle size={16} className='text-yellow-500'/>,
    },
    [ProgressState.FIRST_15_MIN_CANDLE_CLOSED]: {
        label: 'First 15 Min Candle Closed',
        color: 'text-purple-500',
        icon: <IconCheck size={16} className='text-purple-500'/>,
    },
    [ProgressState.TWO_5_MIN_CANDLES_CLOSED]: {
        label: 'Two 5 Min Candles Closed',
        color: 'text-red-500',
        icon: <IconCheck size={16} className='text-red-500'/>,
    },
};

export const SelectStrategiesOptions = {
    [StrategyTypeEnum.FALSE_BREAKOUT]: 'False Breakout',
};

export const OperationalStateToConfig: {
    [key in OperationalState]: {
        label: string;
        color: string;
        icon: JSX.Element;
    };
} = {
    [OperationalState.PENDING]: {
        label: 'Pending',
        color: 'text-blue-500',
        icon: <IconClock size={16} className='text-blue-500'/>,
    },
    [OperationalState.COMPLETED]: {
        label: 'Completed',
        color: 'text-green-500',
        icon: <IconCheck size={16} className='text-green-500'/>,
    },
    [OperationalState.CANCELLED]: {
        label: 'Cancelled',
        color: 'text-red-500',
        icon: <IconX size={16} className='text-red-500'/>,
    },
    [OperationalState.ERROR]: {
        label: 'Error',
        color: 'text-yellow-500',
        icon: <IconAlertTriangle size={16} className='text-yellow-500'/>,
    },
    [OperationalState.PAUSED]: {
        label: 'Paused',
        color: 'text-gray-500',
        icon: <IconClock size={16} className='text-gray-500'/>,
    },
};

export const getScenarioColumns = ({
                                       onUpdateScenarioState,
                                       isUpdatingScenario,
                                       updatingScenarioId,
                                       onDeleteScenario,
                                       onOpenPendingModal,
                                       onSellMarketModal,
                                   }: getScenarioColumnsProps): MRT_ColumnDef<ScenarioSchema>[] => [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'contract_id',
        header: 'Contract ID',
    },
    {
        accessorKey: 'is_quality_scenario',
        header: 'Quality Scenario',
        Cell: ({cell}: { cell: MRT_Cell<ScenarioSchema> }) => {
            return <span>{cell.getValue() ? 'Yes' : 'No'}</span>;
        },
    },
    {
        accessorKey: 'action',
        header: 'Action',
    },
    {
        accessorKey: 'select_strategy',
        header: 'Select Strategy',
        Cell: ({row}: { row: MRT_Row<ScenarioSchema> }) => {
            const strategy = row.original.strategy;
            const strategyLabel =
                SelectStrategiesOptions[strategy as StrategyTypeEnum];
            return strategy ? <span>{strategyLabel}</span> : <span/>;
        },
    },
    {
        accessorKey: 'break_down_price',
        header: 'Break Down Price',
    },
    {
        accessorKey: 'stop_price',
        header: 'Stop Price',
    },
    {
        accessorKey: 'stop_price_mode',
        header: 'Stop Price Mode',
    },
    {
        accessorKey: 'take_profit_prices',
        header: 'Take Profit Levels',
        Cell: ({row}: { row: MRT_Row<ScenarioSchema> }) => {
            const prices = row.original.take_profit_prices;
            return prices?.length ? (
                <span>
          {prices.map((price: number, idx: number) => (
              <div key={idx}>
                  <span className='mr-2'>{price}</span>
              </div>
          ))}
        </span>
            ) : (
                <span/>
            );
        },
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'date_trade',
        header: 'Date Trade',
        Cell: ({cell}: { cell: MRT_Cell<ScenarioSchema> }) =>
            cell.getValue()
                ? new Date(cell.getValue() as string).toLocaleDateString()
                : '-',
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
        Cell: ({cell}: { cell: MRT_Cell<ScenarioSchema> }) =>
            cell.getValue()
                ? new Date(cell.getValue() as string).toLocaleString()
                : '-',
    },
    {
        accessorKey: 'updated_at',
        header: 'Updated At',
        Cell: ({cell}: { cell: MRT_Cell<ScenarioSchema> }) =>
            cell.getValue()
                ? new Date(cell.getValue() as string).toLocaleString()
                : '-',
    },
    {
        accessorKey: 'operational_state',
        header: 'Operational State',
        Cell: ({cell}: { cell: MRT_Cell<ScenarioSchema> }) => {
            const operationalState = cell.getValue() as OperationalState;

            if (!operationalState) {
                return <span>No operational state</span>;
            }

            const stateConfig = OperationalStateToConfig[operationalState];

            if (!stateConfig) {
                return <span>Unknown state</span>;
            }

            return (
                <div className='flex items-center gap-2'>
                    {stateConfig.icon}
                    <span className={stateConfig.color}>{stateConfig.label}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'progress_state',
        header: 'Progress State',
        size: 450,
        Cell: ({cell}: { cell: MRT_Cell<ScenarioSchema> }) => {
            const scenarioProgressStates = cell.getValue() as ProgressStateSchema[];

            if (!scenarioProgressStates || scenarioProgressStates.length === 0) {
                return <span>No progress state</span>;
            }

            return (
                <div className='flex flex-col gap-2 w-full'>
                    {scenarioProgressStates.map((stateItem, index) => {
                        const {state, time} = stateItem;
                        const stateConfig = ProgressStateToConfig[state];

                        if (!stateConfig) {
                            return (
                                <div key={index} className='flex items-center gap-2'>
                                    <span>Unknown state</span>
                                    <span className='text-gray-500 text-sm'>
                    {new Date(time).toLocaleString()}
                  </span>
                                </div>
                            );
                        }

                        return (
                            <div key={index} className='flex items-center gap-2'>
                                {stateConfig.icon}
                                <span className={stateConfig.color}>{stateConfig.label}</span>
                                <span className='text-gray-500 text-sm'>
                  {new Date(time).toLocaleString()}
                </span>
                            </div>
                        );
                    })}
                </div>
            );
        },
    },
    {
        accessorKey: 'main_actions',
        header: 'Main Actions',
        Cell: ({row}: { row: MRT_Row<ScenarioSchema> }) => {
            const scenario = row.original;

            return (
                <ScenarioActionButtons
                    scenario={scenario}
                    isUpdatingScenario={isUpdatingScenario}
                    updatingScenarioId={updatingScenarioId}
                    onUpdateScenarioState={onUpdateScenarioState}
                    onOpenPendingModal={onOpenPendingModal}
                    onSellMarketModal={onSellMarketModal}
                    onDeleteScenario={onDeleteScenario}
                />
            );
        },
    },
    {
        accessorKey: 'trade_results',
        header: 'Trade Results',
        Cell: ({row}: { row: MRT_Row<ScenarioSchema> }) => {
            const scenario = row.original;
            const {operational_state} = scenario;

            const isCompleted = operational_state === OperationalState.COMPLETED;

            return isCompleted ? (
                <ScenarioTradeResultButtons
                    scenario={scenario}
                    isUpdatingScenario={isUpdatingScenario}
                    updatingScenarioId={updatingScenarioId}
                    onUpdateScenarioState={onUpdateScenarioState}
                />
            ) : (
                <span className='text-gray-400 text-sm'>Not completed</span>
            );
        },
    },
];

export const ScenariosOverviewDataInitialState = () => ({
    enableStickyHeader: true,
    enableTopToolbar: true,
    enableStickyFooter: true,
    enableColumnResizing: true,
    enableRowSelection: true,
    enableGrouping: true,
    editDisplayMode: 'modal',
    enableFullScreenToggle: true,
    enableHiding: true,
    paginationDisplayMode: 'pages',
    initialState: {
        density: 'xs',
        expanded: true,
        pagination: {pageIndex: 0, pageSize: 20},
        columnVisibility: {
            id: false,
            contract_id: false,
            stop_price_mode: false,
            description: false,
            created_at: false,
            updated_at: false,
        },
    },
});
