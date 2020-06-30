# laravel-react-hooks-redux-boilerplate

Boilerplate for Laravel 5.8 using React 16.12.0 with Hooks, Redux Saga, Jest, Ant-Design, reduxsauce with duck pattern, implemented internationalization with i18next and using eslint 7.3.1 with airbnb style and using PropTypes. Using Laravel Passport for authentication. Implemented internationalization with Translation Strings in Laravel for en and pt-BR.

## Getting Started

### Install Dependencies

---

Once you find yourself inside the root of the cloned repository, install all Laravel dependencies by running the following commands:

#### Composer

```sh
composer install
```

Once you done, you must install all javascript dependencies by running the following command using either npm or yarn:\
It will install all required dependencies, listed in [List of Packages](#list-of-packages)

#### npm

```sh
npm install
```

#### Yarn

```sh
yarn
```

### Configure Database

---

Before starting, rename your `.env.example` file to `.env`.

Run the following command to create the APP_KEY which will be used for encryption.

```sh
php artisan key:generate
```

You must create a database on your server and update the .env file with the following information:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```

Next, you should create the tables for your application:

```sh
php artisan migrate
```

### Passport

After the tables have been created, you must run `passport:install` to create the credentials for you application

```sh
php artisan passport:install
```

This command will output the following result

```sh
Encryption keys generated successfully.
Personal access client created successfully.
Client ID: 1
Client secret: {{clientSecret}}
Password grant client created successfully.
Client ID: 2
Client secret: {{clientSecret}}
```

`{{clientSecret}}` is a 40 characters long string. You must copy it to the .env file.

Passport will also create the  `oauth_clients` table, where the desired token will be stored as "Laravel Password Grant Client", with ID 2. Copy the secret token to the row MIX_API_CLIENT_SECRET in the .env file without quotes. The MIX_API information should look like below:

```env
MIX_API_URL="${MIX_BASE_URL}/api"
MIX_API_CLIENT_ID=2
MIX_API_GRANT_TYPE="password"
MIX_API_CLIENT_SECRET="Paste the token here, the other rows should look the same, make sure its Client ID 2"
MIX_API_REFRESH_TOKEN_GRANT_TYPE="refresh_token"
```

### Setup a user

---

You must create an admin user for the application. For such, you may use the seed command or create a user manually using tinker.

This command will create the necessary tables for

### Seed

To create a user following the settings listed in:

```sh
laravel-react-hooks-redux-boilerplate
└── database
    └── seeds
        └── UsersTableSeeder.php
```

Run the following command:

```sh
php artisan db:seed
```

### Tinker (Alternative)

You may also create a user using the Tinker command. To enter the Tinker CLI run:

```sh
php artisan tinker
```

Inside Tinker CLI, create a user with the desired information by running:

```sh
>>> $user = new User
>>> $user->name = "Desired Name"
>>> $user->email = "Desired email"
>>> $user->password = Hash::make('Desired Password')
>>> $user->type = 'admin'
>>> $user->activation_token = str_random(60)
>>> $user->save()
>>> exit()
```

## Running the Application

---

After everything has been set, start your application by running:

```sh
php artisan serve
```

And react by running:

```sh
npm run watch
```

or with yarn

```sh
yarn watch
```

## List of Packages

---

| Package                             | Description                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------- |
| @babel/preset-react                 | Babel preset for all React plugins                                              |
| antd                                | An enterprise-class UI design language and React implementation.                |
| @ant-design/icons                                | Set of icons for antd ^4V.                |
| axios                               | Promise based HTTP client for the browser and node.js                           |
| babel-core                          | Babel compiler core.                                                            |
| babel-eslint                        | Allows using types or experimental features not supported in ESLint itself      |
| babel-plugin-module-resolver        | Allows add custom "root" directories that contain the modules.                  |
| cross-env                           | Run scripts that set and use environment variables across platforms             |
| eslint                              | Linter JavaScript.                                                              |
| eslint-config-airbnb                | Configuration eslint by airbnb.                                                 |
| eslint-config-prettier              | Turns off all rules that are unnecessary or might conflict with Prettier.       |
| eslint-import-resolver-babel-module | A babel-plugin-module-resolver resolver for eslint-plugin-import                |
| eslint-plugin-import                | Supports linting of ES6+ import/export syntax.                                  |
| eslint-plugin-jsx-a11y              | Static AST checker for accessibility rules on JSX elements.                     |
| eslint-plugin-react                 | React specific linting rules for ESLint                                         |
| history                             | Manage session history                                                          |
| i18next                             | I18next internationalization framework                                          |
| i18next-browser-languagedetector    | Language detector used in browser environment for i18next                       |
| i18next-http-backend                 | Backend layer for i18next using browsers http                                    |
| jest                                | JavaScript Testing Library                                                      |
| jquery                              | JavaScript library for DOM operations                                           |
| laravel-mix                         | API for defining basic webpack build steps for Laravel application              |
| lodash                              | The Lodash library exported as Node.js modules                                  |
| passport **[laravel]**              | Simple authentication library for laravel                                       |
| popper.js                           | A library used to position poppers in web applications.                         |
| prop-types                          | Runtime type checking for React props and similar objects.                      |
| react-dom                           | React package for working with the DOM.                                         |
| react-i18next                       | Internationalization for react using the i18next i18n ecosystem.                |
| react-redux                         | A predictable state container for JavaScript applications                       |
| react-router                        | Declarative routing for React                                                   |
| react-router-dom                    | DOM bindings for React Router                                                   |
| redux                               | A predictable state container for JavaScript applications                       |
| redux-saga                          | Saga middleware for Redux to handle Side Effects                                |
| reduxsauce                          | Library that provides concise methods for writing action creators and reducers  |
| resolve-url-loader                  | Webpack loader to resolves relative paths in url() statements                   |
| sass                                | A pure JavaScript implementation of Sass.                                       |
| sass-loader                         | Sass loader for webpack                                                         |
| webpack                             | Allows splitting codebase into multiple bundles, which can be loaded on demand. |

## Login and Register Page

![Login and Register](https://raw.githubusercontent.com/alefduarte/laravel-react-hooks-redux-boilerplate/master/public/img/layout.gif)

## Main Page

![MainScreen](https://raw.githubusercontent.com/alefduarte/laravel-react-hooks-redux-boilerplate/master/public/img/mainScreen.gif)

## internationalization

![i18n](https://raw.githubusercontent.com/alefduarte/laravel-react-hooks-redux-boilerplate/master/public/img/i18n.gif)

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

-   **[MIT license](http://opensource.org/licenses/mit-license.php)**
-   Copyright 2019 © <a href="https://github.com/alefduarte" target="_blank">Alef Duarte</a>.
