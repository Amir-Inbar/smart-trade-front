import { SmartTable } from '@/components/SmartTable/SmartTable';
import { useEffect, useMemo } from 'react';
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

const ScenariosOverview = () => {
  const [searchScenarios, { data }] = useSearchScenariosMutation();
  const [updateScenario, { isLoading: isUpdatingScenario, originalArgs }] =
    useUpdateScenarioMutation();
  const { setScenarios, scenarios } = useScenarioStore();
  const [deleteScenario] = useDeleteScenarioMutation();

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

  const onUpdateScenarioState = async (
    scenario: ScenarioSchema,
    state: OperationalStateType,
    tradeResult?: TradeResultsType
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
      }),
    [isUpdatingScenario]
  );

  const config = ScenariosOverviewDataInitialState();

  return (
    <SmartTable
      className='w-full'
      columns={columns}
      data={scenarios || []}
      config={config}
    />
  );
};

export default ScenariosOverview;
