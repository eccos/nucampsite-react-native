import { FlatList, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Tile } from "react-native-elements";
import { useSelector } from "react-redux";
import Loading from "../components/LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const DirectoryScreen = ({ navigation }) => {
  const campsites = useSelector((state) => state.campsites);

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

  const renderDirectoryItem = ({ item: campsite }) => {
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <Tile
          title={campsite.name}
          caption={campsite.description}
          featured
          onPress={() => navigation.navigate("CampsiteInfo", { campsite })}
          imageSrc={{ uri: baseUrl + campsite.image }}
        />
      </Animatable.View>
    );
  };

  return (
    <FlatList
      data={campsites.campsitesArray}
      renderItem={renderDirectoryItem}
      keyExtractor={(campsite) => campsite.id.toString()}
    />
  );
};

export default DirectoryScreen;
