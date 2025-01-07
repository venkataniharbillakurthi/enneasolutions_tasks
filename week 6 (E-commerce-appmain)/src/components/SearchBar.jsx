import React, { useState } from "react";
import { Input, Button } from "antd";
import styled from "styled-components";

// Styled Components
const SearchContainer = styled.div`
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #f7f7f7;
  text-align: center;
  padding: 1rem 0;
`;

const InputWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dcdcdc;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  width: 75%;
  max-width: 500px;
`;

const StyledInput = styled(Input)`
  flex-grow: 1;
  border: none;
  outline: none;
  background: inherit;
  font-size: 0.875rem;
  padding-left: 1rem;
`;

const CloseButton = styled(Button)`
  background: transparent;
  border: none;
  padding: 0;
  margin-top: 10px;
`;

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

 

  const handleSearch = (value) => {
    setSearch(value);
    if (onSearch) {
      onSearch(value);
    }
  };



  return (
    <SearchContainer>
      <InputWrapper>
        <StyledInput
          placeholder="Search for products..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          variant="borderless"
        />
        {search && (
          <CloseButton
            type="text"
            onClick={() => {
              setSearch("");
              if (onSearch) {
                onSearch("");
              }
            }}
          >
            ×
          </CloseButton>
        )}
      </InputWrapper>
    </SearchContainer>
  );
};

export default SearchBar;
