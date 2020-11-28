-   [x] Firebase and Auth Context integration w/ Github
-   [x] Protected Routing
-   [x] Fetch data from Github using access token
    -   store fetched data in local storage
-   [x] Selectable, filterable data table
    -   filter by selected only
    -   clickable/sortable headers
-   [] Store Context for passing data for "Review" stage.
-   [] Review Page
-   [] Delete Page

# USER FLOW

1. User is authorized by Github OAuth
2. User is routed to dashboard.
3. User is shown table of repos with relevant information (i.e. repo creation date, last commit, number of collaborators, etc.)
4. User can select a number of repos.
5. Delete button is enabled.
6. Compiled repos is shown (List Preview?) before deletion.
7. Confirm modal.
8. Delete.
9. Additional Instruction Page after deletion to delete more or delete account.

# TODOS

-   TODO Hooks Refactor
-   TODO Github Authorization Permissions and Store in Context API
-   TODO Implement Material-UI
-   TODO Clean up for unused components.

-   TODO Views
    ** TODO SignIn Page
    ** TODO Dashboard Page
    ** TODO List of Repos Page
    ** TODO Confirmation Modal

-   DONE Infra (CRA)
-   DONE Authentication Infra

# RELEASE NOTES

## Feature:

-   FEATURE

## Changes:

-   BUG
