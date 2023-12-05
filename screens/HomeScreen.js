import { ScrollView, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Card } from "react-native-elements";
import { useSelector } from "react-redux";
import Loading from "../components/LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const FeaturedItem = ({ item, isLoading, errMess }) => {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return (
      <View>
        <Text>{errMess}</Text>
      </View>
    );
  } else if (item) {
    return (
      <Animatable.View animation="zoomIn" duration={1000}>
        <Card containerStyle={{ padding: 0 }}>
          <Card.Image source={{ uri: baseUrl + item.image }}>
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 20 }}
              >
                {item.name}
              </Text>
            </View>
          </Card.Image>
          <Text style={{ margin: 20 }}>{item.description}</Text>
        </Card>
      </Animatable.View>
    );
  }

  return <View />;
};

const HomeScreen = () => {
  const campsites = useSelector((state) => state.campsites);
  const promotions = useSelector((state) => state.promotions);
  const partners = useSelector((state) => state.partners);

  const featCampsite = campsites.campsitesArray.find((item) => item.featured);
  const featPromotion = promotions.promotionsArray.find(
    (item) => item.featured
  );
  const featPartner = partners.partnersArray.find((item) => item.featured);

  return (
    <ScrollView>
      <FeaturedItem
        item={featCampsite}
        isLoading={campsites.isLoading}
        errMess={campsites.errMess}
      />
      <FeaturedItem
        item={featPromotion}
        isLoading={promotions.isLoading}
        errMess={promotions.errMess}
      />
      <FeaturedItem
        item={featPartner}
        isLoading={partners.isLoading}
        errMess={partners.errMess}
      />
    </ScrollView>
  );
};

export default HomeScreen;
