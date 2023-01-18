import { getAuth } from "firebase/auth";
import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

import app from "../util/firebase";
import Modal from "react-native-modal";
import { TextInput, Text, View, Pressable } from "react-native";

type login_data = {
  username: string;
  password: string;
};

const LogInModal = ({
  open,
  onClose,
  toggle,
}: {
  open: boolean;
  onClose: () => void;
  toggle: () => void;
}) => {
  const [login, user, loading, error] = useSignInWithEmailAndPassword(
    getAuth(app)
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<login_data>();

  const handleLogin = (data: login_data) => {
    if (data.username === "zaposleni@pandica.rs")
      Toast.show({
        type: "error",
        text1: "Admin ima pristup sistemu samo preko web portala!",
      });
    else
      login(data.username, data.password).then((res) => {
        if (res?.user) {
          onClose();
          reset();
        } else if (error) {
          if (error.code === "auth/user-not-found")
            Toast.show({
              type: "error",
              text1: "Korisnik sa unetim kredencijalima ne postoji!",
            });
          else if (error.code === "auth/wrong-password")
            Toast.show({
              type: "error",
              text1: "Lozinka nije ispravna!",
            });
          else "Serverska greska pokusajte ponovo!";
        }
      });
  };

  const handleError = (err: any) => {
    if (err.username)
      Toast.show({
        type: "error",
        text1: err.username.message,
      });
    if (err.password)
      Toast.show({
        type: "error",
        text1: err.password.message,
      });
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
      <View
        style={{ backgroundColor: "#ffeccc" }}
        className="space-y-4 rounded-lg p-6"
      >
        <Text className="text-3xl font-semibold text-stone-800 text-center">
          Prijavite se
        </Text>
        <View className="justify-evenly space-y-4">
          <View>
            <Controller
              control={control}
              rules={{
                required: "Morate uneti korisnicko ime!",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-orange-200 rounded-lg py-2 px-4 text-lg ${
                    errors.username
                      ? "border-red-500 border-2 border-offset-2"
                      : ""
                  }`}
                  placeholder="Korisnicko ime"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={"#292524"}
                />
              )}
              name="username"
            />
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: "Morate uneti lozinku!",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-orange-200 rounded-lg py-2 px-4 text-lg ${
                    errors.password
                      ? "border-red-500 border-2 border-offset-2"
                      : ""
                  }`}
                  placeholder="Lozinka"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={"#292524"}
                  secureTextEntry
                />
              )}
              name="password"
            />
          </View>
        </View>
        <Pressable
          className="items-center justify-center h-12 bg-teal-500 mx-4 rounded-lg active:bg-teal-600"
          disabled={loading}
          onPress={handleSubmit(handleLogin, handleError)}
        >
          <Text className="text-white text-lg">Prijavi se</Text>
        </Pressable>
        <View>
          <Text className="text-center text-lg">
            Nemate nalog? Registujte se
          </Text>
          <Pressable
            className="ml-1"
            onPress={() => {
              toggle();
              reset();
            }}
          >
            <Text className="underline text-center text-lg">ovde.</Text>
          </Pressable>
        </View>
      </View>
      <Toast />
    </Modal>
  );
};

export default LogInModal;
