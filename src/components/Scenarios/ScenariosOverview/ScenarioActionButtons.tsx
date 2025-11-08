import { Button } from '@/components/ui/button';
import { Tooltip } from '@mantine/core';
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerStop,
  IconShoppingCart,
  IconTrash,
} from '@tabler/icons-react';
import { OperationalState, ScenarioSchema } from '@/schemas/types';
import { ScenarioStateUtil } from '@/lib/scenario.state.util';

interface ScenarioActionButtonsProps {
  scenario: ScenarioSchema;
  isUpdatingScenario: boolean;
  updatingScenarioId: string | undefined;
  onUpdateScenarioState: (
    scenario: ScenarioSchema,
    state: OperationalState,
    tradeResult?: string
  ) => Promise<void>;
  onDeleteScenario: (scenario: ScenarioSchema) => Promise<void>;
  onOpenPendingModal: (scenario: ScenarioSchema) => void;
  onSellMarketModal: (scenario: ScenarioSchema) => void;
}

export const ScenarioActionButtons = ({
  scenario,
  isUpdatingScenario,
  updatingScenarioId,
  onUpdateScenarioState,
  onDeleteScenario,
  onOpenPendingModal,
  onSellMarketModal,
}: ScenarioActionButtonsProps) => {
  const { operational_state, id, trade_result } = scenario;

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

  // Check if date_trade is today or tomorrow
  let isTodayOrTomorrow = false;
  if (scenario.date_trade) {
    const tradeDate = new Date(scenario.date_trade);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    isTodayOrTomorrow =
      (tradeDate.getFullYear() === now.getFullYear() &&
        tradeDate.getMonth() === now.getMonth() &&
        tradeDate.getDate() === now.getDate()) ||
      (tradeDate.getFullYear() === tomorrow.getFullYear() &&
        tradeDate.getMonth() === tomorrow.getMonth() &&
        tradeDate.getDate() === tomorrow.getDate());
  }

  // Button is enabled only if completed AND today
  const canRemovePending = isCompleted && isToday;

  // Button is enabled only if completed AND (today or tomorrow)
  const canSellMarket = isCompleted && isTodayOrTomorrow;

  // Determine tooltip message for pending broker orders button
  const pendingTooltip = !canRemovePending
    ? `Cannot remove: ${[
        !isCompleted && 'Scenario is not completed',
        !isToday && 'Trade date is not today',
      ]
        .filter(Boolean)
        .join(' and ')}`
    : 'Remove Pending Broker Orders';

  const sellMarketTooltip = !canSellMarket
    ? `Cannot sell market: ${[
        !isCompleted && 'Scenario is not completed',
        !isTodayOrTomorrow && 'Trade date is not today or tomorrow',
      ]
        .filter(Boolean)
        .join(' and ')}`
    : 'Sell Market';

  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full'>
      <div className='flex gap-4'>
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
              <IconPlayerPlay size={16} />
            ) : (
              <IconPlayerPause size={16} />
            )}
          </Button>
        </Tooltip>
        <Tooltip label={pendingTooltip} withinPortal>
          <span>
            <Button
              onClick={() => onOpenPendingModal(scenario)}
              size='icon'
              variant='outline'
              color='red'
              disabled={!canRemovePending}
            >
              <IconPlayerStop size={16} />
            </Button>
          </span>
        </Tooltip>
      </div>
      <div className='h-px bg-gray-300 w-full my-1' />
      {/* Bottom row: Sell Market and Delete */}
      <div className='flex gap-4'>
        <Tooltip label={sellMarketTooltip} withinPortal>
          <span>
            <Button
              onClick={() => onSellMarketModal(scenario)}
              size='icon'
              variant='outline'
              color='blue'
              disabled={!canSellMarket}
            >
              <IconShoppingCart size={16} />
            </Button>
          </span>
        </Tooltip>
        <Tooltip label='Delete Scenario' withinPortal>
          <Button
            onClick={() => onDeleteScenario(scenario)}
            size='icon'
            variant='outline'
            color='red'
          >
            <IconTrash size={16} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
