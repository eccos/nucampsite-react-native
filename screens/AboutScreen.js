import { ScrollView, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { Avatar, Card, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";
import Loading from "../components/LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const Mission = () => {
  return (
    <Animatable.View animation="fadeInDown" duration={2000} delay={500}>
      <Card>
        <Card.Title>Our Mission</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 10 }}>
          We present a curated database of the best campsites in the vast woods
          and backcountry of the World Wide Web Wilderness. We increase access
          to adventure for the public while promoting safe and respectful use of
          resources. The expert wilderness trekkers on our staff personally
          verify each campsite to make sure that they are up to our standards.
          We also present a platform for campers to share reviews on campsites
          they have visited with each other.
        </Text>
      </Card>
    </Animatable.View>
  );
};

const Partners = ({ children }) => {
  return (
    <Card>
      <Card.Title>Community Partners</Card.Title>
      <Card.Divider />
      {children}
    </Card>
  );
};

const AboutScreen = () => {
  const partners = useSelector((state) => state.partners);

  let cardContent = [];
  if (partners.errMess) {
    cardContent = <Text>{partners.errMess}</Text>;
  } else if (partners.partnersArray.length) {
    cardContent = partners.partnersArray.map((partner) => (
      <ListItem key={partner.id}>
        <Avatar rounded source={{ uri: baseUrl + partner.image }} />
        <ListItem.Content>
          <ListItem.Title>{partner.name}</ListItem.Title>
          <ListItem.Subtitle>{partner.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ));
  }

  const partnersContent = (
    <Card>
      <Card.Title>Community Partners</Card.Title>
      <Card.Divider />
      {cardContent}
    </Card>
  );

  return (
    <ScrollView>
      <Mission />
      {partners.isLoading ? (
        <Partners>
          <Loading />
        </Partners>
      ) : (
        <Animatable.View animation="fadeInDown" duration={2000} delay={500}>
          <Partners>{cardContent}</Partners>
        </Animatable.View>
      )}
    </ScrollView>
  );
};

export default AboutScreen;
