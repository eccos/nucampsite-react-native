import NetInfo from '@react-native-community/netinfo';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import logo from '../assets/images/logo.png';
import { fetchCampsites } from '../features/campsites/campsitesSlice';
import { fetchComments } from '../features/comments/commentsSlice';
import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';
import AboutScreen from './AboutScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import ContactScreen from './ContactScreen';
import DirectoryScreen from './DirectoryScreen';
import FavoritesScreen from './FavoritesScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import ReservationScreen from './ReservationScreen';

// separate specific platform package(s) so app compiles correctly on diff platforms
let ToastAndroid;
if (Platform.OS === 'android') {
  ToastAndroid = require('react-native').ToastAndroid;
}

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerTintColor: '#FFF',
  headerStyle: { backgroundColor: '#5637DD' },
};

const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Home',
          headerLeft: () => (
            <Icon
              name="home"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const DirectoryNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Directory" screenOptions={screenOptions}>
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        options={({ navigation }) => ({
          title: 'Campsite Directory',
          headerLeft: () => (
            <Icon
              name="list"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CampsiteInfo"
        component={CampsiteInfoScreen}
        options={({ route }) => ({
          title: route.params.campsite.name,
        })}
      />
    </Stack.Navigator>
  );
};

const ReservationNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Reservation"
        component={ReservationScreen}
        options={({ navigation }) => ({
          title: 'Reservation Search',
          headerLeft: () => (
            <Icon
              name="tree"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const FavoritesNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={({ navigation }) => ({
          title: 'Favorite Campsites',
          headerLeft: () => (
            <Icon
              name="heart"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const LoginNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon
              name={
                getFocusedRouteNameFromRoute(route) === 'Register'
                  ? 'user-plus'
                  : 'sign-in'
              }
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerTitle: getFocusedRouteNameFromRoute(route),
        })}
      />
    </Stack.Navigator>
  );
};

const AboutNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="info-circle"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={({ navigation }) => ({
          title: 'Contact Us',
          headerLeft: () => (
            <Icon
              name="address-card"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <View style={{ flex: 1 }}>
        <Image source={logo} style={styles.drawerImage} />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.drawerHeaderText}>nucamp</Text>
      </View>
    </View>
    <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
  </DrawerContentScrollView>
);

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampsites());
    dispatch(fetchPromotions());
    dispatch(fetchPartners());
    dispatch(fetchComments());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const connectionInfo = await NetInfo.fetch();
      const msg = 'Initial Network Connectivity Type:';
      if (Platform.OS === 'android') {
        ToastAndroid.show(`${msg} ${connectionInfo.type}`, ToastAndroid.LONG);
      } else if (Platform.OS === 'ios') {
        Alert.alert(msg, connectionInfo.type);
      } else {
        console.log(`${msg} ${connectionInfo.type}`, connectionMsg);
      }
    })();

    const unsubscribeNetInfo = NetInfo.addEventListener((connectionInfo) => {
      handleConnectivityChange(connectionInfo);
    });

    return unsubscribeNetInfo;
  }, []);

  const handleConnectivityChange = (connectionInfo) => {
    let connectionMsg = 'Network Connection: Active';
    switch (connectionInfo.type) {
      case 'none':
        connectionMsg = 'Network Connection: Inactive';
        break;
      case 'unknown':
        connectionMsg = 'Network Connection: Unknown';
        break;
      case 'cellular':
        connectionMsg = 'Network Connection: Cellular';
        break;
      case 'wifi':
        connectionMsg = 'Network Connection: WiFi';
        break;
    }
    if (Platform.OS === 'android') {
      ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
    } else if (Platform.OS === 'ios') {
      Alert.alert('Connection change:', connectionMsg);
    } else {
      console.log('Connection change:', connectionMsg);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={CustomDrawerContent}
        drawerStyle={{ backgroundColor: '#CEC8FF' }}
        edgeWidth={100}
      >
        <Drawer.Screen
          name="Login"
          component={LoginNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                name="sign-in"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            title: 'Home',
            drawerIcon: ({ color }) => (
              <Icon
                name="home"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Directory"
          component={DirectoryNavigator}
          options={{
            title: 'Campsite Directory',
            drawerIcon: ({ color }) => (
              <Icon
                name="list"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="ReserveCampsite"
          component={ReservationNavigator}
          options={{
            title: 'Reserve Campsite',
            drawerIcon: ({ color }) => (
              <Icon
                name="tree"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Favorites"
          component={FavoritesNavigator}
          options={{
            title: 'My Favorites',
            drawerIcon: ({ color }) => (
              <Icon
                name="heart"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutNavigator}
          options={{
            title: 'About',
            drawerIcon: ({ color }) => (
              <Icon
                name="info-circle"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={ContactNavigator}
          options={{
            title: 'Contact Us',
            drawerIcon: ({ color }) => (
              <Icon
                name="address-card"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#5637DD',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
  },
  stackIcon: {
    marginLeft: 10,
    color: '#FFF',
    fontSize: 24,
  },
});

export default Main;
