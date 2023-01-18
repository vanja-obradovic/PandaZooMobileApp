import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import app from "../util/firebase";
import Modal from "react-native-modal";
import { TextInput, Text, Pressable, View } from "react-native";
import useViewDimension from "../hooks/useViewDimension";

type comment_data = {
  comment: string;
};

const CommentModal = ({
  open,
  id,
  onClose,
  action,
}: {
  open: boolean;
  id: string;
  onClose: () => void;
  action: () => Promise<void>;
}) => {
  const [user, loading, error] = useAuthState(getAuth(app));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<comment_data>();

  const handleComment = (data: comment_data) => {
    const display = user?.displayName?.split(" ");

    addDoc(collection(getFirestore(app), `/animals/${id}/comments`), {
      name: display?.[0],
      surname: display?.[1],
      username: user?.email,
      comment: data.comment,
      timestamp: serverTimestamp(),
    }).then((res) => {
      Toast.show({ text1: "Uspesno ostavljen komentar!" });
      action();
      onClose();
    });
  };

  const handleError = (err: any) => {
    if (err.comment) Toast.show({ type: "error", text1: err.comment.message });
  };

  return (
    <Modal
      isVisible={open}
      onSwipeComplete={() => {
        onClose();
        reset();
      }}
      swipeDirection={["left", "right"]}
    >
      <View className="bg-[#feeccc] rounded-lg space-y-4 p-4">
        <Text className="text-3xl font-semibold text-stone-800 text-center mb-2">
          Novi komentar
        </Text>
        <Controller
          control={control}
          rules={{
            required: "Morate uneti komentar!",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border-0 bg-orange-200 rounded-lg py-2 px-4 text-lg mx-4"
              style={{ maxHeight: useViewDimension(30, "h") }}
              placeholder="Komentar..."
              placeholderTextColor={"#292524"}
              multiline
              numberOfLines={4}
              onBlur={onBlur}
              onChangeText={(e) => {
                onChange(e);
              }}
              value={value}
            ></TextInput>
          )}
          name="comment"
        />
        <Pressable
          className="items-center justify-center h-12 bg-teal-500 mx-8 rounded-lg active:bg-teal-600"
          onPress={handleSubmit(handleComment, handleError)}
        >
          <Text className="text-white text-lg">Potvrdi</Text>
        </Pressable>
      </View>
      <Toast />
    </Modal>
  );
};

export default CommentModal;
