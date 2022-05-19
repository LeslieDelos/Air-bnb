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
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";

//carte
import MapView from "react-native-maps";

export default function AroundMeScreen() {
  const [data, setData] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [coords, setCoords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getPermission = async () => {
      try {
        // Je demande la permission au user d'avoir accès à sa localisation
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        // S'il répond oui
        if (response.status === "granted") {
          // Je récupère sa localisation
          const location = await Location.getCurrentPositionAsync();
          console.log(location);
          // Et je stocke sa position dans mes states
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        } else {
          alert("Permission refusée");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPermission();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <Text>Logo</Text>
      <MapView
        // Je dois donner une dimension à ma map
        style={styles.map}
        // Initial region pour dire où dans le monde apparaît ma map
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        // Pour montrer la position du user
        showsUserLocation={true}
      >
        {data.map((item) => {
          return (
            <MapView.Marker
              key={item._id}
              coordinate={{
                longitude: item.location[0],
                latitude: item.location[1],
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  map: {
    height: 500,
  },
  bottomPart: {
    flexDirection: "row",
  },
  leftPart: {
    width: "80%",
  },

  rating: {
    flexDirection: "row",
  },
});

// const RoomScreen = ({ route }) => {
//   console.log(route);
//   //   const [data, setData] = setData();
//   const [showText, setShowText] = useState(false);

//   return (
//     <View>
//       <Text>RoomScreen</Text>
//       <Text>{route.params.id}</Text>
//       <TouchableOpacity
//         onPress={() => {
//           setShowText(!showText);
//         }}
//       >
//         <Text numberOfLines={showText ? null : 3}>
//           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat sunt
//           voluptatum nihil libero. Modi error sequi iste adipisci ratione
//           eligendi reiciendis, necessitatibus mollitia laudantium impedit nemo?
//           Aperiam doloremque tempore velit?
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
