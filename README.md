# Weather App

Fetches weather information from Visual Crossing`s API and displays it to the user.

Aiming to practice API integration and webpack

## Features

Background changes colors according to the searched location sunrise and sunset.

Information for the next 7 days (today included).

Hour information.

Option for fahrenheit, celsius, km and miles.

## Technologies

- Webpack
- Visual Crossing API
- JavaScript
- Node Package Manager
- CSS

---

### Todo:

- [x] Minimize css
- [ ] Separate css styles between each module
- [x] Icon for loading
- [x] Implement search as a transitioning menu - DONE
- [x] Implement visible message(render) on bad request( for instance invalid location)
- [x] Implement toggle between metric, us, uk - DONE
- [x] Handling form submission - DONE
- [x] Fix rendering to render the first day not the last
- Render hours:
  - [ ] Implement scroll behavior on click for hours
  - [x] Fix hours not showing scale (FIXED)
- [x] Render additional days - (DONE)
- [x] make app color match the sunrise/sunset (DONE)
- [X]Get icons for close and submit (input img or svg) DONE
- [x] Blur backdrop
- [x] Get icons for the weather(DONE)
  - [ ] Make the ones for sunrise/sunset/rain chance
- [x] ~ Replace additional info to be a grid instead of flex ~ (DONE)
- Refactor Screen controller:

  - [x] Move the form rendering to the form controller(DONE)

- Consider graphs/chars
- [ ] Improve background changing colors
