import {MRT_Cell, type MRT_ColumnDef, MRT_Row} from 'mantine-react-table';
import {
    OperationalState,
    ProgressState,
    ProgressStateSchema,
    ScenarioSchema,
    StrategyTypeEnum,
    TakeProfitLevelCreateSchema,
} from '@/schemas/types';
import {Button} from '@/components/ui/button';
import {
    IconAlertTriangle,
    IconArrowRight,
    IconCheck,
    IconClock,
    IconTrendingUp,
    IconX,
    IconPlayerPause,
    IconPlayerPlay,
    IconTrash,
    IconPlayerStop,
} from '@tabler/icons-react';
import {ScenarioStateUtil} from '@/lib/scenario.state.util';
import {Tooltip} from '@mantine/core';

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
        accessorKey: 'take_profit_levels',
        header: 'Take Profit Levels',
        Cell: ({row}: { row: MRT_Row<ScenarioSchema> }) => {
            const levels = row.original.take_profit_levels;
            return levels?.length ? (
                <span>
          {levels.map((level: TakeProfitLevelCreateSchema, idx: number) => (
              <div key={idx}>
                  <span className='mr-2'>{level.price}</span>
                  <>/</>
                  <span className='ml-2'>{level.quantity}</span>
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
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({row}: { row: MRT_Row<ScenarioSchema> }) => {
            const scenario = row.original;
            const {operational_state, id, trade_result} = scenario;

            const isDisabled = isUpdatingScenario && updatingScenarioId === id;

            const isPauseResumeDisabled =
                isDisabled ||
                !operational_state ||
                operational_state === OperationalState.COMPLETED ||
                operational_state === OperationalState.CANCELLED;

            const stateUtil = new ScenarioStateUtil(
                operational_state as OperationalState
            );
            const buttonText = stateUtil.isPaused() ? 'Resume' : 'Pause';
            const stateToSet = stateUtil.isPaused()
                ? OperationalState.PENDING
                : OperationalState.PAUSED;

            const isCompleted = operational_state === OperationalState.COMPLETED;

            // Check if date_trade is today
            let isToday = false;
            if (scenario.date_trade) {
                const tradeDate = new Date(scenario.date_trade);
                const now = new Date();
                isToday =
                    tradeDate.getFullYear() === now.getFullYear() &&
                    tradeDate.getMonth() === now.getMonth() &&
                    tradeDate.getDate() === now.getDate();
            }

            // Button is enabled only if completed AND today
            const canRemovePending = isCompleted && isToday;

            // Determine tooltip message for pending broker orders button
            let pendingTooltip = 'Remove Pending Broker Orders';
            if (!canRemovePending) {
                const reasons = [];
                if (!isCompleted) reasons.push('Scenario is not completed');
                if (!isToday) reasons.push('Trade date is not today');
                pendingTooltip = 'Cannot remove: ' + reasons.join(' and ');
            }

            return (
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-center gap-2'>
                        <Tooltip label={`${buttonText} Scenario`} withinPortal>
                            <Button
                                disabled={isPauseResumeDisabled}
                                onClick={() =>
                                    onUpdateScenarioState(
                                        scenario,
                                        stateToSet,
                                        trade_result ?? undefined
                                    )
                                }
                                size='icon'
                                variant='outline'
                                color={stateUtil.isPaused() ? 'green' : 'yellow'}
                            >
                                {stateUtil.isPaused() ? (
                                    <IconPlayerPlay size={16}/>
                                ) : (
                                    <IconPlayerPause size={16}/>
                                )}
                            </Button>
                        </Tooltip>
                        <Tooltip label={pendingTooltip} withinPortal>
              <span>
                <Button
                    onClick={() => onOpenPendingModal(scenario)}
                    className='ml-2'
                    size='icon'
                    variant='outline'
                    color='red'
                    disabled={!canRemovePending}
                >
                  <IconPlayerStop size={16}/>
                </Button>
              </span>
                        </Tooltip>
                        <Tooltip label='Delete Scenario' withinPortal>
                            <Button
                                onClick={() => onDeleteScenario(scenario)}
                                className='ml-2'
                                size='icon'
                                variant='outline'
                                color='red'
                            >
                                <IconTrash size={16}/>
                            </Button>
                        </Tooltip>
                    </div>
                    {isCompleted && (
                        <div className='flex flex-col gap-2'>
                            <div className='h-px bg-gray-300 w-full my-2'/>
                            <div className='flex items-center justify-between gap-1 ml-2'>
                                {/* Profit Button */}
                                <Tooltip
                                    label={
                                        trade_result === 'profit'
                                            ? 'Already set to Profit'
                                            : 'Set as Profit'
                                    }
                                    withinPortal
                                >
                                    <div>
                                        <Button
                                            onClick={() =>
                                                onUpdateScenarioState(
                                                    scenario,
                                                    operational_state as OperationalState,
                                                    'profit'
                                                )
                                            }
                                            size='icon'
                                            variant='outline'
                                            className='border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600'
                                            disabled={isDisabled || trade_result === 'profit'}
                                        >
                                            <IconCheck size={16}/>
                                        </Button>
                                    </div>
                                </Tooltip>
                                <Tooltip
                                    label={
                                        trade_result === 'loss'
                                            ? 'Already set to Loss'
                                            : 'Set as Loss'
                                    }
                                    withinPortal
                                >
                                    <div>
                                        <Button
                                            onClick={() =>
                                                onUpdateScenarioState(
                                                    scenario,
                                                    operational_state as OperationalState,
                                                    'loss'
                                                )
                                            }
                                            size='icon'
                                            variant='outline'
                                            className='border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600'
                                            disabled={isDisabled || trade_result === 'loss'}
                                        >
                                            <IconX size={16}/>
                                        </Button>
                                    </div>
                                </Tooltip>
                                <Tooltip
                                    label={
                                        trade_result === 'cancelled'
                                            ? 'Already set to Cancelled'
                                            : 'Set as Cancelled (entry spike)'
                                    }
                                    withinPortal
                                >
                                    <div>
                                        <Button
                                            onClick={() =>
                                                onUpdateScenarioState(
                                                    scenario,
                                                    operational_state as OperationalState,
                                                    'cancelled'
                                                )
                                            }
                                            size='icon'
                                            variant='outline'
                                            className='border-yellow-500 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600'
                                            disabled={isDisabled || trade_result === 'cancelled'}
                                        >
                                            <IconAlertTriangle size={16}/>
                                        </Button>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    )}
                </div>
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
