# zibzoo

[![Build Status](https://travis-ci.org/unforgitables/zibzoo.svg?branch=master)](https://travis-ci.org/unforgitables/zibzoo)

A food truck ordering web application and anyalics platform for vendors.

# installation
Getting started is simple, run
```
 NPM install
 NPM start
```
Once you have finished that you will to obtain your won api keys.

# Choice of Technologies
- Angular
- Express
- MongoDB
- Karma
- Jasmine
- Stripe
- Gulp
- SASS
- Socket.io

# File Structure
Files are separated into three main sections.

Client : holds all files associated with with the View, Controllers, and Factories.  The client file also contains the styling and SASS files.

Server : continas the server, middleware, express routing, sockets, nodemailer and helper functions.

Spec : contains all Jasmine / Karma tests which are split up into a client and server spec folder.
```
ZibZoo
  |-client
  |---app             # Views / Controllers / Factories
  |---assets          # SASS files
  |---build           # SASS files
  |-server
  |---config          # Middleware
  |---db
  |---mailer          # NodeMailer files
  |---routes
  |---sockets         # Socket.io files
  |---utils
  |-spec              # Jasmine / Karma testing files

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
- Anyalitic data and display page
- Filter by cuisine types
- Allow vendors to select multiple cuisine types
- Implement auto picture cropping
- User favorites
- Sorting orders based on geolocation
- Ordering food for pickup at a specific time

# Tests
Testing done in Jasmine/Karma.  Coverage [ 80% ]

Testing includes both backend and front end coverage
```
  NPM run test:client
  NPM run test:server
```

# Style Guide
All files are writen using a modified styleguide from Airb&b.
run the linting file to fix minor mistakes, see the contributing guide for more details
```
  NPM run lint:fix
```

# Licence
  ZibZoo is a project made with help and copoeration from MakerSquare [ http://www.makersquare.com/ ]
  The project is open source but full credit must be given to any and all projects forked from this repo

# Contributors
- Ahmed Modan [ https://github.com/ahmedmodan ]
- Benjiamin Marinacci [ https://github.com/bcmarinacci ]
- Christopher Decker [ https://github.com/altroncwd ]
- Ian B. [ https://github.com/ibari ]
- Tom Bergen [ https://github.com/tbergen1 ]


