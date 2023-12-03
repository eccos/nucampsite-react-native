import { FlatList, StyleSheet, Text, View, Button, Modal } from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RenderCampsite from "../features/campsites/RenderCampsite";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { Input, Rating, Divider } from "react-native-elements";
import { postComment } from "../features/comments/commentsSlice";

const CampsiteInfoScreen = ({ route }) => {
  const { campsite } = route.params;
  const comments = useSelector((state) => state.comments);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const newComment = { campsiteId: campsite.id, rating, author, text };
    dispatch(postComment(newComment));
    setShowModal(!showModal);
  };

  const resetForm = () => {
    setRating(5);
    setAuthor("");
    setText("");
  };

  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
          readonly
          startingValue={item.rating}
          imageSize={10}
          style={{ alignItems: "flex-start", paddingVertical: "5%" }}
        />
        <Text style={{ fontSize: 12 }}>
          {`-- ${item.author}, ${item.date}`}
        </Text>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={comments.commentsArray.filter(
          (comment) => comment.campsiteId === campsite.id
        )}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          marginHorizontal: 20,
          paddingVertical: 20,
        }}
        ListHeaderComponent={
          <>
            <RenderCampsite
              campsite={campsite}
              isFavorite={favorites.includes(campsite.id)}
              markFavorite={() => dispatch(toggleFavorite(campsite.id))}
              onShowModal={() => setShowModal(!showModal)}
            />
            <View
              style={{ backgroundColor: "#FFF", flex: 1, alignItems: "center" }}
            >
              <Text style={styles.commentsTitle}>Comments</Text>
              <Divider
                orientation="horizontal"
                width={1}
                style={{ width: "90%", margin: "auto" }}
              />
            </View>
          </>
        }
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <View style={styles.modal}>
          <Rating
            showRating
            startingValue={rating}
            imageSize={40}
            onFinishRating={(rating) => setRating(rating)}
            style={{ paddingVertical: 10 }}
          />
          <Input
            placeholder="Author"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(author) => setAuthor(author)}
            value={author}
          />
          <Input
            placeholder="Comment"
            leftIcon={{ type: "font-awesome", name: "comment-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(text) => setText(text)}
            value={text}
          />
          <View style={{ margin: 10 }}>
            <Button
              title="Submit"
              color="#5637DD"
              onPress={() => {
                handleSubmit();
                resetForm();
              }}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              title="Cancel"
              color="#808080"
              onPress={() => {
                setShowModal(!showModal);
                resetForm();
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  commentsTitle: {
    textAlign: "center",
    backgroundColor: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    color: "#43484D",
    padding: 10,
    paddingTop: 30,
  },
  commentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default CampsiteInfoScreen;
