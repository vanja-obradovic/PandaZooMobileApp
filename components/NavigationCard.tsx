import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, View, Text, Pressable } from "react-native";
import useViewDimension from "../hooks/useViewDimension";

const NavigationCard = ({
  title,
  image,
  to,
  description,
}: {
  title: string;
  image: any;
  to: string;
  description: string;
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(to)}
      className="bg-orange-200 text-stone-800 items-center rounded-lg py-4 my-4 flex-1 justify-between active:scale-95"
      style={{
        width: useViewDimension(85, "w"),
        minHeight: useViewDimension(30, "h"),
      }}
    >
      <View style={{ paddingVertical: 8 }}>
        <Image source={image} resizeMode="cover" className="rounded-lg" />
      </View>
      <View className="space-y-2">
        <Text
          style={{ fontSize: 28, textAlign: "center" }}
          className="font-semibold"
        >
          {title}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>{description}</Text>
      </View>
    </Pressable>
  );
};

export default NavigationCard;
