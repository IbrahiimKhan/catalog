# Development Log

## Phase 1: Initial Product and Location Features
- **Completed**:
  1. Fetched  products from the API with ascending/descending ordering using rtk query
  2. Retrieved and stored user's current latitude/longitude on the homepage using the geolocation library .
  3. Created a product details screen.
  4. Rendered a map with the user’s current location with react native map.

  to get the actial coordinates:

    That is the correct behavior on the iOS simulator (and the Android emulator). You can change the mocked coordinates for geolocation on each like so (paraphrased from other answers):

    iOS

    Run app in iOS simulator.
    At the top menu bar, you'll find Features -> Location -> Custom Location..(or you can choose to use others).
    Set the Latitude & Longitude for the location.
    Android

    Run app in Android emulator.
    Click on the ellipsis (...) in the toolbar.
    Edit the coordinates in the newly opened settings under Location.
    5. Developed a cart screen with quantity adjustment with redux store and slices.

- **Thought Process**: Focused on establishing core functionality and ensuring smooth interaction with API by rtk query . Did setup the redux store to persist cart item.
- **Challenges**: Handling geolocation permissions on different platform and implementing map integration.

## Phase 2: Offline Support and Caching
- **Completed**:
  1. Enabled offline caching of viewed products.
  2. Created a "History" screen for offline access to past products.
  3. Implemented network change detection to handle offline/online transitions.
  4. To check this feature, if you are on emulator please go on //off the airplane mode.

- **Thought Process**: Cached viewed products for seamless offline access.
- **Challenges**: Ensuring data syncing works smoothly when coming back online or going back again to offline.

## Phase 3: Native Module and Timestamp
- **Completed**:
  1. Created a native module to fetch the current timestamp every 20 seconds(android only).
  2. Displayed the timestamp on the homepage with local time formatting with moment

- **Thought Process**: Developed a periodic timestamp update using native modules.
- **Challenges**: IOS side implementation(incomplete).
