import React, { lazy, useContext } from "react";
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
  ModalBody,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { UserContext } from "../../Context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
const SideDrawer = lazy(() => import("./SideDrawer"));

const TopBar = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure(); // drawer
  const {
    isOpen: isProfileOpen,
    onOpen: openProfile,
    onClose: closeProfile,
  } = useDisclosure(); // profile modal

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1500"
      height="8vh"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="3px"
      boxShadow="md"
      bg="white"
    >
      {/* Side Drawer Trigger */}
      <SideDrawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <IconButton
          aria-label="toggle sidebar"
          icon={<HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={openDrawer}
          _hover={"none"}
        />
      </SideDrawer>

      {/* App Title */}
      <Text color="blue.500" fontSize="1.7rem" fontWeight={"bold"}>
        MeetNest
      </Text>

      {/* Profile Menu */}
      <Menu>
        <Tooltip hasArrow label="User Profile" placement="bottom">
          <MenuButton>
            <Avatar size="sm" name={user.name} />
          </MenuButton>
        </Tooltip>
        <MenuList portal zIndex="popover">
          <MenuItem onClick={openProfile} padding="2px">
            <User className="w-5 h-5 mr-2" /> Profile
          </MenuItem>
          <MenuItem onClick={logOut} padding="2px">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Profile Modal */}
      <Modal isOpen={isProfileOpen} onClose={closeProfile} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Profile</ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2"
          >
            <Avatar size="md" name={user.name} />
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            <Text>{user.role.toUpperCase()}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TopBar;
