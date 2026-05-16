import { SmartTable } from '@/components/SmartTable/SmartTable';
import { ExportTableToCsvButton } from '@/components/SmartTable/ExportTableToCsvButton';
import { useEffect, useMemo, useState } from 'react';
import { Switch } from '@mantine/core';
import useScenarioStore from '@/store/actions/scenario';
import {
  useDeleteScenarioMutation,
  useSearchScenariosMutation,
  useUpdateScenarioMutation,
} from '@/store/api/scenarioApi';
import {
  getScenarioColumns,
  ScenariosOverviewDataInitialState,
} from '@/components/Scenarios/ScenariosOverview/ScenariosOverview.util';
import {
  OperationalState,
  OperationalStateType,
  ScenarioSchema,
  StrategyTypeEnum,
  TradeResultsType,
} from '@/schemas/types';
import { type MRT_ColumnDef } from 'mantine-react-table';
import { useCancelTradesByScenarioMutation } from '@/store/api/tradeApi';
import { useSellMarketByScenarioMutation } from '@/store/api/tradeApi';
import { Modal, Button as MantineButton } from '@mantine/core';

const ScenariosOverview = () => {
  const [searchScenarios, { data }] = useSearchScenariosMutation();
  const [updateScenario, { isLoading: isUpdatingScenario, originalArgs }] =
    useUpdateScenarioMutation();
  const { setScenarios, scenarios } = useScenarioStore();
  const [deleteScenario] = useDeleteScenarioMutation();
  const [cancelTradesByScenario] = useCancelTradesByScenarioMutation();
  const [sellMarketByScenario] = useSellMarketByScenarioMutation();

  const [isFastProtocol, setIsFastProtocol] = useState(false);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const activeScenarios = useMemo(
    () =>
      (scenarios || []).filter(
        (s) =>
          s.operational_state === OperationalState.PENDING ||
          s.operational_state === OperationalState.PAUSED,
      ),
    [scenarios],
  );

  useEffect(() => {
    if (activeScenarios.length > 0) {
      setIsFastProtocol(
        activeScenarios.every((s) => (s.strategy as StrategyTypeEnum) === StrategyTypeEnum.FAST_BREAKOUT),
      );
    }
  }, [activeScenarios]);

  const handleFastProtocolToggle = async (enabled: boolean) => {
    setIsFastProtocol(enabled);
    setIsBulkUpdating(true);
    try {
      await Promise.all(
        activeScenarios.map((s) =>
          updateScenario({
            scenarioId: s.id,
            fields: {
              strategy: enabled
                ? StrategyTypeEnum.FAST_BREAKOUT
                : StrategyTypeEnum.FALSE_BREAKOUT,
            },
          }).unwrap(),
        ),
      );
      await fetchScenarios();
    } finally {
      setIsBulkUpdating(false);
    }
  };

  // Modal state for removing pending broker orders
  const [pendingModalOpen, setPendingModalOpen] = useState(false);
  const [pendingScenario, setPendingScenario] = useState<ScenarioSchema | null>(
    null,
  );

  // Modal state for selling market orders
  const [sellMarketModalOpen, setSellMarketModalOpen] = useState(false);
  const [sellMarketScenario, setSellMarketScenario] =
    useState<ScenarioSchema | null>(null);

  const handleOpenPendingModal = (scenario: ScenarioSchema) => {
    setPendingScenario(scenario);
    setPendingModalOpen(true);
  };

  const handleClosePendingModal = () => {
    setPendingModalOpen(false);
    setPendingScenario(null);
  };

  const handleConfirmPendingModal = async () => {
    if (pendingScenario) {
      await onCancelTradesByScenario(pendingScenario);
      handleClosePendingModal();
    }
  };

  const handleOpenSellMarketModal = (scenario: ScenarioSchema) => {
    setSellMarketScenario(scenario);
    setSellMarketModalOpen(true);
  };

  const handleCloseSellMarketModal = () => {
    setSellMarketModalOpen(false);
    setSellMarketScenario(null);
  };

  const handleConfirmSellMarketModal = async () => {
    if (sellMarketScenario) {
      await onSellMarketByScenario(sellMarketScenario);
      handleCloseSellMarketModal();
    }
  };

  const fetchScenarios = async () => {
    const scenarios = await searchScenarios({}).unwrap();
    setScenarios(scenarios);
  };

  useEffect(() => {
    if (data) {
      setScenarios(data);
    } else {
      fetchScenarios();
    }
  }, [data, setScenarios]);

  const onCancelTradesByScenario = async (scenario: ScenarioSchema) => {
    await cancelTradesByScenario({ scenarioId: scenario.id }).unwrap();
    await fetchScenarios();
  };

  const onSellMarketByScenario = async (scenario: ScenarioSchema) => {
    await sellMarketByScenario({ scenarioId: scenario.id }).unwrap();
    await fetchScenarios();
  };

  const onUpdateScenarioState = async (
    scenario: ScenarioSchema,
    state: OperationalStateType,
    tradeResult?: TradeResultsType,
  ) => {
    await updateScenario({
      scenarioId: scenario.id,
      fields: {
        operational_state: state,
        trade_result: tradeResult,
      },
    }).unwrap();
    fetchScenarios();
  };

  const onDeleteScenario = async (scenario: ScenarioSchema) => {
    await deleteScenario({ scenarioId: scenario.id }).unwrap();
    await fetchScenarios();
  };

  const { scenarioId: updatingScenarioId } = originalArgs || {};

  const columns = useMemo<MRT_ColumnDef<ScenarioSchema>[]>(
    () =>
      getScenarioColumns({
        onUpdateScenarioState,
        isUpdatingScenario,
        updatingScenarioId,
        onDeleteScenario,
        onCancelTradesByScenario, // pass for legacy, but not used for modal
        onOpenPendingModal: handleOpenPendingModal, // new handler
        onSellMarketModal: handleOpenSellMarketModal, // new handler
      }),
    [isUpdatingScenario],
  );

  const config = ScenariosOverviewDataInitialState();

  return (
    <>
      <div className='flex items-center gap-3 mb-3 px-3 py-2 rounded-md border border-amber-200 bg-amber-50'>
        <Switch
          checked={isFastProtocol}
          onChange={(e) => handleFastProtocolToggle(e.currentTarget.checked)}
          disabled={isBulkUpdating || activeScenarios.length === 0}
          color='orange'
          label='Fast Protocol'
          size='md'
        />
        <span className='text-sm text-amber-700'>
          {isBulkUpdating
            ? 'Updating...'
            : `${activeScenarios.length} active scenario${activeScenarios.length !== 1 ? 's' : ''}`}
        </span>
      </div>
      <SmartTable
        className='w-full'
        columns={columns}
        data={scenarios || []}
        config={config}
        TableToolbarActions={ExportTableToCsvButton}
        fileNameOnExport='scenarios'
        dateRangeField='date_trade'
      />
      <Modal
        opened={pendingModalOpen}
        onClose={handleClosePendingModal}
        title='Remove Pending Broker Orders?'
        centered
      >
        <div>
          Are you sure you want to remove all pending broker orders for this
          scenario?
        </div>
        <div className='flex justify-end gap-2 mt-4'>
          <MantineButton variant='outline' onClick={handleClosePendingModal}>
            Cancel
          </MantineButton>
          <MantineButton color='red' onClick={handleConfirmPendingModal}>
            Yes, Remove
          </MantineButton>
        </div>
      </Modal>
      <Modal
        opened={sellMarketModalOpen}
        onClose={handleCloseSellMarketModal}
        title='Sell Market Orders?'
        centered
      >
        <div>
          Are you sure you want to sell market orders for this scenario?
        </div>
        <div className='flex justify-end gap-2 mt-4'>
          <MantineButton variant='outline' onClick={handleCloseSellMarketModal}>
            Cancel
          </MantineButton>
          <MantineButton color='blue' onClick={handleConfirmSellMarketModal}>
            Yes, Sell Market
          </MantineButton>
        </div>
      </Modal>
    </>
  );
};

export default ScenariosOverview;
