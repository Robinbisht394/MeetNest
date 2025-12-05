import { useState } from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Select,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function SortDropdown({ onSortChange }) {
  const [sortOption, setSortOption] = useState("");

 
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const sortOptions = [
    { label: "Date: Oldest First", value: "dateAsc" },
    { label: "Date: Newest First", value: "dateDesc" },
    { label: "Popularity: Most", value: "popularityDesc" },
    { label: "Popularity: Least", value: "popularityAsc" },
  ];
   
  // handle sort value change
  const handleChange = (value) => {
    setSortOption(value);
    onSortChange?.(value);
  };

  return (
    <Box>
      {isMobile ? (
        // mobile  sorting menu
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="outline"
            borderRadius="md"
            _hover={{ bg: "gray.50" }}
            _active={{ bg: "gray.100" }}
          >
            {sortOptions.find((opt) => opt.value === sortOption)?.label ||
              "Sort by"}
          </MenuButton>
          <MenuList>
            {sortOptions.map((opt) => (
              <MenuItem key={opt.value} onClick={() => handleChange(opt.value)}>
                {opt.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        // desktop sorting menu
        <Select
          placeholder="Sort by"
          value={sortOption}
          onChange={(e) => handleChange(e.target.value)}
          borderRadius="md"
          maxW="250px"
          bg="white"
          shadow="sm"
          _focus={{ borderColor: "blue.400", shadow: "outline" }}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      )}
    </Box>
  );
}
