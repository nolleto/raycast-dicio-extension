import useToast, { Toast } from './hooks/useToast';

import WordDetails from "./components/WordDetails";
import WordSearch from "./components/WordSearch";
import useDicioSearchWordMeanings from "./hooks/useDicioSearchWordMeanings";
import { useNavigation } from "@raycast/api";

export default function main() {
  const { push } = useNavigation();
  const searchingToast = useToast({ style: Toast.Style.Animated, })
  const errorToast = useToast({ style: Toast.Style.Failure, })
  const { isLoading, search } = useDicioSearchWordMeanings({
    onPending: (word) => {
      searchingToast.show({ title: `Buscando significado da palavra "${word}"` })
    },
    onFulfilled: (word, dicioWords) => {
      searchingToast.hide()
      push(<WordDetails word={word} dicioWords={dicioWords} />)
    },
    onError: (word, error) => {
      searchingToast.hide()
      errorToast.show({ title: error })
    },
    onCancel: () => {
      searchingToast.hide()
    }
  });

  return (
    <WordSearch onSearch={search} isLoading={isLoading} />
  );
}
