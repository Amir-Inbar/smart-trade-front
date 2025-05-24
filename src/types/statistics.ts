export interface TotalStatistics {
  total_scenarios: number;
  completed_scenarios: number;
  completion_rate: number;
}

export interface DistributionStatistics {
  [key: string]: number;
}

export interface TimeSeriesData {
  [date: string]: {
    starts: number;
    completions: number;
  };
}

export interface QualityMetrics {
  total_quality_scenarios: number;
  quality_scenario_completion_rate: number;
  non_quality_scenario_completion_rate: number;
  average_duration_quality: number;
  average_duration_non_quality: number;
}

export interface TimeOfDayDistribution {
  [hour: string]: number;
}

export interface StateDurations {
  [state: string]: number;
}

export interface StateTransitions {
  [state: string]: {
    [nextState: string]: number;
  };
}

export interface StateAverageTimes {
  [state: string]: string; // HH:MM format
}

export type TimePeriod = 'daily' | 'weekly' | 'monthly';

export interface BreakoutSuccessRateByHour {
  [hour: number]: {
    success_rate: number;
    total_breakouts: number;
  };
}
