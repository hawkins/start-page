![Promo graphic](/img/fav/ms-icon-150x150.png)

![Promo graphic2](/img/promotile.png)

# start-page
A simple start page for web browsers.

This is a basic chrome extension which provides a start page, replacing the stock new tab page.

![Screenshot](/img/screenshot.PNG)

## Features
- Google Calendar
- Customizable Quick Links and Categories
- Auto-focusing Google Search bar
- Easy-to-use interface with right-click to configure

## Instructions
To setup, check out [Simple Start Page](https://chrome.google.com/webstore/detail/simple-start-page/penpdmhpelafnfaeidigoapommfeoeai) on the chrome store and add it to your browser. You'll then need to get an ID for your Google Calendar, but I've made a list of [easy steps you can follow](https://github.com/hawkins/start-page/wiki/Set-Up-Google-Calendar) for that.

And that's it, you're done!

### Contributing
I welcome all types of contributions. If you have suggestions, feel free to create an ["Issue"](https://github.com/hawkins/start-page/issues/new). If you'd like to contribute code, [fork the repository](https://github.com/hawkins/start-page#fork-destination-box) and submit a pull request of your changes.

#### Development Environment Setup
I suggest cloning the repository's `master` branch down and working from there. Chrome will give you an annoying popup everytime you start chrome with the Development extension installed as such, but it's the best way to develop. Installing the finished extension from the Google Play Store will not have this warning, of course.

1. Clone the repository's master branch
2. Open Google Chrome
3. In the top right, click the hamburger/menu icon and click `settings`
4. On the left side of the settings page, click `Extensions` and then check the box next to `Developer mode` in the top right. (This may require restarting Chrome.)
5. Click `Load unpacked extension...` and browse to the folder you cloned `start-page` into and click `Ok`
6. Accept any warning popups that Chrome may provide in some configurations

And you're done! If you have any questions, feel free to make an issue on the GitHub page.


### Resources
This project uses a variety of resources.
- JQuery 2.1.4
- Google fonts Oleo Script and Kameron
- A custom modified version of [sugi](https://github.com/sugi)'s JQuery Calendar plugin ["gCalFlow"](http://sugi.github.io/jquery-gcal-flow/)
- Images from subtlepatterns.com featuring ["Feathered"](http://subtlepatterns.com/feathered/), ["Diagonal Waves"](http://subtlepatterns.com/diagonal-waves/), ["Dark Sharp Edges"](http://subtlepatterns.com/dark-sharp-edges/), and ["Congruent Pentagon Outline"](http://subtlepatterns.com/congruent-pentagon-outline/).
- And, eventually, Bootstrap 3.3.5
