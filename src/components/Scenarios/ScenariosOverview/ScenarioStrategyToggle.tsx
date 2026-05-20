import { useRef, useState } from 'react';
import { Switch } from '@mantine/core';
import { ProgressState, ScenarioSchema, StrategyTypeEnum } from '@/schemas/types';
import { usePatchScenarioStrategyMutation } from '@/store/api/scenarioApi';
import useScenarioStore from '@/store/actions/scenario';
import { ScenarioState } from '@/store/@types/scenario';

interface Props {
    scenario: ScenarioSchema;
}

const ScenarioStrategyToggle = ({ scenario }: Props) => {
    const [patchStrategy] = usePatchScenarioStrategyMutation();
    const updateScenarioInList = useScenarioStore((s: ScenarioState) => s.updateScenarioInList);

    const [optimisticStrategy, setOptimisticStrategy] = useState<string | null | undefined>(
        scenario.strategy,
    );
    const [error, setError] = useState<string | null>(null);
    const errorTimer = useRef<ReturnType<typeof setTimeout>>();

    const states = scenario.progress_state;
    const currentProgressState = states?.[states.length - 1]?.state;
    const isDisabled = currentProgressState !== ProgressState.INITIAL;

    const isFast = (optimisticStrategy as string) === StrategyTypeEnum.FAST_BREAKOUT;

    const handleChange = async (checked: boolean) => {
        const newStrategy = checked ? StrategyTypeEnum.FAST_BREAKOUT : StrategyTypeEnum.FALSE_BREAKOUT;
        const previous = optimisticStrategy;

        setOptimisticStrategy(newStrategy);
        setError(null);
        clearTimeout(errorTimer.current);

        try {
            const updated = await patchStrategy({ scenarioId: scenario.id, strategy: newStrategy }).unwrap();
            updateScenarioInList(updated);
        } catch (err: any) {
            setOptimisticStrategy(previous);
            const msg =
                err?.status === 409
                    ? 'Strategy cannot be changed after the scenario has started.'
                    : 'Failed to update strategy.';
            setError(msg);
            errorTimer.current = setTimeout(() => setError(null), 4000);
        }
    };

    return (
        <div className='flex flex-col gap-1'>
            <Switch
                checked={isFast}
                onChange={(e) => handleChange(e.currentTarget.checked)}
                disabled={isDisabled}
                onLabel='Fast'
                offLabel='Slow'
                color='orange'
                size='md'
            />
            {error && <span className='text-xs text-red-500'>{error}</span>}
        </div>
    );
};

export default ScenarioStrategyToggle;
