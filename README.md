# Zibzoo

[![Build Status](https://travis-ci.org/unforgitables/zibzoo.svg?branch=master)](https://travis-ci.org/unforgitables/zibzoo)

A food truck ordering web application that helps you avoid the lines, and connects vendors to its users in real time.

For more information check out [Our_Story.md](Our_Story.md)

# installation
Getting started is simple, run
```
 npm install
 npm start
```
Once you have finished that you will to obtain your won api keys.

# Choice of Technologies
- Angular
- Express
- MongoDB
- Karma
- Should.Js
- Stripe
- Gulp
- SASS
- Socket.io

# File Structure
Files are separated into three main sections.

Client : holds all files associated with with the View, Controllers, and Factories.  The client file also contains the styling and SASS files.

Server : continas the server, middleware, express routing, sockets, nodemailer and helper functions.

Spec : contains all Should.Js / Karma tests which are split up into a client and server spec folder.
```
Zibzoo
  |-client
  |---app             # Views / Controllers / Factories
  |---assets          # SASS files
  |---build           # SASS files
  |-server            # NodeMailer / Socket.io files
  |---config          # Middleware
  |---db
  |---routes
  |---utils
  |-spec              # Should.js / Karma testing files

```
# Features
Users :
- Create a account
- Displays food trucks in your area
- Place orders from multiple food trucks
- Checkout orders and pay via Stripe
- Email notification when your order is ready

Vendors :
- Create a vendor account
- Automaticaly accept payments for online orders
- Vendor order display que with live updates
- Create a profile and easily update menu
- Update all your customers with instock menu items

# Future Features
- Analytic data and display page for vendors
- Allow vendors to select multiple cuisine types
- Implement auto-cropping for uploaded images
- Allow users to save favorite food trucks to their profile
- Sorting orders based on geolocation
- Ordering food for pickup at a specific time

# Tests
Testing done in Should.js/Karma.  Coverage [ 80% ]

Testing includes both backend and front end coverage
```
  npm run test:client
  npm run test:server
```

# Style Guide
All files are writen using a modified styleguide from Airb&b.
Run the linting file to fix minor mistakes, see the contributing guide for more details
```
  npm run lint:fix
```

# License
  Zibzoo is a project made with help and cooperation from MakerSquare [ http://www.makersquare.com/ ]
  The project is open source but full credit must be given by any and all projects forked from this repo

# Contributors
- Ahmed Modan [ https://github.com/ahmedmodan ]
- Benjiamin Marinacci [ https://github.com/bcmarinacci ]
- Christopher Decker [ https://github.com/altroncwd ]
- Ian B. [ https://github.com/ibari ]
- Thomas Bergen [ https://github.com/tbergen1 ]


