import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";
import { View, Text, Pressable, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import useViewDimension from "../hooks/useViewDimension";
import app from "../util/firebase";
import LogInModal from "./LogInModal";
import RegisterModal from "./RegisterModal";
import UserMenu from "./UserMenu";

const Log_Register = () => {
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const handleCloseRegister = () => setOpenRegister(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseLogIn = () => setOpenLogIn(false);
  const handleOpenLogIn = () => setOpenLogIn(true);
  const toggle = () => {
    if (openLogIn) {
      handleCloseLogIn();
      handleOpenRegister();
    } else {
      handleCloseRegister();
      handleOpenLogIn();
    }
  };

  const [user, loading, error] = useAuthState(getAuth(app));
  const [signout] = useSignOut(getAuth(app));

  return user ? (
    <>
      <View className="mr-2">
        <UserMenu
          items={[
            { title: "Moj profil", link: "Moj profil" },
            { title: "Obavestenja", link: "Obavestenja" },
            { title: "Odjavi se", link: "Pocetna", action: signout },
          ]}
        ></UserMenu>
      </View>
    </>
  ) : (
    <>
      <View className="mr-2">
        <Pressable
          style={{
            width: useViewDimension(18, "w"),
            minHeight: 36,
          }}
          className="bg-teal-500 rounded-lg items-center justify-center p-2 active:bg-teal-600"
          onPress={handleOpenLogIn}
        >
          <Text className="text-white">Prijavi se</Text>
        </Pressable>
      </View>
      <LogInModal open={openLogIn} onClose={handleCloseLogIn} toggle={toggle} />
      <RegisterModal
        open={openRegister}
        onClose={handleCloseRegister}
        toggle={toggle}
      />
    </>
  );
};

export default Log_Register;
