import { actionTypes as types } from "../constants";

const initialState = {
  cells: [],
  teams: [],
  isLoading: false,
  rounds: [],
  currentRound: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_GAME:
      return {
        ...state,
        isLoading: true,
      };
    case types.RESPONSE_GAME_SUCCESS:
    case types.RECEIVED_GAME_UPDATE:
      const roundsLength = action.data.rounds.length;
      let currentRound = null;
      if (roundsLength > 0) {
        currentRound = action.data.rounds[roundsLength - 1];
      }
      return {
        ...state,
        isLoading: false,
        cells: action.data.cells,
        teams: action.data.teams,
        rounds: action.data.rounds,
        currentRound,
      };
    default:
      return state;
  }
}
