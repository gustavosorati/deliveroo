import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { categories } from "@/assets/data/home";

export function Categories() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15
      }}
    >
      {categories.map((category, index) => (
        <View style={styles.categoryCard} key={index}>
          <Image source={category.img} />
          <Text style={styles.categoryText}>{category.text}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  categoryCard: {
    width: 100,
    height: 100,
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
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4
  }
})