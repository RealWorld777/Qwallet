import React, { useEffect, useState } from "react";
import { HStack, Text, VStack } from "native-base";
import { useColors } from "@app/context/ColorContex";
import Tokenlist from "./components/Tokenlist";
import { faMinus, faPlus, faShare } from "@fortawesome/free-solid-svg-icons";
import TransferButton from "./components/TransferButton";
import { useAuth } from "@app/context/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "@app/redux/store";

const Wallet: React.FC = () => {
  const { login, user, balances } = useAuth();
  const { marketcap } = useSelector((store: RootState) => store.app);
  const { bgColor, textColor, gray } = useColors();
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [allAddresses, setAllAddresses] = useState<string[]>([]);

  useEffect(() => {
    if (user?.accountInfo) {
      setCurrentAddress(user?.accountInfo.addresses[0]);
      setAllAddresses(user?.accountInfo.addresses);
    }
  }, [login, user]);

  return (
    <VStack
      flex={1}
      justifyItems="center"
      justifyContent="center"
      space={5}
      bgColor={bgColor}
      color={textColor}
    >
      <VStack flex={1} pt={14}>
        <Text fontSize="2xl" textAlign="center" color={gray.gray40}>
          Total Balance
        </Text>
        <Text fontSize="3xl" textAlign="center">
          $
          {Math.floor(
            balances.reduce(
              (acc, currentValue) => acc + Number(currentValue),
              0
            ) *
              parseFloat(marketcap.price) *
              1000
          ) / 1000}
        </Text>
        <HStack w={"full"} justifyContent={"center"} space={4}>
          <TransferButton icon={faShare} title="SEND"></TransferButton>
          <TransferButton icon={faPlus} title="BUY"></TransferButton>
          <TransferButton icon={faMinus} title="SELL"></TransferButton>
        </HStack>
      </VStack>
      <Tokenlist />
    </VStack>
  );
};

export default Wallet;