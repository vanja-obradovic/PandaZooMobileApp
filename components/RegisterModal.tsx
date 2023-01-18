import React from "react";
import Modal from "react-native-modal";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";
import { TextInput, Text, View, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import app from "../util/firebase";

type register_data = {
  username: string;
  password: string;
  name: string;
  surname: string;
  phone: number;
  address: string;
};

const RegisterModal = ({
  open,
  onClose,
  toggle,
}: {
  open: boolean;
  onClose: () => void;
  toggle: () => void;
}) => {
  const [registerUser, user, loading, error] =
    useCreateUserWithEmailAndPassword(getAuth(app));

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<register_data>({ shouldUnregister: true });

  const [updateProfile] = useUpdateProfile(getAuth(app));

  const handleRegister = (data: register_data) => {
    registerUser(data.username, data.password).then((res) => {
      if (res?.user) {
        updateProfile({ displayName: data.name + " " + data.surname });
        setDoc(doc(getFirestore(app), "/users", data.username), {
          name: data.name,
          surname: data.surname,
          address: data.address,
          phone: data.phone,
          username: data.username,
          pendingNotification: false,
        });
        reset();
        onClose();
      } else if (error) {
        if (error.code === "auth/invalid-email")
          Toast.show({ type: "error", text1: "Uneti email nije validan!" });
        else if (error.code === "auth/weak-password")
          Toast.show({
            type: "error",
            text1:
              "Lozinka nije dovoljno jaka (minimalno 8 karaktera, 1 malo slovo, 1 veliko slovo i 1 broj)!",
          });
        else if (error.code === "auth/email-already-in-use")
          Toast.show({
            type: "error",
            text1: "Korisnik sa unetom email adresom vec postoji!",
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
    if (err.name)
      Toast.show({
        type: "error",
        text1: err.name.message,
      });
    if (err.surname)
      Toast.show({
        type: "error",
        text1: err.surname.message,
      });
    if (err.phone)
      Toast.show({
        type: "error",
        text1: err.phone.message,
      });
    if (err.address)
      Toast.show({
        type: "error",
        text1: err.address.message,
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
                required: "Morate uneti ime!",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-orange-200 rounded-lg py-2 px-4 text-lg ${
                    errors.name ? "border-red-500 border-2 border-offset-2" : ""
                  }`}
                  placeholder="Ime"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={"#292524"}
                />
              )}
              name="name"
            />
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: "Morate uneti prezime!",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-orange-200 rounded-lg py-2 px-4 text-lg ${
                    errors.surname
                      ? "border-red-500 border-2 border-offset-2"
                      : ""
                  }`}
                  placeholder="Prezime"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={"#292524"}
                />
              )}
              name="surname"
            />
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: "Morate uneti telefon!",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-orange-200 rounded-lg py-2 px-4 text-lg ${
                    errors.phone
                      ? "border-red-500 border-2 border-offset-2"
                      : ""
                  }`}
                  placeholder="Telefon"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value?.toString()}
                  placeholderTextColor={"#292524"}
                />
              )}
              name="phone"
            />
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: "Morate uneti adresu!",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-orange-200 rounded-lg py-2 px-4 text-lg ${
                    errors.address
                      ? "border-red-500 border-2 border-offset-2"
                      : ""
                  }`}
                  placeholder="Adresa"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={"#292524"}
                />
              )}
              name="address"
            />
          </View>
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
                  placeholder="Korisnicko ime (email)"
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
          onPress={handleSubmit(handleRegister, handleError)}
        >
          <Text className="text-white text-lg">Registruj se</Text>
        </Pressable>
        <View>
          <Text className="text-center text-lg">Imate nalog? Prijavite se</Text>
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

export default RegisterModal;
