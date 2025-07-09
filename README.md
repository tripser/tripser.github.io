# Tripser Blog site

Website built with React and Nextjs.

Sass for styling.

React icons for icons.

MDX turn .mdx files into html.

Gray-matter gets the meta data out of .mdx files

## INSTALL

```
npm install
yarn install
npm run dev
yarn dev
```

needs node v18.17.0

## DEPLOY

Also make sure your linter is error-free with `npm run lint` or `yarn lint`

Deployment should be managed with `npm run deploy` or `yarn deploy`

Site is deployed on Firebase Hosting: https://console.firebase.google.com/u/0/project/tripser-496d9/overview

Commit and Push your changes to master once site is deployed.

## TODO

- find better solution for mdx files under [locale] folder !!

### Articles
- reunion
  - top 10 des randonnées à l'île de la Réunion
  - top 10 des plages à l'île de la Réunion
  - top 10 des cascades à l'île de la Réunion    
  - top 10 des choses à faire à l'île de la Réunion
- via ferrata saint julien en vercors
- best christmas markets
- split drome and vercors
- baie de somme
- bordeaux
- jura
- costa rica
- ...

### CONTENT
- add travel data: traveled period, days, budget, itinerary, car rental, currency, ...?
- add a list of titles on top of the article
- add framed text, quotes, highlighted words, 
- rearange homepage: big pinned article (carousel??)
- rework logo to svg + add on homepage?
- section bon plans
- add a map of destinations

### SEO & MARKETING
- bold words & keywords in the text
- links between articles
- add affiliate links of hotels, cars, activities, ...
- add alternative stays?
- https://codestitch.app/page-speed-handbook
- https://pagespeed.web.dev/
- seo check
- lang: check seo is good

### EDITOR
- handle some frontmatter outside the editor: categories, lang, en-fr, ...?
- handle translation?
- FIX? => API resolved without sending a response for /api/createMdxFile, this may result in stalled requests.


## BLOG ARTICLES

### Editor way

- start new article from admin page
- fill in the form with title, intro, date, lang, categories etc
- pick the main image: 1920x1080, compression is handled by the editor
- prepare the content images: 800x450, compression is handled by the editor 

### Coding way

- Create a new .mdx file under `/pages/[locale]/blog`
- Give it a powerful name
- Add the meta data at the very top
  ```
  ---
  title: 'Post title'
  intro: 'Post longer title or intro'
  published: '2022-12-30'
  modified: '2022-12-31'
  lang: 'fr'
  en: 'weekend-in-luxembourg'
  categories: 'next.js, css, tutorial, analytics'
  ---
  ```
- Write the article with keywords, speaking with we, giving lots of details on itinerary, location, hotels, restaurants, activities
- Affiliation??
- Review spell on https://languagetool.org/
- Find splash image, 1920x1080 compression will be done in article editor (/public/images/articles/(articleName).jpg)
- Find content images, 800x450 compression will be done in article editor (/public/images/content/(articleName)/(name).jpg)
- Create itinerary 
  - Google mymaps (https://www.google.com/maps/d/u/4/) and embed it in the article 
  - OR add code for openstreetmap with leafletjs
  - OR https://codesandbox.io/p/sandbox/itinerary-frnrnw, 800x450, compression will be done in article editor (/public/images/maps/(name).jpg)

## SOCIALS

- https://pinterest.com/tripserblog/
- https://instagram.com/tripserblog/

## ANALYTICS

Easy web analytics without tracking of personal data at https://tripser.goatcounter.com/


## SCRIPTS

- `yarn dev`: run the app in development mode
- `yarn lint`: lint the code with eslint
- `yarn ts`: check for TypeScript errors
- `yarn build`: build the app in SSG mode for production,
- `yarn start`: run the app in production mode (locally)
- `yarn local`: shortcut to run the app in production mode (locally)
- `yarn analyze`: analyse the next.js bundle size
- `yarn export`: "next export"
- `yarn sitemap`: generate the sitemap.xml & sitemap.js files
- `yarn blog`: generate the blog list
- `yarn photos`: generate the photos list
- `yarn deploy`: build the app and deploy it to Firebase Hosting
- `yarn deploy:h`: deploy to Firebase Hosting