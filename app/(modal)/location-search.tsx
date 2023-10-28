import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from "@expo/vector-icons";

const LocationSearch = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02
  })
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Search or move the map'
        fetchDetails={true}
        onPress={(data, details = null) => {
          const points = details?.geometry.location;
          if(!points) return;

          setLocation({
            ...location,
            latitude: points.lat,
            longitude: points.lng
          })
        }}
        query={{
          key: process.env.EXPO_PUBLIC_API_GOOGLE_KEY,
          language: 'pt',
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
             <Ionicons name="search-outline" size={20} color={Colors.medium} />
          </View>
        )}
        styles={{
          container: {
            flex: 0
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingHorizontal: 32,
            borderRadius: 12
          },
          textInputContainer: {
            padding: 8,
            backgroundColor: "#fff"
          }
        }}
      />

      <MapView
        region={location}
        showsUserLocation={true}
        minZoomLevel={5}
        style={styles.map}

      />

      <View style={styles.absoluteBox}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%"
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: "center",
    borderRadius: 8
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  boxIcon: {
    position: "absolute",
    left: 15,
    top: 18,
    zIndex: 1
  }
});

export default LocationSearch;

