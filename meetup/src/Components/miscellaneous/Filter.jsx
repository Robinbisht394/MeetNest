import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Checkbox,
  RadioGroup,
  Stack,
  Radio,
  Input,
} from "@chakra-ui/react";
import { Filter } from "lucide-react";

export default function FilterComp({ onApply }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState([]);
  const [eventType, setEventType] = useState("all");
  const [location, setLocation] = useState("");
  const [isCategorySelected, setIsCategorySelected] = useState({
    tech: false,
    music: false,
    sports: false,
  });

  const applyFilters = () => {
    console.log(category, eventType, location);

    onApply({ category, eventType, location });
    // onClose();
  };

  const categorySet = (e) => {
    const { value, checked } = e.target;

    setIsCategorySelected((prev) => ({ ...prev, [value]: checked }));
    if (checked) {
      setCategory((prev) => [...prev, value]);
    } else {
      setCategory((prev) =>
        prev.filter((cat) => {
          return cat != value;
        })
      );
    }
  };

  const clearFilters = () => {
    setCategory([]);
    setEventType("all");
    setLocation("");
    setIsCategorySelected({
      tech: false,
      music: false,
      sports: false,
    });
  };

  return (
    <>
      {/* Filter Button */}
      <Button leftIcon={<Filter />} onClick={onOpen} colorScheme="blue">
        Filters
      </Button>

      {/* Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Filter Events</DrawerHeader>
          <DrawerBody>
            {/* Category */}
            <p className="font-semibold mb-2">Category</p>
            <Stack spacing={2} mb={4}>
              <Checkbox
                value="tech"
                isChecked={isCategorySelected.tech}
                onChange={(e) => categorySet(e)}
              >
                Tech
              </Checkbox>
              <Checkbox
                value="music"
                isChecked={isCategorySelected.music}
                onChange={(e) => categorySet(e)}
              >
                Music
              </Checkbox>
              <Checkbox
                value="sports"
                isChecked={isCategorySelected.sports}
                onChange={(e) => categorySet(e)}
              >
                Sports
              </Checkbox>
            </Stack>

            {/* Event Type */}
            <p className="font-semibold mb-2">Type</p>
            <RadioGroup onChange={setEventType} value={eventType}>
              <Stack direction="column">
                <Radio value="all">All</Radio>
                <Radio value="online">Online</Radio>
                <Radio value="offline">Offline</Radio>
              </Stack>
            </RadioGroup>

            {/* Location */}
            <p className="font-semibold mt-6 mb-2">Location</p>
            <Input
              placeholder="Enter city or state"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            {/* Actions */}
            <Button colorScheme="blue" w="100%" mt={6} onClick={applyFilters}>
              Apply Filters
            </Button>
            <Button variant="ghost" w="100%" mt={2} onClick={clearFilters}>
              Clear All
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
