## Moviepedia
Moviepedia is a web application that serves like an online database of movies and provides information about them.<br/>
Here are the basic functionalities of the application
* In the homepage you can see the list of trending and upcoming movies
* You can choose a genre and view a list of movies from that genre
* For a given genre you can filter the movies based on the release year
* You can pick a year and list movies released on that year (every genre included)
* Movies are sorted and viewed by their popularity rating
* You can view detailed information about a certan movie such as:
  * name of the movie
  * plot
  * director(s)
  * writer(s) 
  * release date
  * runtime
  * box office
  * imdb rating
  * production companies
  * genres that this movie belongs to
  * cast
* You can view detailed information about an actor such as:
  * name
  * birthdate
  * place of birth
  * biography
  * movies
  * tv shows
* You can search using keywords and related movies, tv shows and actors will be presented to you sorted by the popularity

## Motivation
I created this application during my spare time to improve my React skills.

## Frameworks and libraries used
* __React__ (to build the user interface)
* __Redux__ (to keep track of the state of the application)
* __Materialize CSS__ (to style the application)
* __axios__ (to make api calls)

## APIs used
To populate the website I needed some kind of data which I don't have in bulk amount.<br/>
So I searched the web and found these two awesome APIs that I can use to get data from.<br/>
I would like to extend my gratitude to the developers of these APIs.
### The Movie Database(TMDb) <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" width="200">

[TMDb](https://www.themoviedb.org/) is a free api that you can use to get data for movies, tv series and actors.<br/>
To use it you need an api key which you can get after registering on the website.

### The Open Movie Database(OMDb) <img src="http://www.omdbapi.com/favicon.ico" width="40">

[OMDb](https://www.omdbapi.com/) is also a free api for which you should also have a key to use.<br/>
You can get a key for either a donation(unlimited requests) or for free(1000 daily limit). I used the "free" option.

## Issues encountered
When I first created a more or less working version of the application I was sending data(name of the movie, actor etc.) to components as props from a parent component.
However, keeping in mind the users' behavior I tried to reload the pages(browser's refresh button). I received errors and as it turns out the props had disappeared.
Also it was becoming harder to track each component's state, so I decided to use Redux. To maintain certain information (which movie or actor is selected, etc.) which I needed for api calls I stored them in the _localStorage_ which were available upon request.<br/>
Moreover, the application was behaving differently each time I clicked on certain links. For example I would get error saying _variable.map()_ is not a function. I was getting those _variable_ arrays as props from the state which in fact were being stored in _localStorage_ as well. After a bit of testing I found out that when you store arrays in _localStorage_ it actually keeps the address of the array and not the value of it. Moreover, I didn't need to store them(arrays passed as props) in the _localStorage_ since I was making api calls after each page redirects or clicks or refresh and the needed information(not the arrays, but primitives, like movie id genre id etc.) for these calls were already stored in the _localStorage_.
There were some more code and logical errors and bugs that I encountered, but the internet was kind enough to help me out.<br/>
To understand better you can inspect the code for actions, the reducer and some components. That should be insightful enough.

## Deployment
I deployed the application to the __Netlify__ and it is available to preview on [Movipedia](https://moviedbpedia.netlify.app/)

__P.S:__ The core part of the application is done but the styling is still under development.

## Preview
Here are some screenshots of the application

### Homepage
![homepage](/screenshots/homepage.PNG)

### Genre
![genre](/screenshots/genre.PNG)

### Year
![year](/screenshots/year.PNG)

### Search Results
![search](/screenshots/search.PNG)

### Movie information
![movie_info](/screenshots/movie_info.PNG)

### Actor information
![actor_info](/screenshots/actor_info.PNG)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
