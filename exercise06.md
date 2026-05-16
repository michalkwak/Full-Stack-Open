# Exercise 0.6

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: note sent as JSON data
    server-->>browser: browser: 201 Created
    deactivate server
    Note right of browser: JavaScript updates notes without reloading page
```
