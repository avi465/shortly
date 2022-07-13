<h1 align = "center">Shortly</h1>
<p align = "center">Shortly is a url shortner website which help you to create shortened version of your complex long urls and manage them.
It provides detailed statistics of url access.</p>

![App Screenshot](https://github.com/avi465/shortly/blob/main/screenshot/landing-page.png)


## Tech Stack

**Client:** Html, Css, Javascript, TailwindCss

**Server:** Node, Express, MongoDB


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URL`: The url of your mongo database\
`SESSION_SECRET`\: A secret string used to sign the session cookie\
`GOOGLE_CLIENT_ID`\: The client id of your google api\
`GOOGLE_CLIENT_SECRET`\: The client secret of your google api\
`GOOGLE_CALLBACK_URL`\: The callback url of your google api\
`FACEBOOK_APP_ID`\: The app id of your facebook api\
`FACEBOOK_APP_SECRET`\: The app secret of your facebook api\
`FACEBOOK_CALLBACK_URL`\: The callback url of your facebook api\
`TWITTER_CLIENT_ID`\: The client id of your twitter api\
`TWITTER_CLIENT_SECRET`\: The client secret of your twitter api\
`TWITTER_CALLBACK_URL`\: The callback url of your twitter api\
`ROOT_URL`\: The root url of your website

## Run Locally

Clone the project

```bash
git clone https://github.com/avi465/shortly.git
```

Go to the project directory

```bash
cd my-project
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run start
```


## Features

- [x] Landing page
- [ ] Dashboard
- [ ] Responsive
- [x] Shorten Url
- [ ] Statistics
- [ ] Analytics
- [x] Signin/signup
- [ ] Profile

## Authors

- [Avinash Karmjit](https://www.github.com/avi465)
