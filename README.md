# Re:invent Portal Extension

Chrome extension that helps you reserve a seat at your favourite re:invent sessions.

## What problem does it solve?
The re:invent portal is buggy and makes the community to build third party hacks to make it better every year. When the reserved seating opens in mid-October there's a stampede and you have to be FAST to get a seat at the sessions you want (if you fail, walk-up is rarely a problem and you'll still have a great conference, but it means more queueing).

The portal lets you star-mark your sessions ahead of the reserved seating so you can quickly reserve a seat when the reservation opens. However, from my experience, you want to categorise your stars into sessions you _dont want to miss_ and _sessions you want to see_. When reserved seating opens you want to reserve the important ones first and then move on to the less important ones.

This extension lets you heart-mark the ones you _really want_ so you can distinguish them from the less important ones. 

In 2021 there was a bug that meant you couldn't reserve a seat from the filtered 'My Favorites' page - you had to search for each session in order to make a reservation. This extension takes that bug into consideration.

## Usage
In the days before reserved seating star and heart your sessions. When reserved seating opens, click 'Open my ❤️'. This will open each of your hearted sessions in their own tab. Quickly move through each tab and click 'reserve'.

![Demo](/images/demo.gif)

## Install

This has not yet been published. To install:

* Clone the repo, run `npm install && npm run build` 
* In your browser, go to chrome://extensions
* Click `Load unpacked`
* Browse to and select <project root>/build

---

This project was bootstrapped with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)

