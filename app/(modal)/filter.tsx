import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import categories from "@/assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useEffect, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const ItemBox = () => (
  <>
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
        <Text style={[{ flex: 1 }]}>Sort</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
        <Text style={[{ flex: 1 }]}>Hygienne rating</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
        <Text style={[{ flex: 1 }]}>Offers</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
        <Text style={[{ flex: 1 }]}>Dietary</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>

    <Text style={styles.header}>Categories</Text>
  </>

)

export const Filter = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(categories);
  const [selected, setSelected] = useState<Category[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  const handleClearAll = () => {
    const updatedItems = items.map((item) => {
        item.checked = false;
        return item;
    });

    setItems(updatedItems);
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0
    }
  });

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    }
  });

  const animatedClearGap = useAnimatedStyle(() => {
    return {
      gap: flexWidth.value > 0 ? 0 : 12
    }
  });

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if(hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      scale.value = withTiming(newSelected ? 1 : 0);
    }

    setSelected(selectedItems);
  }, [items]);

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <Text>{item.name} ({item.count})</Text>
      <BouncyCheckbox
        isChecked={items[index].checked}
        onPress={() => {
          const isChecked = items[index].checked;

          const updatedItems = items.map((item) => {
            if(item.name === items[index].name) {
              item.checked = !isChecked;
            }
            return item;
          });

          setItems(updatedItems);
        }}
        unfillColor="#fff"
        disableBuiltInState
        fillColor={Colors.primary}
        iconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4
        }}
        innerIconStyle={{
          borderRadius: 4
        }}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        ListHeaderComponent={<ItemBox />}
        renderItem={renderItem}
      />
      <View style={{ height: 90 }} />
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Animated.View style={[animatedStyles, styles.outlineButton]}>
            <TouchableOpacity
              style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}
              onPress={handleClearAll}
            >
              <Animated.Text style={[animatedText, styles.outlineButtonText]}>Clear All</Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: .1,
    shadowRadius: 10
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    flex: 1,
    height: 56
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 8,
    marginBottom: 16
  },
  header: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: '#fff',
    padding: 8,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff"
  },
  text: {
    fontWeight: "500"
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    margin: 16
  },
  outlineButton: {
    backgroundColor: "#fff",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
    height: 56
  },
  outlineButtonText: {
    color: Colors.primary,
    fontWeight: "bold"
  },
})


export default Filter;


