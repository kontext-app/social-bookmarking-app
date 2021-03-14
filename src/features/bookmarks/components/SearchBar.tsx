import React from 'react';
import { Button } from 'app/components/Button';
import { Input } from 'app/components/Input';

type Props = {
  onChangeSearchInput: (searchInput: string) => void;
  searchInput: string;
  onClickSearch: () => void;
};

export function SearchBar(props: Props): JSX.Element {
  return (
    <div className="flex flex-row py-2">
      <Input
        placeholder="Search public bookmarks..."
        value={props.searchInput}
        onChange={(event) => props.onChangeSearchInput(event.target.value)}
        containerClassName="flex-1 mr-2"
      />
      <Button onClick={props.onClickSearch}>Search</Button>
    </div>
  );
}
