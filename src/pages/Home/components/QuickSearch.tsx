import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

const autocompleteStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: "#171717",
  },
  rightButton: {
  },
  suggestionsListContainer: {
    backgroundColor: "#171717",
    color: "rgb(212,212,216)",
    border: 0,
  },
  suggestionsListText: {
    color: "rgb(212,212,216)",
    border: 0,
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
          inputContainerStyle={autocompleteStyles.container}
          suggestionsListContainerStyle={autocompleteStyles.suggestionsListContainer}
          suggestionsListTextStyle={autocompleteStyles.suggestionsListText}
          key={"dropdown"}
          showChevron={false}
          dataSet={data}
          renderItem={(item) => (
            <Text className="text-gray-400">
              {item.title}
            </Text>
          )}
          ItemSeparatorComponent={<View />}
          textInputProps={{
            placeholder: "Search Song",
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              color: "rgb(212,212,216)",
            },
          }}
        />
      </View >
    </View >
  );
}
