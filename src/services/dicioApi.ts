import fetch, { AbortError } from "node-fetch";

const DICIO_API_URL = 'https://significado.herokuapp.com';

interface CancellablePromise<T> extends Promise<T> {
  cancel: () => void;
}

export type ApiResponse<T> = CancellablePromise<T>

export const AbortRequestError = AbortError

class DicioApi {
  allMeanings(word: string): ApiResponse<DicioWord[]> {
    const controller = new AbortController();

    const promise: Partial<CancellablePromise<DicioWord[]>> = fetch(
      `${DICIO_API_URL}/allMeanings/${word}`,
      { signal: controller.signal }
    )
      .then((response) => response.json() as Promise<DicioWord[]>)

    promise.cancel = () => {
      controller.abort()
    }

    return promise as ApiResponse<DicioWord[]>
  }
}

export default new DicioApi()
