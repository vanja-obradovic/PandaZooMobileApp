import React, { useCallback, useLayoutEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../util/firebase";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getFirestore, orderBy, query } from "firebase/firestore";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import NotificationCard from "../components/NotificationCard";

const NotificationScreen = () => {
  const [user, authLoading, authError] = useAuthState(getAuth(app));

  const [data, loading, error, snapshot, reload] = useCollectionDataOnce(
    query(
      collection(getFirestore(app), `users/${user?.email}/notifications`),
      orderBy("timestamp", "desc")
    )
  );

  const callReload = useCallback(() => {
    reload();
  }, []);

  useFocusEffect(() => {
    callReload();
  });

  return loading ? (
    <View className="justify-center items-center flex-1 bg-orange-100">
      <Text className="text-2xl font-medium">Ucitava se...</Text>
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      className="bg-orange-100"
    >
      <View className="my-2">
        {snapshot?.docs.map((doc) => {
          const request = doc.data();

          return (
            <NotificationCard
              quantity={request.quantity}
              price={request.price}
              title={request.title}
              date={format(
                request.timestamp.seconds * 1000 +
                  request.timestamp.nanoseconds / 1000000,
                "dd.MM.yyyy | HH:mm"
              )}
              approved={request.approved}
              key={doc.id}
            ></NotificationCard>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default NotificationScreen;
