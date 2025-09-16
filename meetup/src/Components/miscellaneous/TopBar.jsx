import React, { useContext } from "react";
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
import { UserContext } from "../../Context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import SideDrawer from "./SideDrawer";
const TopBar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }; //logout function
  return (
    <div className="sticky top-0 ">
      <Box
        height={"8vh"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"3px"}
        boxShadow={"md"}
        bg={"white"}
      >
        <SideDrawer>
          <IconButton
            aria-label="'toggle sidebar"
            icon={<HamburgerIcon bg={"none"} />}
            display={{ base: "flex", md: "none" }}
            onClick={() => onOpen}
          />
        </SideDrawer>
        <Text color={"blue.500"} fontSize={"1.4rem"}>
          Meetup
        </Text>
        <Menu>
          <Tooltip hasArrow label="user profile" placement="bottom">
            <MenuButton>
              <Avatar size={"sm"} name={user.name} />
            </MenuButton>
          </Tooltip>
          <MenuList>
            <MenuItem onClick={onOpen} padding={"2px"}>
              <User className="w-5 h-5 mr-2" />
              Profile
            </MenuItem>
            <MenuItem onClick={() => logOut()} padding={"2px"}>
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={"center"}>Profile</ModalHeader>

            <ModalBody
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"2"}
              flexDirection={"column"}
            >
              <Avatar size={"md"} name={user.name} />
              <Text>{user.name}</Text>
              <Text>{user.email}</Text>
              <Text>{user.role.toUpperCase()}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
};

export default TopBar;
