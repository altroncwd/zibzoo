/* -------------------------------------------------------------
Temporary Vendor data for starting out our application
All vendor data will have the same basic format (for now, change as needed)
====== EXAMPLE OBJ ======
{
  fullName : "",  // Full name of place
  description : ,  // description for the restraunt
  cuisine : [], // the type of cuisine
  mainImg : "", // a vendor image
  menu : [  // array is propogated with only food objects
      { food : , // food item
        price : , // price
        description : , // any description they want to give the food
        prepTime : ,   // avarage time it takes to make in mins
      }
   ],
  recomendedItem : , //should only be able to refrence an item in their list
  schedule : {
    monday : {open: false, open: null, close: null},
    tuesday : {open: false, open: null, close: null},
    wednesday : {open: false, open: null, close: null},  // what days they are normaly scheduled to be open
    thursday : {open: false, open: null, close: null},   // open and close in military time
    friday : {open: false, open: null, close: null},
    saturday : {open: false, open: null, close: null},
    sunday : {open: false, open: null, close: null}
  },
  isOpen :  ,// should only be set to true when the vendor logs in (boolean val)
  foodQueue : [] , // list of orders as they come in
  currentLocation : // will need to list current geodata / zip ()
}


======= TEMP ORDER OBJ ======
Object orders should list the user information and what they ordered, picture if availible
{
  customer : ,  // name of the customer who ordered
  customerID : , // some kinda id so we know who to update later?
  customerImg : ,  // picture if availible
  food : [ ],  // list of items they ordered
  total : ,  // total cost
  estimatedTime : , // time in min
  requestedPickUpTime : , // time in military
}


------------------------------------------------------------- */

const elliotsBurgers = {
  fullName : "Elliots Burgers",
  description : "Only the best food, just dont ask how its made",
  cuisine : ["burgers", "fusion", "american""],
  mainImg : "http://www.fastfoodlondon.co.uk/wp-content/uploads/2013/07/643918_695650526470_1380903060_n.jpg",
  menu : [
    { food : "Fries",
      price : 4.50,
      description : "thin cut, homestyle fries",
      prepTime : 7  // in mins
    },
    {
      food : "Burger",
      price : 7.50 ,
      description : "1/2lb all beef patty with lettus, tomato, and onions" ,
      prepTime : 10
    }
   ],
  recomendedItem : menu[1], //should only be able to refrence an item in their list
  schedule : {
    monday : {open: false, open: null, close: null},
    tuesday : {open: true, open: 11, close: 15},
    wednesday : {open: true, open: 11, close: 15},
    thursday : {open: true, open: 11, close: 15},
    friday : {open: true, open: 11, close: 15},
    saturday : {open: false, open: null, close: null},
    sunday : {open: false, open: null, close: null}
  },
  isOpen : false, //should only be set to true when the vendor logs in
  foodQueue : [
    {
      customer : "Clark Williams",
      customerID : 4836759374,
      customerImg : null,
      food : [ "Burger", "Burger", "Fries"],
      total : 19.50,
      estimatedTime : 19,
      requestedPickUpTime : null,
    }
  ],
  currentLocation : null
},

const benjisStuffYourFace = {
  fullName : "Benji's Stuff Your Face",
  description : "Food from the place where everything wants to eat you, now you can eat it",
  cuisine : ['Australian'],
  mainImg : "http://ichef-1.bbci.co.uk/news/660/cpsprodpb/14545/production/_85696238_nativefoodonplategetty.jpg",
  menu : [
      { food : "Kangaroo Caraway Burger",
        price : 12,
        description : "Roo burgers for the BBQ or cooked inside in the frypan. Serve in Turkish bread rolls with lettuce and tomato or add any burger fillings that you like..",
        prepTime : 14,
      }
   ],
  recomendedItem : menu[0],
  schedule : {
    monday : {open: false, open: null, close: null},
    tuesday : {open: true, open: 10, close: 16},
    wednesday : {open: true, open: 10, close: 16},
    thursday : {open: true, open: 10, close: 16},
    friday : {open: true, open: 10, close: 16},
    saturday : {open: false, open: null, close: null},
    sunday : {open: false, open: null, close: null}
  },
  isOpen :  true,
  foodQueue : [
    {
      customer : "John Rice" ,
      customerID : 9385620475,
      customerImg : null,
      food : [ "Kangaroo Caraway Burger"],
      total : 12,
      estimatedTime : 14,
      requestedPickUpTime : null,
    },
    {
      customer : "Jill Faith" ,
      customerID : 7593740285,
      customerImg : "https://pbs.twimg.com/profile_images/502176585038823424/PQREJrKH.jpeg",
      food : [ ],
      total : ,
      estimatedTime : ,
      requestedPickUpTime : ,
    }
  ] ,
  currentLocation : null;
},

const tomsKillerPizza = {
  fullName : "Toms Killer Pizza",
  description : "The best pizza around, so good it might kill you",
  cuisine : ['pizza', 'italian', 'american'],
  mainImg : "http://www.toms-pizza.com/images/Front_Page_Pizza_Cropped.jpg",
  menu : [
      { food : "cheese",
        price : 14.50,
        description : "three cheese pizza with a garlic stuffed crust",
        prepTime : 20 ,
      },
      { food : "volcano",
        price : 14.50,
        description : "three cheese topped with jalapenos, red pepers, spicy italian sausage and a stuffed jalapeno creamcheese crust ",
        prepTime : 22 ,
      },
      { food : "garlic breadsticks",
        price : 7.0,
        description : "soft homemade breadsticks brushed with butter and our special mix of garlic and spices",
        prepTime : 15 ,
      }
   ],
  recomendedItem : menu[1],
  schedule : {
    monday : {open: false, open: null, close: null},
    tuesday : {open: true, open: 12, close: 21},
    wednesday : {open: true, open: 12, close: 21},
    thursday : {open: true, open: 12, close: 21},
    friday : {open: true, open: 12, close: 21},
    saturday : {open: true, open: 12, close: 21},
    sunday : {open: false, open: null, close: null}
  },
  isOpen : true ,
  foodQueue : [] ,
  currentLocation : null,
}

export default = {
  elliotsBurgers,
  benjisStuffYourFace,
  tomsKillerPizza
}










/* ======= BLANK TEMPLATE: No comments =======
  ------------ VENDOR OBJ -------------
{
  fullName : "",
  description : ,
  cuisine : [],
  mainImg : "",
  menu : [
      { food : ,
        price : ,
        description : ,
        prepTime : ,
      }
   ],
  recomendedItem : ,
  schedule : {
    monday : {open: false, open: null, close: null},
    tuesday : {open: false, open: null, close: null},
    wednesday : {open: false, open: null, close: null},
    thursday : {open: false, open: null, close: null},
    friday : {open: false, open: null, close: null},
    saturday : {open: false, open: null, close: null},
    sunday : {open: false, open: null, close: null}
  },
  isOpen :  ,
  foodQueue : [] ,
  currentLocation : null
}


------------ VENDOR ORDER OBJ -------------
{
  customer : ,
  customerID : ,
  customerImg : ,
  food : [ ],
  total : ,
  estimatedTime : ,
  requestedPickUpTime : ,
}

/*
