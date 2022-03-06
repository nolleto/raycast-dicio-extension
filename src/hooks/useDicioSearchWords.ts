import fetch from "node-fetch";
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

  const search = (word: string) => {
    if (!word.trim()) return;

    onPending(word)
    setIsLoading(true)

    fetch(`https://significado.herokuapp.com/allMeanings/${word}`)
      .then(response => response.json() as Promise<DicioSearchWordsResponse>)
      .then((data) => {
        const hasResults = Boolean(data.length)

        if (hasResults) {
          onFulfilled(word, data)
        } else {
          throw new Error(`Nenhum resultado para a palavra "${word}"`)
        }
      })
      .catch((error) => {
        onError(word, error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  };

  return {
    isLoading,
    search,
  };
}
