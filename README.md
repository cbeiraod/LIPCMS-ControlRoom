# Intro

This is the set of scripts used for the LIP-CMS Operation Center at IST.

## Setup repository

From the Documents directory run the commands:

git clone https://github.com/cbeiraod/LIPCMS-OperationCenter.git

git checkout --track origin/auger-fd

## Setup Firefox

Create a firefox profile with: firefox -ProfileManager -no-remote

Call the profile Fullscreen

Launch firefox with that profile: firefox -P "Fullscreen" -no-remote

Inside Fullscreen profile, install the plugin: https://addons.mozilla.org/en-US/firefox/addon/FF_Fullscreen/

How to open a specific page with the profile: firefox -P "Fullscreen" -no-remote LHCStatus.html
