import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex flex-row justify-end mb-2">
      <TextField
        placeholder="Search..."
        style={{ marginRight: "1rem" }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchText(e.target.value);
        }}
      ></TextField>
      <Button
        variant="outlined"
        className="self-center"
        onClick={() => onSearch(searchText)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search mr-2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        Search
      </Button>
    </div>
  );
};
export default SearchBar;
