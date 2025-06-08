# music_player_website

# Spotify Clone

A lightweight music player web app inspired by Spotify, built with vanilla JavaScript, HTML, and CSS.



## Features

- Dynamic song loading from local folders

- Play, pause, next, previous controls

- Display current song time and duration with progress bar

- Responsive UI with clean, dark-themed design

- Playlist display with clickable songs to play immediately



## How to Run

1. Clone the repository

2. Run a local server (e.g. `http-server` or `Live Server` in VSCode)

3. Place your `.mp3` files inside the `songs/<folder-name>/` directories

4. Open the app in your browser at `http://localhost:3000`



## Technologies Used

- JavaScript (ES6)

- HTML5

- CSS3 (with Google Fonts Poppins)

- Fetch API to load songs dynamically



## Project Structure

songs folder - contains folders with mp3 files

index.html - main HTML file

style.css, utility.css - CSS styles

script.js - JavaScript logic for player controls

and various SVGs.



## How it Works

- The app fetches the list of songs dynamically from the server

- Clicking on a playlist loads songs from that folder

- Playbar shows current song info and playback controls

- Seekbar allows jumping to specific time in the song



---



### 2. How your CSS and JS work together



- **JS (app.js)** dynamically fetches song files and injects the song list HTML (`<li>` elements) inside `.songlist ul`.

- When a user clicks a song, JS updates the `Audio` source and plays it, also updating `.songinfo` and `.songtime`.

- The `.seekbar` and `.circle` visually represent playback progress and allow seeking.

- CSS controls the look & feel:

 - `.songlist ul li` styles each song item with spacing, hover effects, and cursor pointer.

 - `.playbar` and `.songbuttons` style the playback controls and progress bar.

 - Utility classes like `.flex`, `.justify-center`, `.item-center`, and `.border` help with layout and styling consistency.

 - Dark theme colors and fonts are set globally.



Together, the JS manages data and interaction, while CSS ensures everything looks sleek and user-friendly.

