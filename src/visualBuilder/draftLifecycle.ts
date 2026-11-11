import { sameValue } from "./pageAdapter";
export function canDiscardDraft(state: { dirty: boolean; saving: boolean }, confirm: () => boolean): boolean {
  return !state.saving && (!state.dirty || confirm());
}
export const saveResultIsClean = sameValue;
