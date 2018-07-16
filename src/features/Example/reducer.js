// @flow

import {
  FETCH_DATA_ERROR,
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
} from './actions'

export type State = {
  title: ?string,
  text: ?string,
}

const initialState: State = {
  title: null,
  text: null,
}

export default (
  state: State = initialState,
  action: Action<any, void>,
): State => {
  const { payload, type } = action

  switch (type) {
    case FETCH_DATA_START:
      return {
        ...state,
        isLoading: true,
      }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        title: payload.title,
        text: payload.text,
      }
    case FETCH_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      }

    default:
      return state
  }
}
