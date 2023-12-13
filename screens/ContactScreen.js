import * as MailComposer from "expo-mail-composer";
import { ScrollView, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Card, Icon } from "react-native-elements";

const ContactScreen = () => {
  const sendMail = () => {
    MailComposer.composeAsync({
      recipients: ["campsites@nucamp.co"],
      subject: "Inquiry",
      body: "To whom it may concern:",
    });
  };

  return (
    <ScrollView>
      <Animatable.View animation="fadeInDown" duration={2000} delay={500}>
        <Card wrapperStyle={{ margin: 10 }}>
          <Card.Title>Contact Information</Card.Title>
          <Card.Divider />
          <Text>1 Nucamp Way</Text>
          <Text>Seattle, WA 98001</Text>
          <Text style={{ marginBottom: 10 }}>U.S.A.</Text>
          <Text>Phone: 1-206-555-1234</Text>
          <Text>Email: campsites@nucamp.co</Text>
          <Button
            title={"Send Email"}
            buttonStyle={{ backgroundColor: "#5637DD", margin: 40 }}
            icon={
              <Icon
                name="envelope-o"
                type="font-awesome"
                color={"#FFF"}
                iconStyle={{ marginRight: 10 }}
              />
            }
            onPress={sendMail}
          />
        </Card>
      </Animatable.View>
    </ScrollView>
  );
};

export default ContactScreen;
