import { useState } from "react";
import ListClassesTable from "./ListClassesTable";
import SearchBar from "./SearchBar";

const ClassManagement = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ListClassesTable searchText={searchText} />
    </>
  );
};

export default ClassManagement;
