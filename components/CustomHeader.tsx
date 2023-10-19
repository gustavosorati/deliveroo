import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { BottomSheet } from "./BottomSheet";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchField}>
        <Ionicons name="ios-search" size={20} color={Colors.mediumDark} />

        <TextInput placeholder="Restaurants, Groceries and dishes" style={styles.input} />
      </View>

      <Link href={"/(modal)/filter"} asChild>
      <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export function CustomHeader() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    bottomSheetRef.current?.present();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomSheet ref={bottomSheetRef} />
      <View style={styles.container}>
        <TouchableOpacity>
          <Image source={require("@/assets/images/bike.png")} style={styles.bike} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openModal}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>Delivery - now</Text>
          <View style={styles.locationName}>
            <Text style={styles.subtitle}>London</Text>
            <Ionicons name="chevron-down-outline" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openModal}
          style={styles.profileButton}
        >
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <SearchBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    height: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  bike: {
    width: 30,
    height: 30
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.medium
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  profileButton: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 99
  },
  locationName: {
    flexDirection: "row",
    alignItems: "center"
  },
  searchContainer: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20
  },
  searchField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    paddingHorizontal: 10
  },
  searchIcon: {},
  input: {
    padding: 10,
    color: Colors.mediumDark
  },
  optionButton: {
    padding: 10,
    borderRadius: 99
  }
})
