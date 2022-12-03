// ReqPayload - Minimal payload to pass api pre-check
// hardcoded?
export interface ReqPayloadClient {
  clientName: String,
  clientVersion: String,
}
export interface ReqPayloadContext {
  client: ReqPayloadClient,
}

export const defaultReqPayloadContext: ReqPayloadContext = {
  client: {
    clientName: "WEB_REMIX",
    clientVersion: "1.20221128.01.00"
  }
}

export interface ReqPayload {
  browseId?: "FEmusic_home" | "FEmusic_explore" | "FEmusic_liked_playlists",
  context: ReqPayloadContext,
}

// MusicCard - Simple representation of a Song 
export interface MusicCard {
  title: String,
  id: String,
  subtitle: String,
  thumbnailUrl?: String,
}

// MusicShelf - List of MusicCards, grouped by a group title
export interface MusicShelf {
  title: String,
  cards: MusicCard[]
  // add continuation stuff??
}

// Account - All display information of current account
export interface Account {
  username: String,
  pbThumbnailUrl: String
}


