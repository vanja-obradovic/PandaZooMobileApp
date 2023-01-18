import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import { Image, Pressable, View } from "react-native";
import Tickets from "./assets/icons/tickets.svg";
import Events from "./assets/icons/events.svg";
import Animals from "./assets/icons/animals.svg";
import Contact from "./assets/icons/contact.svg";
import Home from "./assets/icons/home.svg";
import useViewDimension from "./hooks/useViewDimension";
import TicketScreen from "./screens/TicketScreen";
import EventScreen from "./screens/EventScreen";
import AnimalsScreenStack from "./screens/AnimalsScreen";
import ContactScreen from "./screens/ContactScreen";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import Log_Register from "./components/Log_Register";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { StatusBar } from "expo-status-bar";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={"transparent"} translucent />
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            drawerStyle: {
              backgroundColor: "#57534e",
              width: useViewDimension(100, "w"),
            },
            drawerContentContainerStyle: {
              justifyContent: "center",
              flex: 1,
            },
            drawerLabelStyle: {
              fontSize: 24,
              textAlign: "center",
            },
            drawerItemStyle: {
              marginVertical: 15,
            },
            drawerInactiveTintColor: "white",
            drawerActiveTintColor: "#fbbf24",
            drawerActiveBackgroundColor: "transparent",
            headerTitle: (props) => {
              return (
                <>
                  <View className="flex-row items-center justify-center">
                    <View style={{ height: 150, width: 50 }}>
                      <Image
                        source={require("./assets/logo_image.png")}
                        style={{
                          width: "70%",
                          resizeMode: "contain",
                          height: "70%",
                          flex: 1,
                        }}
                      ></Image>
                    </View>
                    <View style={{ height: 150, width: 130 }}>
                      <Image
                        source={require("./assets/logo_text.png")}
                        style={{
                          width: "100%",
                          resizeMode: "contain",
                          height: "100%",
                          flex: 1,
                        }}
                      ></Image>
                    </View>
                  </View>
                </>
              );
            },
            headerRight: (props) => {
              return (
                <TouchableNativeFeedback>
                  <Log_Register></Log_Register>
                </TouchableNativeFeedback>
              );
            },
            headerStyle: { backgroundColor: "#57534e" },
            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        >
          <Drawer.Screen
            name="Pocetna"
            component={HomeScreen}
            options={{
              drawerIcon: ({ color }) => {
                return (
                  <Home
                    width={36}
                    height={36}
                    stroke={color}
                    style={{ marginLeft: "30%", marginRight: "-25%" }}
                  ></Home>
                );
              },
            }}
          ></Drawer.Screen>
          <Drawer.Screen
            name="Karte"
            component={TicketScreen}
            options={{
              drawerIcon: ({ color }) => {
                return (
                  <Tickets
                    width={36}
                    height={36}
                    fill={color}
                    style={{ marginLeft: "30%", marginRight: "-25%" }}
                  ></Tickets>
                );
              },
            }}
          ></Drawer.Screen>
          <Drawer.Screen
            name="Dogadjaji"
            component={EventScreen}
            options={{
              drawerIcon: ({ color }) => {
                return (
                  <Events
                    width={36}
                    height={36}
                    fill={color}
                    style={{ marginLeft: "30%", marginRight: "-25%" }}
                  ></Events>
                );
              },
            }}
          ></Drawer.Screen>
          <Drawer.Screen
            name="Zivotinje"
            component={AnimalsScreenStack}
            options={{
              drawerIcon: ({ color }) => {
                return (
                  <Animals
                    width={36}
                    height={36}
                    fill={color}
                    style={{ marginLeft: "30%", marginRight: "-25%" }}
                  ></Animals>
                );
              },
            }}
          ></Drawer.Screen>
          <Drawer.Screen
            name="Kontakt"
            component={ContactScreen}
            options={{
              drawerIcon: ({ color }) => {
                return (
                  <Contact
                    width={36}
                    height={36}
                    fill={color}
                    style={{ marginLeft: "30%", marginRight: "-25%" }}
                  ></Contact>
                );
              },
            }}
          ></Drawer.Screen>
          <Drawer.Screen
            name="Moj profil"
            component={ProfileScreen}
            options={{
              drawerItemStyle: { display: "none" },
            }}
          ></Drawer.Screen>
          <Drawer.Screen
            name="Obavestenja"
            component={NotificationScreen}
            options={{
              drawerItemStyle: { display: "none" },
            }}
          ></Drawer.Screen>
        </Drawer.Navigator>
        <Toast />
      </NavigationContainer>
    </>
  );
}
