import { createContext, useContext, useReducer } from "react";

type MoviesProviderProps = {
  children: React.ReactNode;
};

type MoviesContextType = {
  mediaType: string;
  currentPage: number;
  totalPages?: number;
  search: string;
  onPageChange: (page: number) => void;
  onMediaChange: (media: string) => void;
};

type MoviesState = {
  mediaType: string;
  currentPage: number;
  search: string;
};
type MoviesAction =
  | {
      type: "currentPage/changed";
      payLoad: number;
    }
  | {
      type: "mediaType/changed";
      payLoad: string;
    }
  | {
      type: "search/changed";
      payLoad: string;
    };

const intialState = {
  mediaType: "all",
  currentPage: 1,
  search: "",
};
function reducer(state: MoviesState, action: MoviesAction) {
  switch (action.type) {
    case "currentPage/changed":
      return { ...state, currentPage: action.payLoad };

    case "mediaType/changed":
      return { ...state, currentPage: 1, mediaType: action.payLoad };

    default:
      throw new Error("unknow Action");
  }
}
export const MoviesContext = createContext({} as MoviesContextType);

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [{ mediaType, currentPage, search }, dispatch] = useReducer(
    reducer,
    intialState
  );

  function onPageChange(currPage: number) {
    dispatch({ type: "currentPage/changed", payLoad: currPage });
  }
  function onMediaChange(media: string) {
    dispatch({ type: "mediaType/changed", payLoad: media });
  }

  return (
    <MoviesContext.Provider
      value={{ mediaType, currentPage, search, onPageChange, onMediaChange }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMoviesContext() {
  const context: MoviesContextType = useContext(MoviesContext);
  return context;
}
