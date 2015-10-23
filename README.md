# start-page
a basic start page for web browsers

This is a basic html page to be loaded as a start page in any web browser.

## Features
- Google Calendar
- Customizable Quick Links
- Auto-focusing Google Search bar with extensible custom search criterion

## Instructions
To setup, clone or fork repository and download files to your computer. Next, open your Google calendar's settings and find the calendar sharing link or ID. Copy this, and create a "calendar.json" file with text similar to this:

    var calConfig = {"calid":"123alphanumericcalendarID@group.calendar.google.com"}


Now open your browser and set the home page to your start.html file location, example: file:///C:/GitHub/start-repo/start.html

That's it, you're done!


### Resources
This project uses a variety of resources.
- JQuery 2.1.4
- Google fonts Oleo Script and Kameron
- A custom modified version of 's JQuery Calendar plugin, ["gCalFlow"](http://sugi.github.io/jquery-gcal-flow/)
- Images from subtlepatterns.com featuring ["Feathered"](http://subtlepatterns.com/feathered/) and ["Diagonal Waves"](http://subtlepatterns.com/diagonal-waves/)
- And eventually, Bootstrap 3.3.5


