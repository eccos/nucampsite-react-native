import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { SwipeRow } from "react-native-swipe-list-view";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingComponent";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { baseUrl } from "../shared/baseUrl";

const FavoritesScreen = ({ navigation }) => {
  const campsites = useSelector((state) => state.campsites);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  if (campsites.isLoading) {
    return <Loading />;
  }
  if (campsites.errMess) {
    return (
      <View>
        <Text>{campsites.errMess}</Text>
      </View>
    );
  }

  const renderFavoriteItem = ({ item: campsite }) => {
    return (
      <SwipeRow rightOpenValue={-100}>
        <View style={styles.deleteView}>
          <TouchableOpacity
            style={styles.deleteTouchable}
            onPress={() =>
              Alert.alert(
                "Delete Favorite?",
                "Are you sure you wish to delete the favorite campsite " +
                  campsite.name +
                  "?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log(campsite.name + " Not Deleted"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => dispatch(toggleFavorite(campsite.id)),
                  },
                ],
                { cancelable: false }
              )
            }
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ListItem
            title={campsite.name}
            caption={campsite.description}
            featured
            onPress={() =>
              navigation.navigate("Directory", {
                screen: "CampsiteInfo",
                params: { campsite },
              })
            }
          >
            <Avatar rounded source={{ uri: baseUrl + campsite.image }} />
            <ListItem.Content>
              <ListItem.Title>{campsite.name}</ListItem.Title>
              <ListItem.Subtitle>{campsite.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
      </SwipeRow>
    );
  };

  return (
    <FlatList
      data={campsites.campsitesArray.filter((campsite) =>
        favorites.includes(campsite.id)
      )}
      renderItem={renderFavoriteItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  deleteView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  deleteTouchable: {
    backgroundColor: "red",
    height: "100%",
    justifyContent: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
    width: 100,
  },
});

export default FavoritesScreen;
