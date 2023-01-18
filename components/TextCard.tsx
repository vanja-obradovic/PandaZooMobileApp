import React from "react";
import { View, Text, Pressable } from "react-native";
import useViewDimension from "../hooks/useViewDimension";
import { Shadow } from "react-native-shadow-2";

const TextCard = ({
  title,
  children,
  action,
  guest,
}: {
  title: string;
  children: React.ReactNode;
  action?: () => void;
  guest: boolean;
}) => {
  return (
    <Shadow
      distance={5}
      startColor={"#00000010"}
      offset={[0, 20]}
      style={{
        backgroundColor: "#ffeccc",
        marginVertical: 16,
        borderRadius: 8,
        paddingVertical: 16,
      }}
    >
      <View
        className=" text-stone-800 py-2"
        style={{
          width: useViewDimension(85, "w"),
          backgroundColor: "#feeccc",
          minHeight: useViewDimension(35, "h"),
        }}
      >
        <View className="justify-between space-y-4 flex-1">
          <Text className="text-3xl text-center font-medium">{title}</Text>
          <View className="items-center space-y-4">{children}</View>
          <View>
            {!guest && (
              <Pressable
                onPress={action}
                className="items-center justify-center h-12 bg-teal-500 mx-4 rounded-lg active:bg-teal-600"
              >
                <Text className="text-white text-lg">Kupi</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Shadow>
  );
};

export default TextCard;
