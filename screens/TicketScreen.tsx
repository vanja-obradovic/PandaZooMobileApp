import React from "react";
import { Text, View, ScrollView } from "react-native";
import TicketCard from "../components/TicketCard";

const TicketScreen = () => {
  const items = [
    <TicketCard
      title="Pojedinacna ulaznica"
      modalText="x 650 rsd "
      price={650}
      modalInput
    >
      <>
        <View className="flex-row mx-4 ">
          <Text className="text-xl text-center">Deca 0-12 -&gt;&nbsp;</Text>
          <Text className="text-xl text-center font-semibold">besplatno</Text>
        </View>
        <View className="flex-row">
          <Text className="text-xl text-center">Odrasli (12+) -&gt;&nbsp;</Text>
          <Text className="text-xl text-center font-semibold">650 rsd</Text>
        </View>
      </>
    </TicketCard>,
    <TicketCard
      title="Grupna ulaznica"
      modalText="x 500 rsd "
      group
      modalInput
      price={500}
    >
      <>
        <View className="flex-row mx-4 ">
          <Text className="text-xl text-center">5-20 osoba -&gt;&nbsp;</Text>
          <Text className="text-xl text-center font-semibold">500 rsd</Text>
        </View>
        <View className="flex-row mx-4 ">
          <Text className="text-xl text-center">20-40 osoba -&gt;&nbsp;</Text>
          <Text className="text-xl text-center font-semibold">400 rsd</Text>
        </View>
        <View className="flex-row mx-4 ">
          <Text className="text-xl text-center">40+ osoba -&gt;&nbsp;</Text>
          <Text className="text-xl text-center font-semibold">350 rsd</Text>
        </View>
      </>
    </TicketCard>,
    <TicketCard
      title="Ulaznica + voznja vrtom za dvoje"
      modalText="Paket ulaznice + vožnja vrtom = 2000 rsd"
      price={2000}
    >
      <>
        <Text className="text-xl mx-4 text-center">
          Promo paket ulaznice za dvoje + privatna voznja po vrtu
        </Text>
        <Text className="text-xl mx-4 text-center font-semibold">2000 rsd</Text>
      </>
    </TicketCard>,
    <TicketCard
      title="Ulaznica + topli napitak"
      modalText=" Paket ulaznica + topli napitak = 1500 rsd"
      price={1500}
    >
      <>
        <Text className="text-xl mx-4 text-center">
          Specijalan promo paket ulaznica + topli napitak po izboru, gratis
          šolja
        </Text>
        <Text className="text-xl mx-4 text-center font-semibold">1500 rsd</Text>
      </>
    </TicketCard>,
    <TicketCard
      title="Celodnevni paket"
      modalText="Celodnevni paket = 4000 rsd"
      price={4000}
    >
      <>
        <Text className="text-xl mx-4 text-center">
          Specijalan promo paket ulaznica + vođeni obilazak vrta + ulazak u
          ograđene zone i hranjenje životinja
        </Text>
        <Text className="text-xl mx-4 text-center font-semibold">4000 rsd</Text>
      </>
    </TicketCard>,
  ];

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      className="bg-orange-100"
    >
      {items.map((item, index) => {
        return <View key={index}>{item}</View>;
      })}
    </ScrollView>
  );
};

// const Stack = createNativeStackNavigator();

// const TicketScreenStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Karte" component={TicketScreen}></Stack.Screen>
//       {/* <Stack.Screen
//         name="KarteKaProfil"
//         component={ProfileScreenStack}
//       ></Stack.Screen>
//       <Stack.Screen
//         name="KarteKaObavestenja"
//         component={NotificationScreenStack}
//       ></Stack.Screen> */}
//     </Stack.Navigator>
//   );
// };

export default TicketScreen;
