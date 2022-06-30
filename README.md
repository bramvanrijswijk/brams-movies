# Bram's Movies app

![Schermafbeelding 2022-06-30 om 10 47 59](https://user-images.githubusercontent.com/26224522/176634713-b1c18cee-4d8a-4039-bf23-9d6112b73934.png)

## Frameworks & tools

- Vue 3 (Composition API)
- Vue Router
- Tailwind CSS

## Start project

```
npm install
npm run serve
```

## The project

### Explanation

The application exists of 3 views:

1. HomeView
2. SearchResultsView
3. SingleTvShowView

**HomeView**\
This is the homepage of the application. When this view is loaded, ``fetchTvShows`` will be called. Because the API
returns only 250 tv shows per page, I do two calls in this method and concat them. When this process is done, the
computed property `popularTvShows` will exclude all tv shows without a rating. After that it will order it by their
rating. For the first 20 popular tv shows, I fetch the hero image. Unfortunately the API provides this in a separate
call and to prevent loading 500 images for all shows, I do only the first 20 (only those will be shown in the "Now
popular" section).

**SearchResultsView**\
This view is used to show the tv shows based on a search term. On mounted it will pick the search term from the URL and
uses it in `fetchShowsBasedOnSearch`.

**SingleTvShowView**\
This is the view to show more information about the selected tv show. On mounted it will fetch the data from the API and
its images in a separate call, like explained in HomeView.

### Bugs to fix

- Sometimes when the application is loaded after a ``npm run serve``, there is no image loaded in the Hero section.
  Please refresh the page when this happens.

### Todo

- Extract "Now popular" section to separate component
- Extract tv shows per genre section to separate component
- Extract `fetchImages` to usable
- Add Jest tests
