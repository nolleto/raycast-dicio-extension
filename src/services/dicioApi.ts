import fetch from "node-fetch";

const DICIO_API_URL = 'https://significado.herokuapp.com';

class DicioApi {
  async allMeanings(word: string): Promise<DicioWord[]> {
    const response = await fetch(
      `${DICIO_API_URL}/allMeanings/${word}`,
    );

    return await response.json() as DicioWord[];
  }
}

export default new DicioApi()
