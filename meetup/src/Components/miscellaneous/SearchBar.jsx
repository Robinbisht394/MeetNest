import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { Search } from "lucide-react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search className="text-gray-400 w-5 h-5" />
        </InputLeftElement>
        <Input
          value={searchQuery}
          // onChange={(e) => searchEvents(e)}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Where do you want to participate today?"
          className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
          size="lg"
        />
      </InputGroup>
    </div>
  );
}
