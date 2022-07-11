## Cafe App
---


| Method   |      Endpoint      |  Description                      |
|:--------:|--------------------|-----------------------------------|
| [GET]    | /                  | Show link to /categories & /menus |
| [GET]    | /categories        | Display all categories            |
| [GET]    | /menus             | Display all menus, searchable, sortable, link to /menus/add, /menus/edit/:id, / menus/delete/:id      | 
| [GET]    | /menus/:id         | Display single menus based on id  |
| [GET]    | /menus/add         | Show form add menu                |
| [POST]   | /menus/add         | Save new menu                     |
| [GET]    | /menus/delete/:id  | Delete menu based on id           |
| [GET]    | /menus/edit/:id    | Show edit menu form based on id   |
| [POST]   | /menus/edit/:id    | Update menu based on id           |