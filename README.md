# JamCart
Controls Spotify via HipChat using localhost exposed via [NGrok](http://ngrok.com).

## Requirements
Nodejs, HipChat and a Mac running Spotify.

## Installing
Clone the repo and start the server:
```
npm i && npm start
```
Spotify should start playing music! 

## Integrating with HipChat
You will receive a message in the terminal:
```
Node app is running at localhost:5000
Exposed via ngrok at  https://17d8b8c9.ngrok.com
```
Visit either of those in your browser and you will see the link for your [HipChat Integration Hook](https://confluence.atlassian.com/display/BITBUCKET/Use+the+HipChat+integration).

The command is `/spot`