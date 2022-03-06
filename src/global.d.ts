type DicioWord = {
  class: string;
  meanings: string[];
  etymology: string
}

type DicioError = {
  error: string;
}

type DicioSearchWordsResponse = DicioWord[]
