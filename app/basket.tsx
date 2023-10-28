import Colors from "@/constants/Colors";
import useBasketStore from "@/store/basket-store";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Basket() {
  const { products, total, clearCart, reduceProduct } = useBasketStore();
  const [order, setOrder] = useState(false);

  const FEES = {
    service: 2.99,
    delivery: 5.99
  }

  return (
    <View style={{ flex: 1 }}>
      {order && (
        <Text>Cool order</Text>
      )}
      {! order && (
        <>
          <FlatList
            data={products}
            ListHeaderComponent={() => (
              <View>
                <Text style={styles.section}>Items</Text>
              </View>
            )}
            contentContainerStyle={{ flexGrow: 1 }}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey }} />}
            renderItem={({item}) => (
              <View style={styles.row}>
                <Text style={{ color: Colors.primary }}>{item.quantity}x</Text>
                <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                <Text>${item.price * item.quantity}</Text>
              </View>
            )}
            ListFooterComponent={() => (
              <View>
                <View style={{ flex: 1 }}>
                  <View style={{ height: 1, backgroundColor: Colors.grey }} />

                  <View style={styles.totalRow}>
                    <Text style={styles.total}>Subtotal</Text>
                    <Text style={{ fontSize: 18 }}>${total.toFixed(2)}</Text>
                  </View>

                  <View style={{ height: 1, backgroundColor: Colors.grey }} />
                  <View style={styles.totalRow}>
                    <Text style={styles.total}>Service</Text>
                    <Text style={{ fontSize: 18 }}>${FEES.service}</Text>
                  </View>

                  <View style={{ height: 1, backgroundColor: Colors.grey }} />
                  <View style={styles.totalRow}>
                    <Text style={styles.total}>Order Total</Text>
                    <Text style={{ fontSize: 18 }}>${FEES.delivery}</Text>
                  </View>

                  <View style={{ height: 1, backgroundColor: Colors.grey }} />
                  <View style={styles.totalRow}>
                    <Text style={styles.total}>Delivery fee</Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>${(total + FEES.delivery + FEES.service).toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Link href={"/basket"}  asChild>
              <TouchableOpacity style={styles.fullButton}>
                <Text style={styles.footerText}>Order now</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 16
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 14,
    color: Colors.mediumDark
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
    justifyContent: 'center',
    textAlign: "center",
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
})
