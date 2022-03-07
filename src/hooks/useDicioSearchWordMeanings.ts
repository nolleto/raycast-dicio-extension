import dicioApi, { AbortRequestError, ApiResponse } from "../services/dicioApi";
import { useRef, useState } from "react";

type useDicioSearchWordsProps = {
  onPending: (word: string) => void;
  onFulfilled: (word: string, dicioWords: DicioWord[]) => void;
  onError: (word: string, error: string) => void;
  onCancel: () => void;
}

type useDicioSearchWordsResult = {
  isLoading: boolean;
  search: (word: string) => void;
}

export default function useDicioSearchWords({
  onPending,
  onFulfilled,
  onError,
  onCancel,
}: useDicioSearchWordsProps): useDicioSearchWordsResult {
  const [isLoading, setIsLoading] = useState(false);
  const searchRequest = useRef<ApiResponse<DicioWord[]>>()

  const setLoadingState = (word: string) => {
    onPending(word)
    setIsLoading(true)
  }

  const cancelSearch = () => {
    if (searchRequest.current) {
      searchRequest.current.cancel()
      searchRequest.current = undefined
      onCancel()
    }
  }

  const search = async (word: string) => {
    cancelSearch()

    if (!word.trim()) return;

    setLoadingState(word)

    try {
      searchRequest.current = dicioApi.allMeanings(word);
      const dicioWords = await searchRequest.current
      const hasResults = Boolean(dicioWords.length)

      if (hasResults) {
        onFulfilled(word, dicioWords)
      } else {
        throw new Error(`Nenhum resultado para a palavra "${word}"`)
      }

    } catch (error) {
      if (error instanceof AbortRequestError) {
        // does nothing
      } else if (error instanceof Error) {
        onError(word, error.message);
      } else {
        onError(word, 'Unknown error');
      }
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    search,
  };
}
