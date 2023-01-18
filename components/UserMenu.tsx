import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { View, Pressable, Text } from "react-native";
import Modal from "react-native-modal";
import useViewDimension from "../hooks/useViewDimension";
import app from "../util/firebase";

const UserMenu = ({
  items,
}: {
  items: { title: string; link: string; action?: () => any }[];
}) => {
  const [open, setOpen] = useState(false);
  const [user, loading, error] = useAuthState(getAuth(app));
  const navigate = useNavigation();

  const [data, dataLoading, dataError, snapshot] = useDocumentData(
    doc(getFirestore(app), `/users/${user?.email}`)
  );

  const resetNotifications = () => {
    updateDoc(doc(getFirestore(app), `/users/${user?.email}`), {
      pendingNotification: false,
    });
  };

  return (
    <>
      <View className="relative">
        <Pressable
          className="rounded-full bg-orange-100 p-[10px] relative border border-stone-800 active:scale-95 aspect-square"
          onPress={() => setOpen(!open)}
        >
          <Text className="text-stone-800 text-[16px]">
            {user?.displayName?.split(" ").map((item) => item.charAt(0)) ??
              "AA"}
          </Text>
        </Pressable>
        {data?.pendingNotification && (
          <View className="absolute rounded-full w-3 h-3 top-[5%] right-[5%] bg-red-400"></View>
        )}
      </View>
      <Modal
        isVisible={open}
        className="relative"
        backdropColor="transparent"
        onBackdropPress={() => setOpen(false)}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View
          className=" bg-[#feeccc] absolute -right-2 rounded-lg p-1 border-2 border-stone-800"
          style={{
            width: useViewDimension(50, "w"),
            top: useViewDimension(4.5, "h"),
          }}
        >
          {items.map((item) => {
            return (
              <Pressable
                className="relative p-1 active:scale-95"
                key={item.link}
                onPress={() => {
                  navigate.navigate(item.link);
                  if (item.link === "Obavestenja") resetNotifications();
                  item.action?.();
                  setOpen(false);
                }}
              >
                <Text className="text-center text-[16px] font-medium bg-orange-200 px-4 py-2 rounded-lg">
                  {item.title}
                </Text>
                {data?.pendingNotification && item.link === "Obavestenja" && (
                  <View className="absolute rounded-full w-2 h-2 top-1/2 right-[15%] bg-red-400"></View>
                )}
              </Pressable>
            );
          })}
        </View>
      </Modal>
    </>
  );
};

export default UserMenu;
