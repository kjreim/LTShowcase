# Lt Showcase

## Resources

Download Node.js v20 [Node Downloads](https://nodejs.org/en/download)
Make sure to include npm and add node install path to PATH env variable

Download .NET v8 [.NET Dowloads](https://dotnet.microsoft.com/en-us/download/dotnet)

If using [VS Code](https://code.visualstudio.com/) you can install a [C# and C# Dev Kit extension ](https://code.visualstudio.com/docs/languages/dotnet).

For Angular there are some useful VS Code extensions to have [Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)


After cloning the repository locally there will be two main folders
 - LTApi 
   - .Net 8 web api utilizing Api controllers. This will hit the LT api and store the albums in memory which than gets served to the UI
 - PhotoViewer
   - Angular 19 application with Angular Materials for viewing the albums

## Api setup

- open a command console and navigate to the LTApi folder
- run 'dotnet run LTApi.csproj /p:Configuration=Debug /p:Platform="AnyCPU"'
- The api will be listening to port 5290
- 'http://localhost:5290/swagger/index.html' will open the swagger UI and allow you to view the API's and schemas
- The app settings json files (appsettings.json and appsettings.Development.json) will have to have the LT header and api settings added

## UI setup

 - open a command console and navigate to the PhotoViewer folder
 - run 'npm ci' which will install the node modules
 - once that is completed run 'ng serve' to build and start the webpack dev server. 
   - you can type 'o' + enter which will launch your default brower to 'http://localhost:4200'


## UI Navigation

There are 2 main pages. The landing page where all the albums will be listed limiting the photos to 4.
Clicking on the view all will navigate to a new page where all the pictures for the given album will be shown.
At any time the photo can be clicked on to open up a dialog to view a bigger version of the picture

The app has both dark and light modes which can be switched using the top right button. It will default to the system.

## UI Testing

ng test will run all the tests for the Angular application.
the .spec files are in the same folder as the component/service.

## TODO

- add a 404 page
- add a general api error handler
- add url params to limit amount of photos from api responses