# Bird-Bird-Ordering

## Overview
This application was built for customers at Bird Bird Biscuit to place orders for multiple biscuits in dozens, in an easy to use ordering form. Designed using Adobe XD, created using React.js in the front end and Express.js in the back end, the aim was to make the ordering form as accessible as possible while still retaining the same design cues as featured on their own website. 
The ordering form contains two pages. 
* The first page is the customer facing page, where they are able to select their desired quantity of biscuits, any extras and a tip, then checkout safely and securely with a payment modal which utilises Stripe.js. I decided on Stripe.js as it is a well renowned payment service and has features many different ways of making payments. The customer's order is then stored in a MySQL database and they recieve a confirmation email. 
* The second page is a well hidden employee view, where the employee is able to see all orders that have been placed, view monthly, weekly and daily totals, and also mark orders as complete. 

![Customer View]()

![Employee View]()

# Technologies
* React
* Express
* MySQL
* Sequelize
* Date/fns
* React-big-calendar
* React-date-picker
* Stripejs
* Emailjs
