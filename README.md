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

Commit and Push your changes to master.
<!-- This will trigger Github Action and deploy the changes to firebase and tripser.blog -->

## TODO

- Articles
  - via ferrata saint julien en vercors
  - best christmas markets
  - baie de somme
  - bordeaux
  - gorges du verdon et jura
  - costa
  - croatie monténégro
  - ...

- links between articles
- add affiliate links of hotels, cars, activities, ...
- add alternative stays?

- https://codestitch.app/page-speed-handbook
- https://pagespeed.web.dev/
- seo check
- lang: check seo is good

- build mdx editor
  - handle images +compress +resize +jpg
  - FIX!! => API resolved without sending a response for /api/createMdxFile, this may result in stalled requests.
  - handle some frontmatter outside the editor: categories, lang, en-fr, ...?
  - handle translation?

- add framed text, quotes, highlighted words, 
- script an image compressor and resizer (based on original image => save new smaller and lighter images)
- search in site
- more Figures layouts
- rearange homepage: big pinned article (carousel??)
- rework logo to svg + add on homepage?
- section bon plans
- add a map of destinations

## BLOG ARTICLES

- Create a new .mdx file under `/pages/blog`
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
- Find splash image, 1920x compress on https://compressjpeg.com/ and upload in /public/images/articles/(articleName).jpg
- Find content images, 800x450, compress on https://compressjpeg.com/ and upload in /public/images/content/(articleName)/(name).jpg
- Create itinerary image from https://pebblar.com/, 800x450, compress on https://compressjpeg.com/ and upload in /public/images/maps/(name).jpg

## SOCIALS

- https://pinterest.com/tripserblog/
- https://instagram.com/tripserblog/

## ANALYTICS

Easy web analytics without tracking of personal data at https://tripser.goatcounter.com/
