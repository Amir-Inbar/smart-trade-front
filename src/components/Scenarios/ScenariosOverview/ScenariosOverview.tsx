import { SmartTable } from '@/components/SmartTable/SmartTable';
import { ExportTableToCsvButton } from '@/components/SmartTable/ExportTableToCsvButton';
import { useEffect, useMemo, useState } from 'react';
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
  OperationalStateType,
  ScenarioSchema,
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
