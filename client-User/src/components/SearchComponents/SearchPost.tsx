import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebouncer";
import { SearchDropComp } from "./SearchDropComp";

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
    const getQueryResult = async () => {
      if (debouncedSearchTerm) {
        //fetching blogs title from the database
        const encodedQueryParam = encodeURI(debouncedSearchTerm);
        // this ENDPOINT only gives max 5 close "%LIKE%" posts
        const response = await fetch(
          `api/search/blogtitle/${encodedQueryParam}`,
        );
        if (!response.ok) {
          setResults([]);
          return;
        } else {
          const data = await response.json();
          setResults(data.posts);
        }
      } else {
        setResults([]);
      }
    };
    getQueryResult();
    return;
  }, [debouncedSearchTerm]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <section className="relative flex w-full flex-col sm:w-4/5">
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
      {results.length !== 0 && (
        <div className="absolute top-full left-0 z-10 w-full border border-t-0 border-black">
          {results.map((post, index) => {
            return <SearchDropComp post={post} />;
            //new feature? : you can add add  "see more" button to see more than 5 results in a new page
          })}
        </div>
      )}
    </section>
  );
}
