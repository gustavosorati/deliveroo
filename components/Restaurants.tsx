import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { restaurants } from "@/assets/data/home";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

export function Restaurants() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15
      }}
    >
      {restaurants.map((restaurant, index) => (
        <Link href={`/details`} key={index} asChild>
          <TouchableOpacity style={styles.categoryCard} >
            <Image source={restaurant.img} style={styles.image} />
            <View style={styles.categoryBox}>
              <Text style={styles.categoryText}>{restaurant.name}</Text>
              <Text style={{ color: Colors.green }}>
                {restaurant.rating} {restaurant.ratings}
              </Text>
              <Text style={{ color: Colors.medium }}>
                {restaurant.distance}
              </Text>
            </View>
        </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
    backgroundColor: "#fff",
    margin: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.06,
    borderRadius: 4
  },
  categoryText: {
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined
  },
  categoryBox: {
    flex: 2,
    padding: 10
  }
})