# Things I've learned:

-   Libraries: React, TailwindCSS, Firebase Auth
-   React: Hooks / Reducers / Context
-   Deploying through Netlify
-   Minimal Webpack with SVG support
-   Consuming data from an api
-   Protected Routes using `react-router-dom`
-   Implementing a table with sorting capabilities for data
-   Handling async/await in a reducer.

# USER FLOW

1. User is authorized by Github OAuth
2. User is routed to dashboard.
3. User is shown table of repos with relevant information (i.e. repo creation date, last commit, number of collaborators, etc.)
4. User can select a number of repos.
5. Delete button is enabled.
6. Compiled repos is shown (List Review?) before deletion.
7. Delete.
8. Additional Instruction Page after deletion to delete more or delete account.

# TODOS

-   [x] Firebase and Auth Context integration w/ Github
-   [x] Protected Routing
-   [x] Fetch data from Github using access token
    -   [] store fetched data in local storage
-   [x] Selectable, filterable data table
    -   [] filter by selected only
    -   [] clickable/sortable headers
-   [x] Store Context for passing data for "Review" stage.
-   [x] Review Page
    -   [x] deselect item
    -   [] undo deselected item

# RELEASE NOTES

## Feature:

## Changes:

-   BUG

# Webpack

     | ./src/Dashboard.js 12.6 KiB [built]
     | ./src/Home.js 1.73 KiB [built]
     | ./src/Review.js 6.29 KiB [built]
     | ./src/ProtectedRoute.js 870 bytes [built]
     | ./src/layout/DashboardLayout.js 754 bytes [built]
     | ./src/assets/images/check-square.svg 969 bytes [built]
     | ./src/assets/images/square.svg 851 bytes [built]
     | ./src/assets/images/arrow-up-circle.svg 960 bytes [built]
     | ./src/assets/images/arrow-down-circle.svg 967 bytes [built]
     | ./src/assets/images/undraw_throw_away.svg 8.78 KiB [built]


     WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).

This can impact web performance.
Assets:
bundle.js (2.29 MiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
main (2.29 MiB)
bundle.js

Entrypoint main [big] = bundle.js
[10] ./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/postcss-loader/src!./src/styles.css 4.15 MiB {0} [built]
[12] (webpack)/buildin/global.js 472 bytes {0} [built]
[26] ./src/styles.css 1.7 KiB {0} [built]
[43] ./src/index.js + 25 modules 112 KiB {0} [built]
| ./src/index.js 303 bytes [built]
| ./src/AuthContext.js 4.69 KiB [built]
| ./src/App.js 946 bytes [built]
| ./src/ReposContext.js 2.22 KiB [built]
| ./src/constants/routes.js 90 bytes [built]
| ./src/Dashboard.js 12.6 KiB [built]
| ./src/Home.js 1.73 KiB [built]
| ./src/Review.js 6.29 KiB [built]
| ./src/ProtectedRoute.js 870 bytes [built]
| ./src/layout/DashboardLayout.js 754 bytes [built]
| ./src/assets/images/check-square.svg 969 bytes [built]
| ./src/assets/images/square.svg 851 bytes [built]
| ./src/assets/images/arrow-up-circle.svg 958 bytes [built]
| ./src/assets/images/arrow-down-circle.svg 967 bytes [built]
| ./src/assets/images/undraw_throw_away.svg 8.67 KiB [built]
| + 11 hidden modules + 40 hidden modules

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
bundle.js (4.55 MiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
main (4.55 MiB)
bundle.js
