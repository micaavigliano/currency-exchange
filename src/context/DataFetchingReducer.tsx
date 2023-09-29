enum ActionFetch {
    FETCH_SUCCESS = 'FETCH_SUCCESS',
    FETCH_ERROR = 'FETCH_ERROR'
}

interface FetchActionState {
    type: ActionFetch,
    payload: any
}

interface FetchState {
    loading: boolean,
    error: string,
    data: {}
}

export const DataFetchingReducer = (state:FetchState, action: FetchActionState) => {
    switch (action.type) {
      case "FETCH_SUCCESS":
        return {
          loading: false,
          error: "",
          post: action.payload
        };
      case "FETCH_ERROR":
        return {
          loading: true,
          error: "Something Went Wrong",
          post: {}
        };
      default:
        return state;
    }
  };
  