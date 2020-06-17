# Bird-Bird-Ordering

## Overview
This application was built for customers at Bird Bird Biscuit to place orders for multiple biscuits in dozens, in an easy to use ordering form. Designed using Adobe XD, created using React.js in the front end and Express.js in the back end, the aim was to make the ordering form as accessible as possible while still retaining the same design cues as featured on their own website. 
The ordering form contains two pages. 
* The first page is the customer facing page, where they are able to select their desired quantity of biscuits, any extras and a tip, then checkout safely and securely with a payment modal which utilises Stripe.js. I decided on Stripe.js as it is a well renowned payment service and has features many different ways of making payments. The customer's order is then stored in a MySQL database and they recieve a confirmation email. 
* The second page is a well hidden employee view, where the employee is able to see all orders that have been placed, view monthly, weekly and daily totals, and also mark orders as complete. 

#### Customer View
![Customer View](./client/src/images/customerView.png)

#### Employee View
![Employee View](./client/src/images/employeeView.png)

### User Interaction Logic
1. Select quantity, add gravy or jam, then the user has the option to add a tip. If they'd like to choose a custom tip, they can click the button and a hidden text box appears, which contains validation to make sure only the correct input is recieved.

![Step 1](./client/src/images/stepOne.png)

2. The user is then able to select a pick-up date and time of their choosing. The available dates are automatically scheduled for 2 days in advance, to enable the shop to make sure they have stock for orders placed. The user is also only permitted to enter a time within the range of Bird Bird Biscuit's opening hours (8am - 2pm). 

![Step 2](./client/src/images/stepTwo.png)

3. After selecting a time, there is a text box for any special instructions the user may need to enter. Below this, their total costs are laid out in an easy to read format, showing the subtotal, tax and final total. 

![Step 3](./client/src/images/stepThree.png)

4. Once their selection is complete and the continue button has been clicked, a payment modal appears. This is where the user can enter their information to process the order. Their card details are entered in just below this. I made sure to disable the option to click away from the modal, as this is often done by accident and would require the user to enter in all of their details again. There is a close button at the top right just in case they need to edit their order or go back for any reason.

![Step 4](./client/src/images/stepFour.png)

5. Finally, once all of the user's details have been entered and there aren't any issues with their card, the order is placed and a notice pops up informing them that their order has been successful and an email will be on its way to their inbox shortly. If there are any problems with the card, a similar notice displays telling them of an issue.

![Step 5](./client/src/images/stepFive.png)

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
