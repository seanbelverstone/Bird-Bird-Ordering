# Bird-Bird-Ordering
This is a repository for creating an online multiple biscuit ordering system for Bird Bird Biscuit in Austin, Texas.

# Psuedocode & Description
Customer View:
	- Form containing the following:
		- Quantity
		- Price
		- Total
		- Tip (box selection?)
			- custom amount, radial choice between percentage or dollars for the input box
		- Collection date - opens a calendar (NOTE: Customer can only select M-F between 7 - 2)
		- Special instructions text box
		- Subtotal
		- Next button
	
	- This form will require saving the data and only transmitting it once the payment is made. Possibly use Swipe as the library for payments. Save the data to local storage then clear it if a successful return?

	- Payment made in a modal.

	- Once the order is placed, a confirmation box modal replaces the payment one, thanking the customer and using their username variable and 'see you on {dateSelected}'. 

	- Form clears when all is complete

Employee View:
	- Button main page, opens login page

	- Spot to enter email and password. Accounts will be made by developer ONLY

	- Calendar view:
		- defaults to current month
		- current day is highlighted in some way
		- employee can scroll through months like other online calendars
		- orders scheduled will appear on the calendar
		- orders complete will also be displayed
		
	- Once employee has clicked on a date, modal pops up. Shows the current date in long-hand and all current orders for that date.
	- Customer's name, quantity of biscuits and collection time show.
	- 'Complete' button is below order - allows employee to flag as completed. Warning box appears before finishing completion. Maybe insert a 'reopen' button just in case of user error?
	- Order then changes color/minimises when completed
	- Main calendar reflects these changes.

# Technologies
* React
* Redux
* Moment
* React Calendar?

# To Do
Need to create models for the following:
	- User
	- Order
	- Admin?

User will have many orders
Many orders will have one user
Admin is able to access all orders.