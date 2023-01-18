import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import useViewDimension from "../hooks/useViewDimension";

const ImageCard = ({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link?: { route: string; param: string };
}) => {
  const navigate = useNavigation();

  return (
    <Shadow
      distance={5}
      startColor={"#00000020"}
      offset={[0, 20]}
      style={{
        backgroundColor: "#feeccc",
        marginVertical: 16,
        borderRadius: 8,
      }}
    >
      <Pressable
        className="bg-[#feeccc] rounded-lg active:scale-95"
        style={{ width: useViewDimension(85, "w") }}
        onPress={() => navigate.navigate(link.route, { id: link.param })}
      >
        <View className="p-5 rounded-t-lg">
          <Text className="text-2xl text-center text-stone-800 justify-center font-medium">
            {title}
          </Text>
        </View>
        <View className="h-64 flex-1 rounded-b-lg">
          <Image
            source={{ uri: image }}
            className="flex-1 rounded-b-lg"
            resizeMode="cover"
          />
        </View>
      </Pressable>
    </Shadow>
  );
};

export default ImageCard;
