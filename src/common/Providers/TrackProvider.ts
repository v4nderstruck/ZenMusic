import { Track } from "react-native-track-player";
import { Item } from "./MusicShelfProvider";

const API_ENDPOINT = "https://invidio.xamh.de/latest_version"
const ITAG = 140

export default {
  provide(item: Item): Track | null {
    if (item.action.action == "watch") {
      const track: Track = {
        url: API_ENDPOINT + "?id=" + item.action.watchId + "&itag=" + ITAG,
        title: item.title as string,
        artist: item.subtitle as string,
        artwork: item.artworkUrl as string,
      };
      return track;
    }
    return null;
  }
}
