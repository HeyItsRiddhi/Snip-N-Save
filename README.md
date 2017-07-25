# Snip-N-Save
A chrome extension that allows you to easily copy/paste code &amp; save important code snippets for reference from a variety of websites i.e stack overflow.

Overview

Snip-N-Save is designed to simplify the process of locating code snippets from a webpage and saving that code with a tag for future use. Many times we come across important code snippets for class, personal projects, or work, and needed a way to copy, paste, and save on the fly. The following websites are supported:

  - stack overflow (fully supported)
  - google developers (fully supported)
  - mozilla developer network
  - microsoft developer network
  - national public mania np

Understanding

Upon clicking the Snip-N-Save icon, the extension scans the page looking for code snippets (marked by the html "pre" tag). Those code snippets are returned inside the pop up box. For websites we "fully support" such as stack overflow and google documentation, we have enabled a complete syntax highlighting for users very much like some IDE environments like CS50 IDE or Atom or Sublime. On other sites, like Mozilla, MSFT Developer Network, and NPM (National Public Mania) we are not currently supporting the syntax styling and highlighting, but all the code you need will appear in the pop up box. Regardless if you have scrolled to the bottom of the page, the pop up box will pull all snippets from the original poster or those who may have replied. After clicking on the icon, you can see the snips and choose the one you would like to copy to the clipboard or save. To copy to the clipboard, click the icon on the left side (the one that looks like copies of paper) and then, you can press Control + V or right click and paste into your text editor or development environment. To save, type in a title or keyword in the input box and click the save icon next to the copy button. While we specifically limit users to Snip-N-Save code from the previously mentioned websites, please know that our application is configured to be accessible from any website, allowing for continued access to your stored/saved snips. For example, if you are on facebook.com but want to share code with a friend you found earlier, it does not in anyway require you to go back to our supported websites, you have the ability to open up the extension right there and search for any saved snips you would like to share. 


Setting Up

Is this your first time working on a Chrome extension? It was for us. Here are a few basic pointers to get up and running to demo the app's raw files-

0) download our zipped project to desired location/directory
1) unzip CodeSnipExtension.zip
2) open chrome browser
3) click on 3 vertical dots on top-right corner of browser
4) select "Settings" from drop down
5) click "Extensions"
6) select "Load unpacked extension"
7) navigate to the directory/location where project is saved and click the CodeSnipExtension folder
8) press okay
9) ensure extension is enabled (checkbox should be checked)
10) start saving!

Tutorial Video

YouTube Link - https://www.youtube.com/watch?v=MFxuc6BTMw8



