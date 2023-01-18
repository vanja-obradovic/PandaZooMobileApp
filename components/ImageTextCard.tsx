import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getFirestore,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useDocumentData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import Like from "../assets/icons/like.svg";
import { View, Text, Pressable, Image } from "react-native";
import { Shadow } from "react-native-shadow-2";
import useViewDimension from "../hooks/useViewDimension";
import app from "../util/firebase";
import { useState } from "react";

const ImageTextCard = ({
  title,
  description,
  image,
  likes,
  id,
}: {
  title: string;
  description: string;
  image: string;
  likes: number;
  id: string;
}) => {
  const [user] = useAuthState(getAuth(app));
  const [changeInProgress, setChangeInProgress] = useState(false);

  const [userData, loadingData, errorData, snaphotData] = useDocumentData(
    doc(getFirestore(app), `/users/${user?.email}`)
  );

  const handleLike = () => {
    const batch = writeBatch(getFirestore(app));

    if (userData?.likes?.includes(id)) {
      batch.update(doc(getFirestore(app), `events/${id}`), {
        likes: increment(-1),
      });
      batch.update(doc(getFirestore(app), `users/${user?.email}`), {
        likes: arrayRemove(id),
      });
      setChangeInProgress(true);
      batch.commit().then((res) => {
        setChangeInProgress(false);
      });
    } else {
      batch.update(doc(getFirestore(app), `events/${id}`), {
        likes: increment(1),
      });
      batch.update(doc(getFirestore(app), `users/${user?.email}`), {
        likes: arrayUnion(id),
      });
      setChangeInProgress(true);
      batch.commit().then((res) => {
        setChangeInProgress(false);
      });
    }
  };

  return (
    <Shadow
      distance={5}
      startColor={"#00000010"}
      offset={[0, 20]}
      style={{
        backgroundColor: "#feeccc",
        marginVertical: 16,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
      }}
    >
      <View
        className="bg-[#feeccc] rounded-lg space-y-4"
        style={{ width: useViewDimension(85, "w") }}
      >
        <View className="h-64 w-full flex-1 m-0 p-0 rounded-t-lg">
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            className="w-full flex-1 rounded-t-lg"
          />
        </View>
        <View className=" bg-[#feeccc] space-y-4 rounded-b-lg">
          <Text className="text-2xl text-center font-medium mx-2">{title}</Text>
          <Text className="mx-4">{description}</Text>
          <View className="flex flex-row space-x-2 justify-end items-center mr-4 rounded-b-lg mb-4">
            <Pressable
              className="disabled:bg-transparent active:scale-90"
              disabled={!user || changeInProgress}
              onPress={handleLike}
            >
              <Like
                width={40}
                height={40}
                fill={userData?.likes?.includes(id) ? "#facc15" : "#000000"}
              ></Like>
            </Pressable>
            <Text className="text-2xl font-medium">{likes}</Text>
          </View>
        </View>
      </View>
    </Shadow>
  );
};

export default ImageTextCard;
