import { actionTypes as types } from "../constants";

const initialState = {
  status: null,
  cells: [],
  teams: [],
  rounds: [],
  currentRound: null,
  gameOwner: null,
  message: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_WS_GAME_OPEN:
      return {
        status: null,
        cells: [],
        teams: [],
        rounds: [],
        currentRound: null,
        gameOwner: null,
      };
    case types.REQUEST_GAME:
      return {
        ...state,
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
        status: action.data.status,
        cells: action.data.cells,
        teams: action.data.teams,
        rounds: action.data.rounds,
        gameOwner: action.data.owner,
        currentRound,
      };
    case types.RESPONSE_GAME_FAIL:
      return {
        ...state,
        message: { message: action.data, type: "error" },
      };
    case types.RESPONSE_SUBMIT_CELL_SUCCESS:
      if (action.data.status == 200) var type = "success";
      else var type = "warning";
      return {
        ...state,
        message: { message: action.data.message, type },
      };
    default:
      return state;
  }
}
