# google-youtube-music-obs-widget
Google Music / Youtube Music OBS (Streamlabs OBS) widget

This widget is using Google Play Music Desktop Player websocket connection for displaying informations about song that is being played. 

## Features
- Your viewers can see what are you listening to
- Easy setup
- Responsive
- Possible to hide/change some elements, for example progress-bar, disable background, disable album image, position album image to right, circle progressbar

## Requirements:
- Google Play Music Desktop Player (https://www.googleplaymusicdesktopplayer.com/)
- Don't forget to enable Playback API (GPMDP > General > Enable Playback API, image: https://imgur.com/a/BbsKxFy)

## Installation steps for OBS (Streamlabs OBS)
1) Add source
2) Browser source
3) URL: https://topik.github.io/google-youtube-music-obs-widget/
- in case you want to run widget on your local machine, clone this repository, check `Local file` and link the file `index.html`

## Parameters
You can use multiple parameters (separated by `+` sign) for disabling/enabling some features.

| Parameter              | Information                                                       | Usage                                      |
|------------------------|-------------------------------------------------------------------|--------------------------------------------|
| `right`                  | Puts album image to the right side (default left)                 | `index.html?features=right`                  |
| `disable-progressbar`    | Disables bottom progressbar                                       | `index.html?features=disable-progressbar`    |
| `disable-albumimage`     | Disable album image                                               | `index.html?features=disable-albumimage`     |
| `transparent-background` | Disable background, set background as transparent                 | `index.html?features=transparent-background` |
| `circle-progressbar`     | Disable progressbar, use circle around album image as progressbar | `index.html?features=circle-progressbar`     |

You can combine multiple parameters together, for example for transparent background and circle progress bar, you will use: `index.html?features=transparent-background+circle-progressbar`

## Examples
### Basic setup

