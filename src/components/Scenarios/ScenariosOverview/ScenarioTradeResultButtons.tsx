import { Button } from '@/components/ui/button';
import { Tooltip } from '@mantine/core';
import { IconAlertTriangle, IconCheck, IconX } from '@tabler/icons-react';
import { OperationalState, ScenarioSchema } from '@/schemas/types';

interface ScenarioTradeResultButtonsProps {
  scenario: ScenarioSchema;
  isUpdatingScenario: boolean;
  updatingScenarioId: string | undefined;
  onUpdateScenarioState: (
    scenario: ScenarioSchema,
    state: OperationalState,
    tradeResult?: string
  ) => Promise<void>;
}

export const ScenarioTradeResultButtons = ({
  scenario,
  isUpdatingScenario,
  updatingScenarioId,
  onUpdateScenarioState,
}: ScenarioTradeResultButtonsProps) => {
  const { operational_state, id, trade_result } = scenario;

  const isDisabled = isUpdatingScenario && updatingScenarioId === id;
  const isCompleted = operational_state === OperationalState.COMPLETED;

  if (!isCompleted) {
    return null;
  }

  return (
    <div className='flex flex-wrap items-center justify-center gap-2 w-full'>
      <div className='flex gap-4'>
        <Tooltip
          label={
            trade_result === 'profit'
              ? 'Already set to Profit'
              : 'Set as Profit'
          }
          withinPortal
        >
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
            <IconCheck size={16} />
          </Button>
        </Tooltip>
        <Tooltip
          label={
            trade_result === 'loss' ? 'Already set to Loss' : 'Set as Loss'
          }
          withinPortal
        >
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
            <IconX size={16} />
          </Button>
        </Tooltip>
      </div>
      <div className='h-px bg-gray-300 w-full my-1' />
      <div className='flex gap-4'>
        <Tooltip
          label={
            trade_result === 'cancelled'
              ? 'Already set to Cancelled'
              : 'Set as Cancelled (entry spike)'
          }
          withinPortal
        >
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
            <IconAlertTriangle size={16} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
