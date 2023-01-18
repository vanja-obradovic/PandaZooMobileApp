import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import React from "react";
import Toast from "react-native-toast-message";
import { View, Text } from "react-native";
import app from "../util/firebase";
import Tick from "../assets/icons/tick.svg";
import Cancel from "../assets/icons/cancel.svg";
import useViewDimension from "../hooks/useViewDimension";
import { Shadow } from "react-native-shadow-2";

const NotificationCard = ({
  title,
  date,
  quantity,
  price,

  approved,
}: {
  title: string;
  date: string;
  quantity?: number;

  price?: number;

  approved?: boolean;
}) => {
  return (
    <Shadow
      distance={3}
      startColor={"#00000010"}
      offset={[0, 17]}
      style={{
        backgroundColor: "#feeccc",
        marginVertical: 12,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
      }}
    >
      <View
        className="bg-[#ffeccc] text-stone-800 self-center rounded-lg px-2 py-1"
        style={{ width: useViewDimension(90, "w") }}
      >
        <View className="justify-between">
          <View className="justify-center space-y-1">
            <Text className="font-medium text-2xl">{title}</Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-[12px]">{date}</Text>
              {approved ? (
                <View className="flex-row items-center space-x-1">
                  <Tick width={20} height={20} stroke="#16a34a"></Tick>
                  <Text className="text-green-600 font-semibold text-[14px]">
                    Potvrdjeno
                  </Text>
                </View>
              ) : approved === false ? (
                <View className="flex-row items-center space-x-1">
                  <Cancel width={20} height={20} stroke="#dc2626"></Cancel>
                  <Text className="text-red-600 font-semibold text-[14px]">
                    Odbijeno
                  </Text>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View className="mt-2">
            <Text className="text-[18px]">{`Kolicina: ${quantity} kom`}</Text>
            <Text className="text-[18px]">{`Cena: ${price} rsd`}</Text>
          </View>
        </View>
      </View>
    </Shadow>
  );
};

export default NotificationCard;
