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

needs node v14

## DEPLOY

Also make sure your linter is error-free with `npm run lint` or `yarn lint`

Deployment should be managed by the pipeline (`npm run deploy` or `yarn deploy`)

Commit and Push your changes to master.
This will trigger Github Action and deploy the changes to gh-pages.

## TODO

- Articles
  - intra links
  - suggestions

- article image with credit
  - link on image to image gallery
  - more Figures layouts
- 404 to have more suggestions
- rearange homepage: big pinned article (carousel??)
- rework logo to svg + add on homepage?
- image gallery page with links to articles
- lang: check seo is good

- review button design && moving shapes
- TS?

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
- Find splash image and upload in  /public/images/articles/(articleName).jpg
- Find content images, resize to 800x450, compress on https://compressjpeg.com/ and upload in /public/images/content/(articleName)/(name).jpg

## SOCIALS

- https://pinterest.com/tripserblog/
- https://instagram.com/tripserblog/

## ANALYTICS

Easy web analytics without tracking of personal data at https://tripser.goatcounter.com/
