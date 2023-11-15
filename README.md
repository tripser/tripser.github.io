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

- new logo
- social card

- review button design && shapes && h1 (articles)

- TS?
- write first articles

- goatcounter
- create GH secret?
- domain
- socials

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
  categories: 'next.js, css, tutorial, analytics'
  ---
  ```
- Write the article with keywords, speaking with we, code examples and a final result on codepen or codesandbox
- Review spell on https://languagetool.org/
- Create blog article image: https://codepen.io/beumsk/full/wvjYygY and upload in /public/images/articles

## ANALYTICS

Easy web analytics without tracking of personal data at https://tripser.goatcounter.com/
