# Intro

This is the set of scripts used for the LIP-CMS Operation Center at IST.

## Setup repository

From the Documents directory run the commands:

git clone https://github.com/cbeiraod/LIPCMS-OperationCenter.git

git checkout --track origin/auger-monitor

## Setup Firefox

Create a firefox profile with: firefox -ProfileManager -no-remote

Call the profile NoRestore

Launch firefox with that profile: firefox -P "NoRestore" -no-remote

Change the settings so that it shows a blank page when being opened and add the certificate if this is not the public instance of the ROC

Finally, go to the page about:config, say you will be careful and accept the risk. Search for sess and then double click on the property browser.sessionstore.resume_from_crash to set it to false. You are now done

How to open a specific page with the profile: firefox -P "NoRestore" -no-remote LHCStatus.html

## Prepare environment

The ROC.desktop file is the one that launches the ROC. It is desirable to create a shortcut on the desktop so that it can be easily accesssed and eventually to put it in the autostart so that it is automatically opened when the user logs in.

Modern operating systems do not always show files on the desktop, in a first step, this needs to be enabled. For GNOME3 the instructions are [[https://askubuntu.com/questions/43246/how-to-configure-gnome-3-to-show-icons-on-desktop|here]], in the answer from Cas. In essence, just run this command

```sh
gsettings set org.gnome.desktop.background show-desktop-icons true
```

Edit the desktop file, by converting the relative link to the index file into an absolute link.

See [[https://askubuntu.com/questions/514661/should-i-make-executable-text-file-or-a-desktop-one|here]] details about the desktop file.

To create the link to the desktop, just right click an the file and choose the option "Send to/desktop(create link)"

To create the link to autostart, run the following command:

```sh
mkdir -p $HOME/.config/autostart
ln -s $HOME/Documents/LIPCMS-OperationCenter/ROC.desktop $HOME/.config/autostart
```
