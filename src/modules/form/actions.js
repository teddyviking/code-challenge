import { FORM_CHANGE, EMPTY_FORM } from './actionTypes';

export function changeForm(change) {
  return {
    type: FORM_CHANGE,
    change,
  };
}

export function emptyForm() {
  return {
    type: EMPTY_FORM,
  };
}
