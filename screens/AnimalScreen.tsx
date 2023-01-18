import React, { useState } from "react";
import { Image, Pressable, Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useCollectionDataOnce,
  useCollectionOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import app from "../util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import CommentModal from "../components/CommentModal";
import CommentCard from "../components/CommentCard";
import { format } from "date-fns";
import Toast from "react-native-toast-message";
import useViewDimension from "../hooks/useViewDimension";

const AnimalScreen = ({ route }) => {
  const {
    params: { id },
  } = route;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user, loadingAuth, errorAuth] = useAuthState(getAuth(app));

  const [data, loading, error, snapshot] = useDocumentDataOnce(
    doc(getFirestore(app), `animals/${id}`)
  );

  const [comments, loadingComments, errorComments, snapshotComments, reload] =
    useCollectionDataOnce(
      query(
        collection(getFirestore(app), `/animals/${id}/comments`),
        orderBy("timestamp", "desc")
      )
    );

  const handleComment = () => {
    if (user) {
      handleOpen();
    } else
      Toast.show({
        type: "error",
        text1: "Morate biti ulogovani da bi ste ostavili komentar!",
      });
  };
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      className="bg-orange-100 space-y-4"
    >
      <Text className="text-4xl mt-4 text-stone-800 font-medium">
        {data?.name}
      </Text>
      <View
        style={{
          width: useViewDimension(90, "w"),
          aspectRatio: 16 / 9,
        }}
      >
        <Image
          source={{ uri: data?.image }}
          resizeMode="cover"
          className="w-full h-full"
        />
      </View>
      <Text className="self-start text-3xl ml-2">Opis</Text>
      <Text className="self-stretch mx-4 text-justify text-lg">
        {data?.description}
      </Text>
      <Text className="self-start text-3xl ml-2">Komentari</Text>
      <View //ScrollView
        className="space-y-4 mb-4 bg-orange-200 rounded-lg py-4"
        style={{ width: useViewDimension(95, "w") }}
      >
        <View className="self-center">
          <Pressable
            className="items-center justify-center h-12 bg-teal-500 rounded-lg px-4 active:bg-teal-600"
            onPress={handleComment}
          >
            <Text className="text-white text-[16px]">Ostavi komentar</Text>
          </Pressable>
          <CommentModal
            open={open}
            id={id ?? ""}
            onClose={handleClose}
            action={reload}
          ></CommentModal>
        </View>
        {/* <View className="space-y-4 justify-between flex-1"> */}
        {comments?.map((comment) => {
          return (
            <View key={comment.timestamp.seconds}>
              <CommentCard
                content={comment.comment}
                user={comment.name + " " + comment.surname}
                date={format(
                  comment.timestamp.seconds * 1000 +
                    comment.timestamp.nanoseconds / 1000000,
                  "dd.MM.yyyy | HH:mm"
                )}
              ></CommentCard>
            </View>
          );
        })}
        {/* </View> */}
      </View>
    </ScrollView>
  );
};

export default AnimalScreen;
