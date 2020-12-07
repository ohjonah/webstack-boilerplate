# Things I've learned:
- Libraries: React, TailwindCSS, Firebase Auth
- React: Hooks / Reducers / Context
- Deploying through Netlify
- Minimal Webpack with SVG support
- Consuming data from an api
- Protected Routes using `react-router-dom`
- Implementing a table with sorting capabilities for data
- Handling async/await in a reducer.

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
