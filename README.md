LightDM Webkit Angular-JS Theme
===============================

This is a LightDM theme for a WebKit enabled greeter using Angular-JS (and other javascript goodies). 
It was created as an experiment to explore the possibilities of web-apps as greeters.
It also uses some custom properties (if available) from [LightDM Tex Greeter] (https://github.com/raulcesar/lightdm-tex-greeter) on github

Installation Instructions
-------------------------
You will need to install LightDM as your login manager and a greeter capable of rendering web pages as the U.I.
(i.e. [lightdm-webkit-greeter] (https://aur.archlinux.org/packages/lightdm-webkit-greeter/) from AUR or [lightdm-tex-greeter] (https://github.com/raulcesar/lightdm-tex-greeter) from github.

Make one of these greeters the default LightDM greeter by editing the LightDM configuration file:

<pre>
/etc/lightdm/lightdm.conf
</pre>

Cange the **greeter-session** value to your greeter's name (i.e. "lightdm-webkit-greeter" or "lightdm-tex-greeter"). 
LightDM.conf should now have something like:

<pre>
[SeatDefaults]
greeter-session=lightdm-tex-greeter
allow-guest=false
</pre>

Next, in order to install them actual theme, follow the following steps:

1. Run "bower install" to download javascript library dependencies (angular, angular-animate, angular-bootstrap, jquery and lodash). If you do not have bower installed, 
you can simply download these dependencies and alter the **index.html** file to point to the appropriate location.
2. Copy all the files of this repository into the following location:
<pre>
/usr/share/lightdm-webkit/themes/angular-theme
</pre>
3. Change the greeter config file located in /etc/lightdm/ to contain the following line:
<pre>
webkit-theme=angular-theme
</pre>

Note that the actual configuration file will depend on the greeter. For the examples above either **lightdm-webkit-greeter.conf** or **lightdm-tex-greeter.conf**

Now reboot and customize the theme to your hearts content!
