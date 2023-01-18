import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastShowParams } from "react-native-toast-message";
import app from "../util/firebase";
import BuyModal from "./BuyModal";
import TextCard from "./TextCard";
import Toast from "react-native-toast-message";

const TicketCard = ({
  title,
  children,
  price,
  modalText,
  group = false,
  modalInput = false,
}: {
  title: string;
  children: React.ReactNode;
  price: number;
  group?: boolean;
  modalText: string;
  modalInput?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (toastParams?: ToastShowParams) => {
    setOpen(false);
    if (toastParams) setTimeout(() => Toast.show(toastParams), 600); // needed for toast to be shown imediately after modal close
  };

  const [user] = useAuthState(getAuth(app));

  return (
    <>
      <TextCard title={title} action={handleOpen} guest={user === null}>
        {children}
      </TextCard>
      <BuyModal
        title={title}
        open={open}
        onClose={handleClose}
        input={modalInput}
        text={modalText}
        price={price}
        group={group}
      ></BuyModal>
    </>
  );
};

export default TicketCard;
