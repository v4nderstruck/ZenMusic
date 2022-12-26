import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

const autocompleteStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: "#171717",
    color: "rgb(212, 212, 216)"

  },
  rightButton: {
  },
  suggestionsListContainer: {
    backgroundColor: "#171717",
    opacity: 0.97,
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

const selectItemHandler = (item: any) => {
  console.log(item)
}

export default function QuickSearch() {

  return (
    <View className="w-full mt-3">
      <Text className="text-gray-100 font-thin">Find your favourite Songs!</Text>
      < View className="relative w-full z-50 mt-2" >
        <AutocompleteDropdown
          onSelectItem={selectItemHandler}
          inputContainerStyle={autocompleteStyles.container}
          suggestionsListContainerStyle={autocompleteStyles.suggestionsListContainer}
          suggestionsListTextStyle={autocompleteStyles.suggestionsListText}
          showChevron={false}
          dataSet={data}
          renderItem={(item) => (
            <Text className="text-gray-400 p-2">
              {item.title}
            </Text>
          )}
          ItemSeparatorComponent={<View />}
          EmptyResultComponent={
            <Text className="text-gray-400 p-2">
              No suggestions
            </Text>
          }
          useFilter={false}
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
