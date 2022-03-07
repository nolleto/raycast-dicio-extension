import dicioApi from "../services/dicioApi";
import { useState } from "react";

type useDicioSearchWordsProps = {
  onPending: (word: string) => void;
  onFulfilled: (word: string, dicioWords: DicioWord[]) => void;
  onError: (word: string, error: string) => void;
}

type useDicioSearchWordsResult = {
  isLoading: boolean;
  search: (word: string) => void;
}

export default function useDicioSearchWords({
  onPending,
  onFulfilled,
  onError,
}: useDicioSearchWordsProps): useDicioSearchWordsResult {
  const [isLoading, setIsLoading] = useState(false);

  const search = async (word: string) => {
    if (!word.trim()) return;

    onPending(word)
    setIsLoading(true)

    try {
      const dicioWords = await dicioApi.allMeanings(word);
      const hasResults = Boolean(dicioWords.length)

      if (hasResults) {
        onFulfilled(word, dicioWords)
      } else {
        throw new Error(`Nenhum resultado para a palavra "${word}"`)
      }

    } catch (error) {
      if (error instanceof Error) {
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
