# Feedback App 
This is a collaboration project between the students of the International Media and Computing Course of Studies at the HTW Berlin and Brandung GmbH in the WiSe20. 

## Demo on Heroku 
Link: https://feedbackapp-demo.herokuapp.com/

## How to run the app:
 * register a new app in Azure (follow the instructions from this article: https://docs.microsoft.com/en-in/azure/active-directory/develop/quickstart-register-app)
 * create a new database in MongoDB and get the MongoDB URI from it
 * clone this repository
 * create an empty file called ```.env``` in the root directory
 * paste the app id and secret key from Azure, as well as the MongoDB URI as the app environment variables in that file
 * run ```npm run dev ``` 
 * open http://localhost:3000/ in your browser 
 
	
## Features
 * The users don't have to sign in to use the app
 * The app finds all the meetings in one day and send links to the meeting participants 5' after the meetings end, the meeting host will be notified about the evaluation the next day
 * Participants can submit their feedback anonymously
 
 ## Screenshots
<img src="https://user-images.githubusercontent.com/56653204/107071232-b4e45780-67e4-11eb-889c-060ba7779d5d.png" /> 
<img src="https://user-images.githubusercontent.com/56653204/107071238-b6158480-67e4-11eb-915a-fe9893434311.png" />

## Contributors 
 | Name       | Email           | 
| ------------- |:-------------:| 
| Timo Schmidt  | Timo.Schmidt@Student.HTW-Berlin.de | 
| Hanh Phan     | Hanh.Phan@Student.HTW-Berlin.de |  
| Ferdinand Faller | s0548784@htw-berlin.de |
| Osee Bulayumi | 	Osee.Bulayumi@Student.HTW-Berlin.de | 
| Yannick Hass   |  Yannick.Hass@Student.HTW-Berlin.de |
| David Albrecht | David.Albrecht@Student.HTW-Berlin.de | 

 
## Documentations
* https://nextjs.org/
* https://docs.microsoft.com/en-sg/graph/overview
* https://styled-components.com/
* https://reactjs.org/docs/hooks-intro.html

## Credits
* [Start page animation by dilpreet singh on LottieFiles](https://lottiefiles.com/28457-feedback-persuasion-animation)
* [Check Mark animation by Ami Moradia on LottieFiles](https://lottiefiles.com/20576-check-mark)
* [404 Animation by Mark Arrow on LottieFiles](https://lottiefiles.com/40806-error-404?lang=de)
* [iPhone 12 Mockups by MockUPhone](https://mockuphone.com/device?type=ios#iphone12)


