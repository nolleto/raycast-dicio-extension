import { Toast, showToast, useNavigation } from "@raycast/api";

import WordDetails from "./components/WordDetails";
import WordSearch from "./components/WordSearch";
import useDicioSearchWords from "./hooks/useDicioSearchWords";
import { useRef } from "react";

export default function main() {
  const { push } = useNavigation();
  const searchingWordToast = useRef<Toast>()
  const { isLoading, search } = useDicioSearchWords({
    onPending: (word) => {
      showToast({
        title: `Buscando significado da palavra "${word}"`,
        style: Toast.Style.Animated,
      }).then(toast => {
        searchingWordToast.current = toast;
      })
    },
    onFulfilled: (word, dicioWords) => {
      searchingWordToast.current?.hide()
      push(<WordDetails word={word} dicioWords={dicioWords} />)
    },
    onError: (word, error) => {
      searchingWordToast.current?.hide()
      showToast({
        title: error,
        style: Toast.Style.Failure
      })
    }
  });

  return (
    <WordSearch onSearch={search} isLoading={isLoading} />
  );
}
