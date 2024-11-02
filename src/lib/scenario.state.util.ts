import { OperationalState } from "@/schemas/types";

export class ScenarioStateUtil {

  constructor(state: OperationalState) {
    this.state = state;
  }

  private readonly state: OperationalState;

  isPaused() {
    return this.state === OperationalState.PAUSED;
  }

  isCompleted() {
    return this.state === OperationalState.COMPLETED;
  }

  isCancelled() {
    return this.state === OperationalState.CANCELLED;
  }

  isPending() {
    return this.state === OperationalState.PENDING;
  }
}