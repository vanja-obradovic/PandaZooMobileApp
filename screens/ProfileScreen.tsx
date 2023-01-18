import { useNavigation } from "@react-navigation/native";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useId, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable, Text, View, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import app from "../util/firebase";
import Toast from "react-native-toast-message";
import useViewDimension from "../hooks/useViewDimension";

type user_data = {
  name: string;
  surname: string;
  phone: number;
  address: string;
  username: string;
};

type password_data = {
  old: string;
  new: string;
  confirm: string;
};

const ProfileScreen = () => {
  const [change, setChange] = useState(false);

  const toggleChange = () => {
    if (user) {
      if (change) {
        setChange(!change);
        if (dirtyFields.name || dirtyFields.surname) {
          updateProfile(user!, {
            displayName: getValues("name") + " " + getValues("surname"),
          }).then((res) =>
            Toast.show({ text1: "Uspesna promena imena i prezimena!" })
          );
          updateDoc(doc(getFirestore(app), `users/${user.email}`), {
            name: getValues("name"),
            surname: getValues("surname"),
          });
        }
        if (dirtyFields.address || dirtyFields.phone) {
          updateDoc(doc(getFirestore(app), `users/${user.email}`), {
            address: getValues("address"),
            phone: getValues("phone"),
          }).then((res) => Toast.show({ text1: "Uspesna promena podataka!" }));
        }
      } else setChange(!change);
    }
  };

  const [user] = useAuthState(getAuth(app));
  const [value, loading, error, snapshot] = useDocumentDataOnce(
    doc(getFirestore(app), `users/${user?.email}`)
  );

  const {
    control: controlData,
    reset,
    getValues,
    formState: { dirtyFields },
  } = useForm<user_data>({});

  const { control: controlPass, handleSubmit: handlePassChange } =
    useForm<password_data>({});

  const navigate = useNavigation();

  const handleNewPass = (data: password_data) => {
    if (user && data.new === data.confirm) {
      reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user?.email ?? "", data.old)
      )
        .then((res) => {
          updatePassword(res.user, data.new).then((res) => {
            Toast.show({ text1: "Promena lozinke uspesna!" });
            navigate.navigate("Pocetna");
            signout();
          });
        })
        .catch((res) =>
          Toast.show({ type: "error", text1: "Stara lozinka nije ispravna!" })
        );
    } else Toast.show({ type: "error", text1: "Lozinke se ne poklapaju!" });
  };

  const handleError = (err: any) => {
    if (err.old) Toast.show({ type: "error", text1: err.old.message });
    if (err.new) Toast.show({ type: "error", text1: err.new.message });
    if (err.confirm) Toast.show({ type: "error", text1: err.confirm.message });
  };

  useEffect(() => {
    reset({
      name: value?.name,
      surname: value?.surname,
      phone: value?.phone,
      address: value?.address,
      username: user?.email ?? undefined,
    });
  }, [value]);

  const [signout] = useSignOut(getAuth(app));

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        flex: 1,
        justifyContent: "space-around",
      }}
      className="bg-orange-100"
    >
      <View
        className="space-y-4 p-4"
        style={{ width: useViewDimension(90, "w") }}
      >
        <View>
          <Controller
            control={controlData}
            rules={{
              required: "Morate uneti ime!",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                editable={change}
                selectTextOnFocus={change}
                onBlur={onBlur}
                onChangeText={(e) => {
                  onChange(e);
                }}
                value={value}
                placeholder={loading ? "......." : "Ime"}
                placeholderTextColor={"#292524"}
                className="border-0 bg-orange-200 rounded-lg py-2 px-4 text-lg mx-4"
              />
            )}
            name="name"
          />
        </View>
        <View>
          <Controller
            control={controlData}
            rules={{
              required: "Morate uneti prezime!",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                editable={change}
                selectTextOnFocus={change}
                onBlur={onBlur}
                onChangeText={(e) => {
                  onChange(e);
                }}
                value={value}
                placeholder={loading ? "......." : "Prezime"}
                placeholderTextColor={"#292524"}
                className="border-0 bg-orange-200 rounded-lg py-2 px-4 text-lg mx-4"
              />
            )}
            name="surname"
          />
        </View>
        <View>
          <Controller
            control={controlData}
            rules={{
              required: "Morate uneti adresu!",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                editable={change}
                selectTextOnFocus={change}
                onBlur={onBlur}
                onChangeText={(e) => {
                  onChange(e);
                }}
                value={value}
                placeholder={loading ? "......." : "Adresa"}
                placeholderTextColor={"#292524"}
                className="border-0 bg-orange-200 rounded-lg py-2 px-4 text-lg mx-4"
              />
            )}
            name="address"
          />
        </View>
        <View>
          <Controller
            control={controlData}
            rules={{
              required: "Morate uneti telefon!",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                editable={change}
                selectTextOnFocus={change}
                onBlur={onBlur}
                onChangeText={(e) => {
                  onChange(e);
                }}
                value={value?.toString()}
                placeholder={loading ? "......." : "Telefon"}
                placeholderTextColor={"#292524"}
                className="border-0 bg-orange-200 rounded-lg py-2 px-4 text-lg mx-4"
              />
            )}
            name="phone"
          />
        </View>
        <View>
          <Controller
            control={controlData}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                placeholder={loading ? "......." : "Korisnicko ime"}
                placeholderTextColor={"#292524"}
                onBlur={onBlur}
                onChangeText={(e) => {
                  onChange(e);
                }}
                value={value}
                className="border-0 bg-orange-200 rounded-lg py-2 px-4 text-lg mx-4"
              />
            )}
            name="username"
          />
        </View>

        <Pressable
          className={`items-center justify-center h-12 ${
            change
              ? "bg-[#f87272] active:bg-[#f75252]"
              : "bg-teal-500 active:bg-teal-600"
          } mx-8 rounded-lg`}
          onPress={toggleChange}
        >
          <Text className={`text-lg ${change ? "text-black" : "text-white"}`}>
            Izmeni podatke
          </Text>
        </Pressable>
      </View>

      <View
        className="border-b-2 border-stone-800"
        style={{ width: useViewDimension(80, "w") }}
      ></View>

      <View
        className="space-y-4 p-4"
        style={{ width: useViewDimension(90, "w") }}
      >
        <View>
          <Controller
            control={controlPass}
            rules={{
              required: "Morate uneti staru lozinku!",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry
                className="border-0 bg-orange-200 rounded-lg py-2 px-4 text-lg mx-4"
                placeholder="Stara lozinka"
                placeholderTextColor={"#292524"}
                onBlur={onBlur}
                onChangeText={(e) => {
                  onChange(e);
                }}
                value={value}
              />
            )}
            name="old"
          />
        </View>

        <View>
          <Controller
            control={controlPass}
            rules={{
              required: "Morate uneti novu lozinku!",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry
                className="border-0 bg-orange-200 rounded-lg py-2 px-4 text-lg mx-4"
                placeholder="Nova lozinka"
                placeholderTextColor={"#292524"}
                onBlur={onBlur}
                onChangeText={(e) => {
                  onChange(e);
                }}
                value={value}
              />
            )}
            name="new"
          />
        </View>

        <View>
          <Controller
            control={controlPass}
            rules={{
              required: "Morate uneti potvrdu lozinke!",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry
                className="border-0 bg-orange-200 rounded-lg py-2 px-4 text-lg mx-4"
                placeholder="Potvrda lozinke"
                placeholderTextColor={"#292524"}
                onBlur={onBlur}
                onChangeText={(e) => {
                  onChange(e);
                }}
                value={value}
              />
            )}
            name="confirm"
          />
        </View>

        <Pressable
          className="items-center justify-center h-12 bg-[#f87272] mx-8 rounded-lg active:bg-[#f75252]"
          onPress={handlePassChange(handleNewPass, handleError)}
        >
          <Text className="text-lg">Promeni lozinku</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
