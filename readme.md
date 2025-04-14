# Family Wisdom

Welcome to **Family Wisdom**, a collaborative platform for sharing helpful tips, cherished recipes, home improvements, travel stories, and life lessons across generations. This project integrates Express, MongoDB, and Mongoose on the server side, utilizing EJS for dynamic rendering.

---

## Overview

This project highlights the following technologies:
- **Express Routing & Middleware:** Efficiently organizes routes and manages errors.
- **MongoDB & Mongoose Integration:** Facilitates storing and retrieving tips and family member information.
- **EJS Templating:** Provides consistent server-rendered views using Express EJS layouts.
- **Rich Text Editing:** Utilizes Quill for formatting content.
- **REST API Support:** Fully supports JSON-based create, read, update, and delete operations for both tips and family members.
- **Service Layer Architecture:** Database operations are abstracted into reusable services for better separation of concerns.
- **Cross-Origin Support:** CORS headers are properly configured to handle client-side and external API requests.
- **Innovative Print Functionality:** Delivers a smooth print experience using Blob and object URLs without deprecated methods.

---

## API Testing

You can test the REST API using either of the following options:

### Option 1: Local Testing (via test file)

- `test/testApi-local.js` tests endpoints using `http://localhost:4000`.

### Option 2: Deployed Testing (DigitalOcean)

- `test/testApi-prod.js` tests the live app using your deployed IP, like `http://68.183.54.98:4000`.

Run either file in your browser console or terminal to test if the endpoints return expected data.

---

### Option 3: Postman

You can also test the REST API manually using Postman:

#### Tips

| Method | Endpoint                  | Notes                                                                 |
|--------|---------------------------|-----------------------------------------------------------------------|
| GET    | `/api/tips`               | Retrieve all tips                                                    |
| POST   | `/api/tips`               | JSON body: `{ "title": "...", "category": "...", "content": "..." }` |
| PUT    | `/api/tips/:id`           | Replace `:id` with a real MongoDB `_id` of a tip                      |
| DELETE | `/api/tips/:id`           | Same as above                                                        |

#### Family Members

| Method | Endpoint                    | Notes                                                                     |
|--------|-----------------------------|---------------------------------------------------------------------------|
| GET    | `/api/family`               | Retrieve all family members                                               |
| POST   | `/api/family`               | JSON body: `{ "name": "...", "birthYear": 1980, "notes": "..." }`         |
| PUT    | `/api/family/:id`           | Replace `:id` with a real MongoDB `_id` of a member                       |
| DELETE | `/api/family/:id`           | Same as above                                                             |

> Tip: Use a `GET` request to retrieve IDs first, then use that `_id` in your `PUT` or `DELETE` requests.  
>
> And if you're sending JSON data (like for POST or PUT), make sure Postman's Body tab is set to **raw** and **JSON**. You probably already know that, but I wanted to be complete!
---

## Debugging & Implementation Notes

- **EJS Comments:**  
  Helpful internal notes using `<% /* */ %>` throughout templates.

- **Quill Rich Text Editor:**  
  Configured to work with a hidden input for submitting HTML content cleanly.

- **Print Functionality:**  
  Creates a dynamic print-friendly window using DOM cloning and blob-generated HTML.

- **Error Logging:**  
  Console logging is in place for both server errors and database issues.

- **Quill Source Map Fixes:**  
  I originally included `quill.js` and `quill.snow.css` in the project, but noticed 404 console errors for missing source map files. After downloading the correct `.map` files from the Quill GitHub repo, I realized they were named for the minified versions (`quill.min.js.map` and `quill.snow.min.css.map`). To fix the mismatch, I renamed my original `.js` and `.css` files to include `.min`, updated the `<link>` and `<script>` tags in `layout.ejs`, and also edited the final line in each `.min.js` and `.min.css` file to point to the correct `.map` filename. That resolved the 404 errors and properly loaded source maps in DevTools.

- **JSDoc Comments:**  
  I’ve been learning about docstrings in another class and realized I could use them in my `.js` files too. I added them to this project where it made sense. I’m still new to it aside from that class, so feel free to offer any feedback on how I’ve used them here.
  
---

## Future Enhancements

- **Interactive Family Tree:**  
  Replace list view with an interactive visual map of family members.

- **Authentication:**  
  Add user login and roles to protect actions like editing or deleting.

- **Form Validation & UX:**  
  Add better front-end validation and confirmation messages.

- **REST API Expansion:**  
  Improve response consistency and possibly version API endpoints.

---

## Summary

Building Family Wisdom has been incredibly rewarding. Watching each tip, recipe, and home fix show up in MongoDB Atlas in real-time made the app feel alive. 

While I’ve used APIs in past projects (like a weather app), this was the first time it really *clicked* with me.  It made me see how powerful and flexible APIs are, not just for connecting to someone else’s service, but for making *my own* data available in the same way. That was AWESOME and really empowering!!

---

## Acknowledgements

Special thanks to **Ping Pong AI** for guidance and brainstorming. This project wouldn't have been nearly as fun to build without that help!


