import ParallaxScrollView from "@/components/ParallaxScrollView"
import Colors from "@/constants/Colors";
import { Image, ListRenderItem, ScrollView, SectionList, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { restaurant } from "@/assets/data/restaurant";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import useBasketStore from "@/store/basket-store";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Details() {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0)

  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  });

  const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: Colors.primary,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="share-outline" size={24} color={Colors.primary} />
         </TouchableOpacity>

          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="search-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      )
    })
  }, [])

  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if(y > 350) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  }

  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<TouchableOpacity[]>([]);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected.measure((x, y, width, height, pageX, pageY) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true })
    })
  }

  const { items, total} = useBasketStore();

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <Link href={{ pathname: "/(modal)/dish", params: { id: item.id} }} asChild>
      <TouchableOpacity
        style={styles.item}
        >
        <View style={{ flex: 1 }}>
          <Text style={styles.dish}>{item.name}</Text>
          <Text style={styles.dishText}>{item.info}</Text>
          <Text style={styles.dishText}>${item.price}</Text>
        </View>

        <Image source={item.img} style={styles.dishImage} />
      </TouchableOpacity>
    </Link>
  )

  return (
    <>
      <ParallaxScrollView
        // scrollRef={(ref) => (parralaxRef.current = ref!)}
        backgroundColor={"#fff"}
        style={{ flex: 1 }}
        parallaxHeaderHeight={250}
        renderBackground={() => <Image source={restaurant.img} style={{ height: 300, width: "100%" }} />}
        stickyHeaderHeight={120}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickyHeader}>
            <Text style={styles.stickyHeaderText}>{restaurant.name}</Text>
          </View>
        )}
        scrollEvent={(e: any) => onScroll(e)}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.delivery} . {restaurant.tags.map((tag, index) => (
              `${tag}${index < restaurant.tags.length - 1 ? " . " : ""}`
            ))}
          </Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.about}
          </Text>

          <SectionList
            contentContainerStyle={{ paddingBottom: 60 }}
            scrollEnabled={false}
            sections={DATA}
            keyExtractor={(item) => item.name}
            renderItem={renderItem}
            renderSectionHeader={({section: { title, index }}) => (
              <Text
                style={styles.sectionHeader}
              >{title}</Text>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey }} />}
            SectionSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey }} />}
          />
        </View>
      </ParallaxScrollView>


      <Animated.View style={[styles.stickySegments, animatedStyles]}>
        <View style={styles.segmentsShadow}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
              {restaurant.food.map((item, index) => (                <TouchableOpacity
                ref={(ref) => (itemsRef.current[index] = ref!)}
                style={activeIndex === index
                  ? styles.segmentButtonActive
                  : styles.segmentButton
                }
                key={index} onPress={() => selectCategory(index)}
              >
                <Text style={activeIndex === index
                  ? styles.segmentTextActive
                  : styles.segmentText
                }>{item.category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      {/* Footer Basket */}
      {items > 0 && (
        <View style={styles.footer}>
          <SafeAreaView style={{ flex: 1}} edges={["bottom"]}>
              <Link href={"/basket"}  asChild>
                <TouchableOpacity style={styles.fullButton}>
                  <Text style={styles.basket}>{items}</Text>
                  <Text style={styles.footerText}>View Basket</Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>Total: ${total}</Text>
                </TouchableOpacity>
              </Link>
          </SafeAreaView>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center',
  },
  foregroundText: {
    fontSize: 24,
    color: 'white',
  },
  stickyHeader: {
    height: 90,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  stickyHeaderText: {
    fontSize: 18,
    color: '#000',
  },
  contentContainer: {
    padding: 16,
  },
  stickySection: {
    backgroundColor: "#fff"
  },
  roundButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 99
  },
  restaurantName: {
    fontSize: 30,
    margin: 16,
  },
  restaurantDescription: {
    fontSize: 16,
    margin: 16,
    lineHeight: 22,
    color: Colors.medium,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    margin: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
  },
  dishImage: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
  dish: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishText: {
    fontSize: 14,
    color: Colors.mediumDark,
    paddingVertical: 4,
  },
  stickySegments: {
    position: 'absolute',
    height: 50,
    left: 0,
    right: 0,
    top: 100,
    backgroundColor: '#fff',
    overflow: 'hidden',
    paddingBottom: 4,
  },
  segmentsShadow: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentText: {
    color: Colors.primary,
    fontSize: 16,
  },
  segmentButtonActive: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  segmentScrollview: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 20,
    paddingBottom: 4,
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    height: 50,
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  basket: {
    color: '#fff',
    backgroundColor: '#19AA86',
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 2,
  },
  basketTotal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
