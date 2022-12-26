import { useMemo, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import Icon from 'react-native-vector-icons/Ionicons';
import SearchSuggestionProvider from "../../../common/Providers/SearchSuggestionProvider";

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
    opacity: 0.99,
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
  { id: "4", title: "test" },
  { id: "5", title: "testa" },
  { id: "7", title: "testb" },
  { id: "8", title: "test" },
  { id: "99", title: "testa" },
  { id: "32", title: "testb" },
  { id: "42", title: "test" },
  { id: "51", title: "testa" },
  { id: "72", title: "testb" },
];

const selectItemHandler = (item: any) => {
  console.log(item)
}

const submitHandler = ({ nativeEvent }: any) => {
  console.log(nativeEvent.text)
}

interface Suggestion {
  id: string,
  title: string,
}

export default function QuickSearch() {
  const [suggestionList, setSuggestionList] = useState<Suggestion[]>([])
  const inputChangeHandler = async (input: string) => {
    const suggestions = await SearchSuggestionProvider.fetch(input);
    console.log(suggestions)
    const set = suggestions.map(item => {
      return {
        id: item.query,
        title: item.text
      } as Suggestion
    });
    setSuggestionList(set)
  }
  return (
    <View className="w-full mt-3">
      <Text className="text-gray-100 font-thin">Find your favourite Songs!</Text>
      < View className="relative w-full z-50 mt-2" >
        <AutocompleteDropdown
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get("screen").height * 0.8}
          onSelectItem={selectItemHandler}
          onSubmit={submitHandler}
          inputContainerStyle={autocompleteStyles.container}
          suggestionsListContainerStyle={autocompleteStyles.suggestionsListContainer}
          suggestionsListTextStyle={autocompleteStyles.suggestionsListText}
          onChangeText={inputChangeHandler}
          dataSet={suggestionList}
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
          showChevron={false}
        />
      </View >
    </View >
  );
}
