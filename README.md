# Giftastic
Using the Giphy API, this web page generates 10 gifs at a time based on my predifined chosen topics, or a topic chosen by the user. 

 ## How does it work?
1. The program uses ajax and jQuery to call the Giphy API. It then uses JavaScript and jQuery to change the HTML of the page.
2. Initially, 10 buttons are displayed, each with a topic I have chosen. 
3. The user can click on one of these buttons, or may choose to add their own button using the input field in the top-right of the screen and clicking 'Add'. 
4. Upon clicking a button, 10 gifs will be genereated based on the topic. These gifs will be still images.
5. The user will see the rating of each gif and a download icon that they can use to download the image. 
6. The images can be toggled to show or hide their animations by clicking on the images themselves.
7. Each time images are generated, they will be in groups of 10 and the most recent will be at the top of the page. 

 ## Who will use this repo or project?
**Anyone** who has a passion for something silly, something cute, or something strange - and with a decent amount of free time on their hands.

 ## What is the goal of this project?
To learn how to use Giphy's API, how to submit the query URLs and to be familliar with the many different parameters being used within this framework.

## Bonus
Implemented the OpenWeatherMap API to show the current weather for the RTP. I also used the HTML5 geolocation function to add the users current location displayed as lat and lon.