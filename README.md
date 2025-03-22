# Slimewire 
Slimwire is a way for anyone to put together their own playlists without signing up for an account with a major streaming platform. With customizable themes and avatar options, users have the freedom to make slimewire look and feel how they want. Powered by the Deezer API, Slimewire has access to the latest hits as well as the classics!

# Features
## Search Music
Using the Deezer API, users can find track information for their favorite songs.
## Playlist Library
Users create their own library featuring mulitple playlists. Playlist edit options include the ability to add or delete tracks, rename the playlist, or delete the playlist as a whole.
## User themes 
Change your theme to whatever color you like, specifically the main component where you will be filling out information. 
## Custom Avatars
Create custom avatars via the internet [copy image address and paste it into the fields]. One static image and another gif to play while you listen to music.
## Comments
Leave comments on whatever songs you like the best.
## Music Player (beta)
Using oEmbed and Deezer, users can sample tracks inside slimewire.

## Getting Started & Dev Setup
To get this project running, you must follow these steps:
1. Make sure that you have npm, nvm, and node version 22 installed already.
2. Make sure that you have installed MongoDB on your machine and that it is running. (This project was tested by installing and using the “sudo mongod –path ~” command on the MongoDB Community Edition for Ubuntu on Linux, which can be installed by using this guide: [Install MongoDB Community Edition on Ubuntu - MongoDB Manual v8.0 - MongoDB Docs](https://www.mongodb.com/docs/v8.0/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu). Instructions for installing other versions of MongoDB can be found on this site, but we can’t fully guarantee their compatibility with the project.)
3. Create a copy of the config-example.js file and place the copy in the root directory, renaming the copied file to “config.js”.
4. Sign up for Google oauth services and replace the two “change me” strings in the new config.js file with strings of your actual Google client id and Google client secret that you got from signing up with Google oauth.
5. Run “npm install” in a terminal.
6. Run “npm run build” in the same terminal after the “npm install” command is done running.
7. In a new terminal, run “npm start”.
8. Follow the link that pops up in the terminal or go to [http://localhost:3000](http://localhost:3000/) in your browser to see the running application.
9. API from [Deezer for Developers](https://developers.deezer.com/api)

# Contributers
- Product Owner =  Charles
- Scrum Master = Mary Alice and Peyton
- Dev Team = [Charles](https://github.com/BMH397), [Mary Alice](https://github.com/malicesand), [Peyton](https://github.com/PeytonStrahan), [Jay](https://github.com/taytay836), and [Whitley](https://github.com/Wlegard)


# Links:  
Style Guide: [STYLE-GUIDE](STYLE-GUIDE.md)  
Contributing: [CONTRIBUTING](CONTRIBUTING.md)  
Press Release: [_PRESS-RELEASE](_PRESS-RELEASE.md)  