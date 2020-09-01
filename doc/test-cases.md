### Unauthorised users cannot access the site

1. URL Access

   1. Navigate to the homepage ( company-directory.tampham.co.uk/results )
   1. Confirm you are redirected to the homepage

1. Bad username and password

   1. Navigate to the homepage ( company-directory.tampham.co.uk/login )
   1. Enter user name `foo` into the username box
   1. Enter the password `bar` into the password box
   1. Click `Sign In`
   1. Confirm you are on the /login page
   1. Confirm you can see a message informing you that you username or password was wrong

1. Bad password

   1. Navigate to the homepage ( company-directory.tampham.co.uk/login )
   1. Enter user name `hello` into the username box
   1. Enter the password `bar` into the password box
   1. Click `Sign In`
   1. Confirm you are on the /login page
   1. Confirm you can see a message informing you that you username or password was wrong

### Test User Can `Login/ Logout`

1. Login

   1. Navigate to the homepage ( company-directory.tampham.co.uk/login )
   1. Enter user name `hello` into the username box
   1. Enter the password `hello` into the password box
   1. Click `Sign In`
   1. Confirm you are on the /results page

1. Logout

   1. Login to the site (see Login)
   1. Click the log out button located on the top left of the screen
   1. Click `Log out` in the modal that appears
   1. Confirm you are on the homepage

### Test if users can `Find Employee` 

1. Search by department

   1. Login to the site (see Login)
   1. Click `Find Employee`
   1. Choose Human resources in the department field
   1. Click `Find`
   1. You should see only the emloyees from Human Resources department in the result grid

1. Search by job title

   1. Login to the site (see Login)
   1. Click `Find Employee`
   1. Choose `COO` in the job title field
   1. Click `Find`
   1. Confirm you can see one result (Taylor St. Quintin)

1. Search by first name

   1. Login to the site (see Login)
   1. Click `Find Employee`
   1. Type `Vern` in the first name field
   1. Click `Find`
   1. Confirm you can see one result (Vern Durling)

1. Case insensitive search by first name

   1. Login to the site (see Login)
   1. Click `Find Employee`
   1. Type `VERN` in the first name field
   1. Click `Find`
   1. Confirm you can see one result (Vern Durling)

1. Search by last name

   1. Login to the site (see Login)
   1. Click `Find Employee`
   1. Type `Edgson` in the last name field
   1. Click `Find`
   1. Confirm you can see one result (Aveline Edgson)

1. Case insensitive search by last name

   1. Login to the site (see Login)
   1. Click `Find Employee`
   1. Type `edgson` in the last name field
   1. Click `Find`
   1. Confirm you can see one result (Aveline Edgson)

1. Search by email

   1. Login to the site (see Login)
   1. Click `Find Employee`
   1. Type `rheffron0@ibm.com` in the email field
   1. Click `Find`
   1. Confirm you can see one result (Rosana Heffron)
 

1. Case insensitive search by email

   1. Login to the site (see Login)
   1. Click `Find Employee`
   1. Type `rHeFfRoN0@IBM.com` in the email field
   1. Click `Find`
   1. Confirm you can see one result (Rosana Heffronn)

1. Test User can close the search form 
   1. Login to the site (see Login)
   1. Click `Find Employee`
   1. Click `X` on the right hand side of the Search form
   1. Confirm that the Search form is close

1. Test user can clear a search 
   1. Login to the site (see Login)
   1. Click `Find Employee`
   1. Type `rHeFfRoN0@IBM.com` in the email field
   1. Click `Find`
   1. Confirm you can see one result (Rosana Heffronn)
   1. Click `Clear Search` button on navbar. next to the `Find Employee` button
   1. confirm the Search form is clear and the result page is back will all of the employee cards


### Test if users can `Add Employee`

1. User can add an employee 
   1. Login to the site (see Login)
   1. Click `Add Employee`
   1. Choose Department / Job title
   1. Enter `Anne`in the `Enter Firstname` box
   1. Enter `Asprey`in the `Enter Lastname` box
   1. Type `anne@yahoo.com` in the `Enter Email` box
   1. Click `Add`
   1. Confirm you can see Anne Asprey in the result page 

1. New employees can be found by search 
   1. Login to the site (see Login)
   1. Click `Find Employee`
   1. Choose Department / Job title
   1. Enter `Anne`in the `Enter Firstname` box
   1. Enter `Asprey`in the `Enter Lastname` box
   1. Type `anne@yahoo.com` in the `Enter Email` box
   1. Click `Find`
   1. Confirm you can see Anne Asprey in the result page 

1. Add Employee form can be closed 
   1. Login to the site (see Login)
   1. Click `Add Employee`
   1. Choose Department / Job title
   1. Click `X` to close form
   1. Confirm the form is closed and you are back to result page

###  Test if users can `Edit` Employee

1. Test employees can be edited 
   1. Carry on from previous test (`Add Employee` cases)
   1. Click `Edit` button on `Anne Asprey` employee card
   1. Choose Department / Job title
   1. Change the previous email to calm@yahoo.com
   1. Click on`Edit`
   1. Confirm `Anne Asprey`'s email has been changed to `calm@yahoo.com`

1. Test edit form can be closed 
   1. Carry on from previous test (`Test employees can be edited`)
   1. Click `Edit` button on `Anne Asprey` employee card
   1. Choose Department / Job title
   1. Click on`X`
   1. Confirm the form is closed and you are back to result page

###  Test if users can `Delete` Employee

1. Test employees can be deleted 
   1. Carry on from previous test (`Test edit form can be closed`)
   1. Click `Delete` button on `Anne Asprey` employee card
   1. Confirm you see the `Delete Confirmation` form
   1. Click on `Delete` button 
   1. Confirm the`Delete Cofirmation` form is closed, you are back to result page and `Anne Asprey` employee card is deleted .

1. Test cancelling delete does not delete employee 
   1. Carry on from previous test(`Test employees can be deleted`)
   1. Click `Delete` button on any employee card
   1. Confirm you see the `Delete Confirmation` form
   1. Click on `X` button or `Cancel` button
   1. Confirm the`Delete Cofirmation form `is closed, you are back to result page and the employee card is still exist