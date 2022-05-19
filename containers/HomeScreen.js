import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const displayStars = (num) => {
    const tab = [];
    for (let i = 0; i < 5; i++) {
      if (i < num) {
        tab.push(<Entypo key={i} name="star" size={24} color="yellow" />);
      } else {
        tab.push(<Entypo key={i} name="star" size={24} color="grey" />);
      }
    }
    return tab;
  };

  const navigation = useNavigation();

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={StyleSheet.container}>
      <FlatList
        data={data}
        keyExtractor={(elem) => elem._id}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room", {
                  id: item._id,
                });
              }}
            >
              {/* <ImageBackground
                style={StyleSheet.imageBackground}
                source={{ uri: item.photo[0].url }}
              >
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{item.price} €</Text>
                </View>
              </ImageBackground> */}
              <View style={styles.bottomPart}>
                <View style={styles.leftPart}>
                  <Text numberOfLines={1}>{item.title}</Text>
                  <View style={styles.rating}>
                    {displayStars(item.ratingValue)}
                  </View>
                </View>
                <View style={styles.rightPart}>
                  <Image
                    style={styles.imageUser}
                    source={{ uri: item.user.account.photo.url }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  imageBackground: {
    height: 250,
    justifyContent: "flex-end",
  },
  priceContainer: {
    height: 50,
    width: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  price: {
    color: "white",
  },
  bottomPart: {
    flexDirection: "row",
  },
  leftPart: {
    width: "80%",
  },
  rightPart: {
    width: "20%",
  },
  rating: {
    flexDirection: "row",
  },
  imageUser: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
