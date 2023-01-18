import React from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
  Linking,
} from "react-native";
import Location from "../assets/icons/location.svg";
import Mail from "../assets/icons/mail.svg";
import Phone from "../assets/icons/phone.svg";
import useViewDimension from "../hooks/useViewDimension";

const ContactScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
      className="bg-orange-100"
    >
      <View className="items-center space-y-10">
        <View
          style={{
            width: useViewDimension(90, "w"),
            aspectRatio: 3 / 2,
          }}
          className="rounded-lg"
        >
          <Image
            source={require("../assets/map.jpg")}
            className="h-full w-full rounded-lg"
            resizeMode="cover"
          />
        </View>
        {/* <View className="h-4/5 self-center before:bg-stone-800 before:bg-opacity-60 after:bg-stone-800 after:bg-opacity-60"></View> */}
        <View className="justify-evenly text-2xl font-semibold text-stone-800 space-y-8">
          <View className="flex-row items-center space-x-4">
            <Location width={40} height={40} fill="#292524" />
            <Text className="text-stone-800 text-[16px] font-medium">
              Mali Kalemegdan 8, 11000 Beograd
            </Text>
          </View>
          <View className="flex-row items-center space-x-4">
            <Pressable
              onPress={() => Linking.openURL(`mailto:office@pandica.rs`)}
              className="flex-row items-center space-x-4 active:scale-95"
            >
              <Mail width={40} height={40} fill="#292524" />
              <Text className="text-stone-800 text-[16px] font-medium underline">
                office@pandica.rs
              </Text>
            </Pressable>
          </View>
          <View className="flex-row items-center space-x-4">
            <Phone width={40} height={40} />
            <Text className="text-stone-800 text-[16px] font-medium">
              011/123-45-67
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactScreen;
