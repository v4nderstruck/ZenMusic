# DevNotes 

## Working with youtube music api

Some interesting findings

- `/browse`: endpoint must be provided with `key` (internal yt api key) but it is interestingly
  same for everyone(or at least account?) currently `AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX3`
  - Should check this overtime

- minimum payload for endpoint(possibly all?) seem to be, check POSTMAN (seems to work!)
```
{
  "context": {
    "client": {
 
      "clientName": "WEB_REMIX",
      "clientVersion": "1.20221128.01.00"
    }
  }
}
```

- Rendering Home components:
  - about 220kB size (caching probably needed...)
  - use in payload `"browseId": "FEmusic_home"` (also "explore") to select render
  - also render header!
  - `musicCarouselShelfRenderer` has `musicTwoRowItemRenderer`
