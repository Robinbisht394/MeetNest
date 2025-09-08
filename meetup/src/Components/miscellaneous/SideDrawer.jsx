import React, { useContext } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { UserContext } from "../../Context/UserContextProvider";
import OrganizerSideBar from "./OrganizerSideBar";
import AttendeeSidebar from "./AttendeeSidebar";
const SideDrawer = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(UserContext);
  return (
    <>
      {/* Drawer */}
      <span onClick={onOpen}>{children}</span>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{user.role}</DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              {user.role == "organizer" ? (
                <OrganizerSideBar />
              ) : (
                <AttendeeSidebar />
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
