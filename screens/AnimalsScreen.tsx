import React from "react";
import { Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "firebase/firestore";
import app from "../util/firebase";
import ImageCard from "../components/ImageCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimalScreen from "./AnimalScreen";

const Stack = createNativeStackNavigator();

const AnimalsScreen = () => {
  const navigate = useNavigation();

  const [data, loading, error, reload] = useCollectionOnce(
    collection(getFirestore(app), "/animals")
  );

  const animals = data?.docs;

  return loading ? (
    <View className="justify-center items-center flex-1 bg-orange-100">
      <Text className="text-2xl font-medium">Ucitava se...</Text>
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      className="bg-orange-100"
    >
      <View className="justify-between items-center my-4">
        {animals?.map((item) => {
          const animal = item.data();
          return (
            <ImageCard
              title={animal.name}
              image={animal.image}
              link={{ route: "Animal", param: item.id }}
              key={item.id}
            ></ImageCard>
          );
        })}
      </View>
    </ScrollView>
  );
};

const AnimalsScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Animals"
        component={AnimalsScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Animal"
        component={AnimalScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AnimalsScreenStack;
