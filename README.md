# HATouch

A touch based interface for HomeAssistant based on the [AdminLTE](https://almsaeedstudio.com/themes/AdminLTE) dashboard template.

## This is an early prototype
This is an early prototype. The code is a spaghetti dumpster fire mess. Lots of code is still default AdminLTE templates. The vue.js stuff is flaky. There's not a lot of components. It's not very modular yet.
The GitHub Issues page has been populated with a number of issues/enhancements. Issues with the __help wanted__ label are things I'm not sure how to do, so unless someone from the community picks
them up, they probably aren't getting done anytime soon. Feel free to pick up any other issues as well if you want to tackle it.

## Installation
Clone the repo and stick it in a publically accessible folder on a webserver with PHP support. Update the config.js file to point to your HomeAssistant installation.
Your HomeAssistant installation must list the IP or subnet of your webserver as a trusted network. Modify the index.php file and update entities['sensor.xyz'] references to match entities within your HomeAssistant installation. If the index.php file has any references to entities that don't exist, you'll get stuck with a blank page. Check your browser dev tools for more info if that happens.