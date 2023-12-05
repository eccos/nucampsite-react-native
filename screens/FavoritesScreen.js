import { FlatList, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";
import Loading from "../components/LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const FavoritesScreen = ({ navigation }) => {
  const campsites = useSelector((state) => state.campsites);
  const favorites = useSelector((state) => state.favorites);

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

export default FavoritesScreen;
