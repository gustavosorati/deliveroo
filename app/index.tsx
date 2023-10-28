import { Categories } from "@/components/Categories";
import { Restaurants } from "@/components/Restaurants";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <Categories />

        <Text style={styles.header}>Top picks in your neighbourhood</Text>
        <Restaurants />

        <Text style={styles.header}>Offers near your</Text>
        <Restaurants />

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    top: 60,
    backgroundColor: "#fff"
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 16
  }
})

export default App;
