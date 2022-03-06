import capitalize from "./captalize"

const getWordMarkdown = (dicioWord: DicioWord): string => `
## ${capitalize(dicioWord.class)}

${dicioWord.meanings.map(str => `- ${str}`).join('\n\n')}

> ${dicioWord.etymology}
`

export const formatDicioToMarkdown = (word: string, dicioWords: DicioWord[]) => `
# Significado de "${word}"

${dicioWords.map(getWordMarkdown).join('\n')}
`
