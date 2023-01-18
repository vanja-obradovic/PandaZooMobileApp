import { collection, getFirestore } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { View, ScrollView, Text } from "react-native";
import ImageTextCard from "../components/ImageTextCard";
import app from "../util/firebase";

const EventScreen = () => {
  const [data, loading, error] = useCollection(
    collection(getFirestore(app), "/events")
  );
  return loading ? (
    <View className="justify-center items-center flex-1 bg-orange-100">
      <Text className="text-2xl font-medium">Ucitava se...</Text>
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      className="bg-orange-100"
    >
      <View className="flex-1">
        {data?.docs.map((event) => {
          const item = event.data();
          return (
            <View className="carousel-item" key={item.title}>
              <ImageTextCard
                title={item.title}
                description={item.description}
                likes={item.likes}
                image={item.image}
                id={event.id}
              ></ImageTextCard>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default EventScreen;
