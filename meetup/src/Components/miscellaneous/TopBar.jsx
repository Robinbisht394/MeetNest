import React from "react";
import {
  Box,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const TopBar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const logOut = () => {}; //logout function
  return (
    <div>
      <Box
        height={"8vh"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"3px"}
        bg={"gray.300"}
      >
        <IconButton
          aria-label="'toggle sidebar"
          icon={<HamburgerIcon bg={"none"} />}
          display={{ base: "flex", md: "none" }}
        />
        <Text color={"blue.500"} fontSize={"1.4rem"}>
          Meetup
        </Text>
        <Menu>
          <Tooltip hasArrow label="user profile" placement="bottom">
            <MenuButton>
              <Avatar size={"sm"} name="Robin singh" />
            </MenuButton>
          </Tooltip>
          <MenuList>
            <MenuItem onClick={onOpen}>profile</MenuItem>
            <MenuItem onClick={() => logOut()}>Logout</MenuItem>
          </MenuList>
        </Menu>

        {/* Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"2"}
              flexDirection={"column"}
            >
              <Avatar size={"md"} name="Robin singh" />
              <Text>Robin Singh</Text>
              <Text>Robinbisht@gmail.com</Text>
              <Text>Organiser</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
};

export default TopBar;
