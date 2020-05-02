import { actionTypes as types } from "../constants";

const initialState = {
  status: null,
  cells: [],
  teams: [],
  isLoading: false,
  rounds: [],
  currentRound: null,
  gameOwner: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_WS_GAME_OPEN:
      return {
        status: null,
        cells: [],
        teams: [],
        isLoading: false,
        rounds: [],
        currentRound: null,
        gameOwner: null,
      };
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
        status: action.data.status,
        cells: action.data.cells,
        teams: action.data.teams,
        rounds: action.data.rounds,
        gameOwner: action.data.owner,
        currentRound,
      };
    default:
      return state;
  }
}
