import React from "react";
import { Image, View, ScrollView, Button } from "react-native";
import useViewDimension from "../hooks/useViewDimension";
import NavigationCard from "../components/NavigationCard";
import {
  Animals,
  Events,
  Tickets,
  Contact,
} from "../assets/NavigationImages/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../util/firebase";

const HomeScreen = () => {
  const [user, loading, error] = useAuthState(getAuth(app));

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      className="bg-orange-100"
    >
      <View className="relative">
        <Image
          source={require("../assets/panda.png")}
          style={{
            width: useViewDimension(100, "w"),
            height: useViewDimension(50, "h"),
          }}
        ></Image>
      </View>
      <View className="flex-1 relative -top-16">
        <NavigationCard
          title="Karte"
          image={Tickets}
          to="Karte"
          description="Karte i promotivni paketi"
        ></NavigationCard>
        <NavigationCard
          title="Dogadjaji"
          image={Events}
          to="Dogadjaji"
          description="Lista dogadjaja"
        ></NavigationCard>
        <NavigationCard
          title="Zivotinje"
          image={Animals}
          to="Zivotinje"
          description="Istrazite nase zivotinje"
        ></NavigationCard>
        <NavigationCard
          title="Kontakt"
          image={Contact}
          to="Kontakt"
          description="Gde se nalazimo"
        ></NavigationCard>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
