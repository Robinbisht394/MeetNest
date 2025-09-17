import React, { useEffect, useState } from "react";
import SearchBar from "../Components/miscellaneous/SearchBar";
import { Card, CardBody } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../Hooks/useDebounce";
import SortDropdown from "../Components/miscellaneous/Sorting";
import { Filter } from "lucide-react";
import FilterComp from "../Components/miscellaneous/Filter";
const SearchPage = ({ onSortChange, onApply }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // to check if user searching
  const debounceQuery = useDebounce(searchQuery, 400);

  // handle events search
  useEffect(() => {
    if (!debounceQuery) return;
    const searchEvents = async () => {
      setIsSearching(true);
      console.log("searching");

      // search for events
      try {
        const response = await axios.get(
          `http://localhost:4000/api/event/search?q=${debounceQuery}`
        );
        console.log(response);
        setResults(response?.data);
      } catch (err) {
        console.log(err);
      }
    };
    searchEvents();
  }, [debounceQuery]);

  const noEvent = () => {
    if (!results || results.length === 0) {
      return (
        <p className="text-center text-gray-500 mt-4">
          No events found. Try another search.
        </p>
      );
    }
  };

  // handle click for event

  const handlelClick = (id) => {
    navigate(`/dashboard/event/${id}`);
  };

  return (
    <div className="flex justify-evenly items-center p-1">
      <div className="p-1 flex justify-center items-center flex-col flex-wrap transition-all w-[40%]">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {isSearching && searchQuery.length > 0 && noEvent()}
        {searchQuery.trim() != "" && (
          <div
            className={
              isSearching && searchQuery.length > 0
                ? "mt-2 space-y-4 bg-white w-full max-w-2xl rounded-md h-[12vh] overflow-y-scroll p-4"
                : "none"
            }
          >
            {results.map((event) => (
              <Card
                key={event._id}
                className="rounded-xl shadow-md hover:shadow-lg transition cursor-pointer h-[40px] flex justify-center items-start"
                onClick={() => handlelClick(event._id)}
              >
                <CardBody className="p-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {event.eventName}
                  </h2>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center gap-4">
        <SortDropdown onSortChange={onSortChange} />
        <FilterComp onApply={onApply}>
          <button>
            <Filter />
          </button>
        </FilterComp>
      </div>
    </div>
  );
};

export default SearchPage;
