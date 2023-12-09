import { useRef } from "react";
import { Alert, PanResponder, StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";

const RenderCampsite = (props) => {
  const { campsite, isFavorite, markFavorite, onShowModal } = props;
  const view = useRef();
  const isLeftSwipe = ({ dx }) => dx < -120;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? "finished" : "canceled")
        );
    },
    onPanResponderEnd: (_, gestureState) => {
      console.log("pan responder end", gestureState);
      if (isLeftSwipe(gestureState)) {
        Alert.alert(
          "Add Favorite",
          `Are you sure you wish to add ${campsite.name} to favorites?`,
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
            {
              text: "OK",
              onPress: () =>
                props.isFavorite
                  ? console.log("Already set as a favorite")
                  : markFavorite(),
            },
          ],
          { cancelable: false }
        );
      }
    },
  });

  if (campsite) {
    return (
      <Animatable.View
        animation="fadeInDownBig"
        duration={2000}
        delay={500}
        ref={view}
        {...panResponder.panHandlers}
      >
        <Card containerStyle={styles.cardContainer}>
          <Card.Image source={{ uri: baseUrl + campsite.image }}>
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text style={styles.cardText}>{campsite.name}</Text>
            </View>
          </Card.Image>
          <Text style={{ margin: 20 }}>{campsite.description}</Text>
          <View style={styles.cardRow}>
            <Icon
              name={isFavorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#F50"
              raised
              reverse
              onPress={markFavorite}
            />
            <Icon
              name={"pencil"}
              type="font-awesome"
              color="#5637DD"
              raised
              reverse
              onPress={onShowModal}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  }
  return <View />;
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  cardText: {
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});

export default RenderCampsite;
