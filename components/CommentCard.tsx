import React from "react";
import { View, Text } from "react-native";
import useViewDimension from "../hooks/useViewDimension";

const CommentCard = ({
  content,
  user,
  date,
}: {
  content: string;
  user: string;
  date: string;
}) => {
  return (
    <View
      className="bg-[#ffeccc] text-stone-800 self-center rounded-lg px-4 py-2"
      style={{ width: useViewDimension(90, "w") }}
    >
      <View className="justify-between space-y-3">
        <View className="justify-center">
          <Text className="font-medium text-2xl">{user}</Text>
          <Text className="text-[12px]">{date}</Text>
        </View>
        <View>
          <Text className="text-[16px]">{content}</Text>
        </View>
      </View>
    </View>
  );
};

export default CommentCard;
