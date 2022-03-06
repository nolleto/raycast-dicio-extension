import { Detail } from '@raycast/api';
import { formatDicioToMarkdown } from '../formatter/string/markdown';

export default function WordDetails({ dicioWords, word }: { word: string, dicioWords: DicioWord[] }) {
  const markdown = formatDicioToMarkdown(word, dicioWords)

  return (
    <Detail markdown={markdown} />
  );
}
