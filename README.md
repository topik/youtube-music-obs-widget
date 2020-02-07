# Google Youtube Music OBS Widget
Google Music / Youtube Music OBS (Streamlabs OBS) widget

This widget is using Google Play Music Desktop Player websocket connection for displaying informations about song that is being played. 

## Features
- Your viewers can see what are you listening to
- Easy setup
- Responsive
- Doesn't need server to run, everything is HTML and Javascript
- Possible to hide/change some elements, for example progress-bar, disable background, disable album image, position album image to right, circle progressbar
- [Text-only version](#Text-only-version)
- [no-CSS version](#no-CSS-version)

## Requirements:
- Google Play Music Desktop Player (https://www.googleplaymusicdesktopplayer.com/)
- Enable Playback API (GPMDP > General > Enable Playback API, image: https://imgur.com/a/BbsKxFy) and restart GPMDP

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
| `disable-time`     | Disable timer above progressbar | `index.html?features=disable-time`     |

You can combine multiple parameters together, for example for transparent background and circle progress bar, you will use: `index.html?features=transparent-background+circle-progressbar`

## Examples
### Basic setup
URL of the widget: https://topik.github.io/google-youtube-music-obs-widget/index.html  
Width: 400  
Height: 120  
![image](https://user-images.githubusercontent.com/3578443/73892612-aed93500-4877-11ea-815b-4cb4aa186321.png)

### Disabled timer and progressbar
URL of the widget: https://topik.github.io/google-youtube-music-obs-widget/index.html?features=disable-time+disable-progressbar  
Width: 400  
Height: 120  
![image](https://user-images.githubusercontent.com/3578443/73892932-7a19ad80-4878-11ea-888f-0ae8f02e2380.png)

### Enable circle progressbar (around album image)
URL of the widget: https://topik.github.io/google-youtube-music-obs-widget/index.html?features=circle-progressbar  
Width: 400  
Height: 120  
![image](https://user-images.githubusercontent.com/3578443/73893118-1348c400-4879-11ea-8d4e-bfedd4fee950.png)

### Shift position of album image
URL of the widget: https://topik.github.io/google-youtube-music-obs-widget/index.html?features=right  
Width: 400  
Height: 120  
![image](https://user-images.githubusercontent.com/3578443/73893232-5a36b980-4879-11ea-9763-741d23df5772.png)

### Disable background image (set background as transparent) and enable circle progressbar
URL of the widget: https://topik.github.io/google-youtube-music-obs-widget/index.html?features=transparent-background+circle-progressbar  
Width: 400  
Height: 120  
![image](https://user-images.githubusercontent.com/3578443/73893495-2314d800-487a-11ea-8d3b-9fddbdf0ec1a.png)

### Disable background, text only version
URL of the widget: https://topik.github.io/google-youtube-music-obs-widget/index.html?features=transparent-background  
Width: 400  
Height: 100 (everything under 101px is text only version)  
![image](https://user-images.githubusercontent.com/3578443/73893693-a7675b00-487a-11ea-9795-f31b6a6f19ed.png)

### Fullscreen width footer
URL of the widget: https://topik.github.io/google-youtube-music-obs-widget/index.html  
Width: 1920  
Height: 150  
![image](https://user-images.githubusercontent.com/3578443/73893833-075e0180-487b-11ea-93f5-b8b086be7d0d.png)

You can basically set any width and height. You can also open the page (https://topik.github.io/google-youtube-music-obs-widget/index.html) in your browser to test the size of the widget.

## Text-only version
Widget will show only interpret name and song name.  
URL:https://topik.github.io/google-youtube-music-obs-widget/textonly.html

## No-CSS version
Basic widget without no additional CSS. You can customize CSS via OBS or by downloading this project.
URL:https://topik.github.io/google-youtube-music-obs-widget/nocss.html



## Contributing
If you find some bug or if you write new feature, just fork this repo and make a pull request.

## Contact
https://topik.dev
