import { List } from "@raycast/api";

type WordSearchProps = {
  onSearch: (word: string) => void;
  isLoading: boolean;
}

export default function WordSearch({ onSearch, isLoading }: WordSearchProps) {
  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={onSearch}
      searchBarPlaceholder="Buscar no Dicionário"
      throttle
    />
  );
}
