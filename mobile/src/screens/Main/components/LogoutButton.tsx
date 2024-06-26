import { TouchableOpacity } from "react-native";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useAuth } from "@app/context/AuthContext";
import { useColors } from "@app/context/ColorContex";
import { useNavigation } from "@react-navigation/native";
import { Text, useDisclose } from "native-base";
import local from "@app/utils/locales";
import ConfirmModal from "./ConfirmModal";
import { logout } from "@app/api/api";

const LogoutButton: React.FC = () => {
  const { textColor, main } = useColors();
  const auth = useAuth();
  const navigation = useNavigation();
  const { isOpen, onToggle } = useDisclose();
  const lang = local.Main.Components;

  const handleLogout = () => {
    logout();
    auth.logout();
    navigation.navigate("Login");
  };
  return (
    <>
      <TouchableOpacity onPress={onToggle}>
        <FontAwesomeIcon
          icon={faSignOut}
          color={textColor}
          size={24}
        ></FontAwesomeIcon>
      </TouchableOpacity>
      <ConfirmModal isOpen={isOpen} onToggle={onToggle} onPress={handleLogout}>
        <Text fontSize={"xl"} textAlign={"center"}>
          {lang.ReallyLogout}
        </Text>
      </ConfirmModal>
    </>
  );
};

export default LogoutButton;
