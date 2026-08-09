import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebouncer";

interface SearchPostParams {
  className?: string;
  placeholder?: string;
  variant?: "surface" | "classic" | "soft";
}

export function SearchPost({
  className,
  placeholder,
  variant,
}: SearchPostParams) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay
  const [results, setResults] = useState([]);

  // This effect only runs when the debounced search term updates (the term updates after 400ms delay)
  useEffect(() => {
    if (debouncedSearchTerm) {
      //fetching blogs title from the database
      const encodedQueryParam = encodeURI(debouncedSearchTerm);
      fetch(`api/search/blogtitle/${encodedQueryParam}`)
        .then((res) => res.json())
        .then((data) => setResults(data));
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    console.log(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  return (
    <>
      {" "}
      <TextField.Root
        placeholder={placeholder || "Search"}
        className={className || ""}
        variant={variant || "classic"}
        onChange={(e) => setSearchTerm(e.target.value)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </>
  );
}
