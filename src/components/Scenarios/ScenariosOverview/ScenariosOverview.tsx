"use client";

import { SmartTable } from "@/components/SmartTable/SmartTable";
import { useEffect, useMemo, useState } from "react";
import useScenarioStore from "@/store/actions/trade";
import { useSearchScenariosMutation, useUpdateScenarioMutation } from "@/store/api/scenarioApi";
import {
  getScenarioColumns,
  ScenariosOverviewDataInitialState
} from "@/components/Scenarios/ScenariosOverview/ScenariosOverview.util";
import { OperationalStateType, ScenarioSchema } from "@/schemas/types";

export const ScenariosOverview = () => {
  const [searchScenarios, { data }] = useSearchScenariosMutation();
  const [updateScenario, { isLoading: isUpdatingScenario, originalArgs }] = useUpdateScenarioMutation();
  const { setScenarios, scenarios } = useScenarioStore();

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

  const onUpdateScenarioState = async (scenario: ScenarioSchema, state: OperationalStateType) => {
    await updateScenario(
      {
        scenarioId: scenario.id,
        fields: {
          operational_state: state
        }
      }
    ).unwrap();
    fetchScenarios();
  };

  const { scenarioId: updatingScenarioId } = originalArgs || {};

  const columns = useMemo(() => getScenarioColumns({
    onUpdateScenarioState,
    isUpdatingScenario,
    updatingScenarioId
  }), [isUpdatingScenario]);

  const config = ScenariosOverviewDataInitialState();

  return (
    <SmartTable
      className="w-full"
      columns={columns}
      data={scenarios || []}
      config={config}
    />
  );
};

