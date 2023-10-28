import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Link } from "expo-router";
import { forwardRef, useCallback, useMemo } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Ref = BottomSheetModal;

export const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const renderBackdrop = useCallback((props: BottomSheetDefaultBackdropProps) =>
    <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
  , []);
  const { dismiss } = useBottomSheetModal();


  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: Colors.lightGrey, borderRadius: 0 }}
      handleIndicatorStyle={{ display: "none" }}
    >
      <View style={styles.contentContainer}>
        <View style={styles.toggle}>
          <TouchableOpacity
            style={styles.toggleActive}
          >
            <Text style={styles.activeText}>Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toggleInactive}
          >
            <Text style={styles.inactiveText}>Delivery</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subheader}>Your Location</Text>
        <Link href={"/(modal)/location-search"} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons name="location-outline" size={20} color={Colors.medium} />
              <Text style={{ flex: 1 }}>Use current location</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </Link>

        <Text style={styles.subheader}>Arrival Time</Text>
        <Link href={"/"} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons name="stopwatch-outline" size={20} color={Colors.medium} />
              <Text style={{ flex: 1 }}>Now</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          onPress={() => dismiss()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

      </View>
    </BottomSheetModal>
  )
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 32,
  },
  toggleInactive: {
    // backgroundColor: Colors.primary,
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 32,
  },
  activeText: {
    color: "#FFF",
    fontWeight: "700"
  },
  inactiveText: {
    color: Colors.primary,
    fontWeight: "700"
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 4,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  subheader: {
    fontSize: 16,
    fontWeight: "700",
    margin: 16
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: '#fff',
    padding: 16,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  }
})
