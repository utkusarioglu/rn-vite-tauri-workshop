# XP-Navigation

Provides cross-platform page navigation.

## How does it work?

App target initializes its own callback methods such as `push` for the
navigation features. This library uses these callbacks to handle user actions.

## Usage

By convention, XpApp will define its routing targets in standard URL format.
This library is responsible for converting these url paths to values that the
target app can understand, and then feeding these transformed parameters to the
routing callback function that handles the routing in the target app.

XpApp will define the following properties for routing calls:

- pathname: `/settings/user`
- Url parameters: either as URL param strings such as `?param=one&param2=4` or
  as a js script that specifies the same values.
- Url hash: Either as an URL hash string such as `#page-position` or as the
  `hash` key in amongst `additionalParameters` property during a routing call.

The navigation library will then parse these values using the target-provided
path transformer. Then, forward the call to the target app's routing method,
such as `push`.
