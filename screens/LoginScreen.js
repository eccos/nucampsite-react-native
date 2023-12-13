import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { CheckBox, Input } from "react-native-elements";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = async () => {
    console.log("username", username);
    console.log("password", password);
    console.log("remember", remember);
    // promise chain syntax
    // if (remember) {
    //   SecureStore.setItemAsync(
    //     "userinfo",
    //     JSON.stringify({
    //       username,
    //       password,
    //     })
    //   ).catch((error) => console.log("Could not save user info", error));
    // } else {
    //   SecureStore.deleteItemAsync("userinfo").catch((error) =>
    //     console.log("Could not delete user info", error)
    //   );
    // }
    // await syntax
    if (remember) {
      try {
        await SecureStore.setItemAsync(
          "userinfo",
          JSON.stringify({
            username,
            password,
          })
        );
      } catch (error) {
        console.log("Could not save user info", error);
      }
    } else {
      try {
        await SecureStore.deleteItemAsync("userinfo");
      } catch (error) {
        console.log("Could not delete user info", error);
      }
    }
  };

  useEffect(() => {
    // SecureStore.getItemAsync("userinfo")
    //   .then((userdata) => {
    //     const userinfo = JSON.parse(userdata);
    //     if (!userinfo) return new Promise.reject("Could not parse userdata");
    //     setUsername(userinfo.username);
    //     setPassword(userinfo.password);
    //     setRemember(true);
    //   })
    //   .catch((error) => {
    //     console.log("Getting secure user data failed: " + error);
    //   });
    const getSecureUserInfo = async () => {
      try {
        const userdata = await SecureStore.getItemAsync("userinfo");
        const userinfo = await JSON.parse(userdata);
        if (!userinfo) throw new Error("Could not parse userdata");
        setUsername(userinfo.username);
        setPassword(userinfo.password);
        setRemember(true);
      } catch (error) {
        console.log("Getting secure user data failed: " + error);
      }
    };
    getSecureUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        leftIcon={{ type: "font-awesome", name: "user-o" }}
        onChangeText={(text) => setUsername(text)}
        value={username}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "key" }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <CheckBox
        title={"Remember Me"}
        center
        checked={remember}
        onPress={() => setRemember(!remember)}
        containerStyle={styles.formCheckbox}
      />
      <View style={styles.formButton}>
        <Button onPress={() => handleLogin()} title="Login" color={"#5637DD"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  formIcon: {
    marginRight: 10,
  },
  formInput: {
    padding: 10,
  },
  formCheckbox: {
    margin: 10,
    backgroundColor: null,
  },
  formButton: {
    margin: 40,
  },
});

export default LoginScreen;
