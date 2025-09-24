import React from "react";
import { View, Button, StyleSheet } from "react-native";

interface LoginScreenProps {
  onLoginPress: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginPress }) => {
  return (
    <View style={styles.container}>
      <Button title="Google 계정으로 로그인" onPress={onLoginPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
