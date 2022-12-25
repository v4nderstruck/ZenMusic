import { StyleSheet, Text, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

const autocompleteStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: "#171717"
  }
});

const data = [
  { id: "1", title: "test" },
  { id: "2", title: "testa" },
  { id: "3", title: "testb" },
];

export default function QuickSearch() {
  return (
    <View className="w-full mt-3">
      <Text className="text-gray-100 font-thin">Find your favourite Songs!</Text>
      < View className="relative w-full z-50 mt-2" >
        <AutocompleteDropdown
          key={"dropdown"}
          showChevron={false}
          dataSet={data}
        />
      </View >
    </View >
  );
}
