import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Controller, useForm } from "react-hook-form";
import Toast, { ToastShowParams } from "react-native-toast-message";
import Tick from "../assets/icons/tick.svg";
import app from "../util/firebase";
import Modal from "react-native-modal";
import { Text, View, Pressable, TextInput } from "react-native";
import useViewDimension from "../hooks/useViewDimension";

type modal_data = {
  quantity?: number;
  promo?: string;
};

const BuyModal = ({
  input = false,
  title,
  text,
  open,
  price = -1,
  group,
  onClose,
}: {
  input: boolean;
  title: string;
  text: string;
  open: boolean;
  price?: number;
  group: boolean;
  onClose: (toastParams?: ToastShowParams) => void;
}) => {
  const [quantity, setQuantity] = useState(0);

  const promoCodes = {
    pandaHelp: 0.9,
    pandica2023: 0.8,
    pandaZakon: 0.7,
  };

  const calculateGroupPrice = (quantity: number) => {
    if (quantity < 20) return 500;
    else if (quantity < 40) return 400;
    else return 350;
  };

  const getDiscount = (promo: string | undefined) => {
    return (
      Object.values(promoCodes)[Object.keys(promoCodes).indexOf(promo ?? "")] ??
      1
    );
  };

  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<modal_data>({
    defaultValues: { quantity: undefined, promo: "" },
  });

  const [user, loading, error] = useAuthState(getAuth(app));

  const handlePurchase = (data: modal_data) => {
    addDoc(collection(getFirestore(app), "/purchaseRequests"), {
      username: user?.email,
      title: title,
      quantity: data.quantity ?? 1,
      price:
        (data.quantity ?? 1) *
        (price === -1
          ? calculateGroupPrice(data.quantity ?? 0) * getDiscount(data.promo)
          : price * getDiscount(data.promo)),
      timestamp: serverTimestamp(),
    }).then((res) => {
      setDoc(
        doc(getFirestore(app), `users/${user?.email}/notifications/${res.id}`),
        {
          title: title,
          quantity: data.quantity ?? 1,
          price:
            (data.quantity ?? 1) *
            (price === -1
              ? calculateGroupPrice(data.quantity ?? 0) *
                getDiscount(data.promo)
              : price * getDiscount(data.promo)),
          timestamp: serverTimestamp(),
        }
      ).then((res) => {
        onClose({ text1: "Kupovina uspesna!" });
        setQuantity(0);
        reset();
      });
    });
  };

  const handleError = (err: any) => {
    if (err.quantity)
      Toast.show({ type: "error", text1: err.quantity.message });
    if (err.promo) Toast.show({ type: "error", text1: err.promo.message });
  };

  return (
    <Modal
      isVisible={open}
      onSwipeComplete={() => {
        reset();
        setQuantity(0);
        onClose();
      }}
      swipeDirection={["left", "right"]}
    >
      <View
        style={{ backgroundColor: "#ffeccc" }}
        className="space-y-4 rounded-lg p-6"
      >
        <Text className="text-3xl font-semibold text-stone-800 text-center">
          Kupovina ulaznice
        </Text>
        <View className="flex flex-row justify-center items-center text-lg">
          {input && (
            <Controller
              control={control}
              rules={{
                required: "Morate uneti kolicinu",
                min: { value: 1, message: "Minimalna kolicina je 1!" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-orange-200 rounded-lg py-2 px-4 text-lg ${
                    errors.quantity
                      ? "border-red-500 border-2 border-offset-2"
                      : ""
                  }`}
                  style={{
                    minWidth: useViewDimension(40, "w"),
                    marginRight: 4,
                  }}
                  onBlur={onBlur}
                  onChangeText={(e) => {
                    onChange(e);
                    setQuantity(Number.parseInt(e));
                  }}
                  value={value?.toString()}
                  placeholder="Broj ulaznica"
                  placeholderTextColor={"#292524"}
                />
              )}
              name="quantity"
            />
          )}
          {quantity > 0 ? (
            group ? (
              <>
                <Text className="text-lg">{`x ${calculateGroupPrice(
                  quantity
                )} = ${calculateGroupPrice(quantity) * quantity} rsd`}</Text>
              </>
            ) : (
              <>
                <Text className="text-lg">{text}</Text>
                <Text className="text-lg">{`= ${price * quantity} rsd`}</Text>
              </>
            )
          ) : (
            !input && <Text className="text-lg text-center">{text}</Text>
          )}
        </View>
        <View className="items-center justify-center space-y-4">
          <Text className="text-center text-lg">
            Ispod možete uneti promo kod za popust, ukoliko ga imate:
          </Text>
          <View className="relative">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Promo kod"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="border-0 bg-orange-200 relative rounded-lg py-2 px-4 text-lg"
                  style={{ minWidth: useViewDimension(50, "w") }}
                  placeholderTextColor={"#292524"}
                ></TextInput>
              )}
              name="promo"
            />
            {Object.keys(promoCodes).includes(watch("promo") ?? "") && (
              <View className="absolute h-8 w-8 -right-12 top-1 bottom-1">
                <Tick width={32} height={32} stroke={"#16a34a"} />
              </View>
            )}
          </View>
        </View>
        <Pressable
          onPress={handleSubmit(handlePurchase, handleError)}
          className="items-center justify-center h-12 bg-teal-500 mx-4 rounded-lg active:bg-teal-600"
        >
          <Text className="text-lg text-white">Potvrdi</Text>
        </Pressable>
      </View>
      <Toast />
    </Modal>
  );
};

export default BuyModal;
