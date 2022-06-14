# Intro to Knex & CRUD with Knex Lab

## Knexpirations

You are going to build a small application that will allow you to keep track of items that have expiration dates.

## Getting started

1. Fork and clone this repository.

1. Navigate to the cloned repository's directory on your command line. Then, run the following command:

```
npm install
```

This will install the libraries needed to run the tests.

1. Run the following two commands to create two local databases.

```bash
createdb intro_to_knex_dev
createdb intro_to_knex_test
```

1. Create a `.env` file. The contents will be the same as the `.env.template` file inside this repository.

1. Open up the repository in your code editor. Follow the instructions below to complete the lab.

1. Use `npm run test` to run the tests.

## Instructions

To complete this lab, you will need to complete the following steps. Read each one carefully to ensure you can get the tests to pass.

All your work should be in `app.js`

### Set up connection

Set up a connection with Knex that defaults to development and allows the test development configuration.

### Create a table

Inside the `createItemsTable` function:

- Create a table `items` with a schema of
- `id` - primary key
- `name` - string
- `category` - string
- `price` - number
- `average_shelf_life` - string
- `expiration_date` - date
- Insert at least 2 items. For the date use the pattern `20220222`, where the first 4 numbers are the year, the next two are the month, and the final 2 are the day. You can check the `models` folder for an example as well.

### Drop a table

Inside the `dropItemsTable` function:

Write the functionality to drop the `items` table.

## Insert several items at once

Inside the `insertManyItems` function:

Use the `items` array of objects that has been imported into the `app.js` file to insert many `items` into the table.

### Insert one item

Inside the `newItem` function:

Create the functionality to insert a new item.

Here is an example new item:

```js
{
 name: "Lip balm",
 category: "personal",
 price: 100,
 average_shelf_life: "13 months",
 expiration_date: "21220222",
 }
```

## Get all items

Inside the `getAllItems` function:

Create the functionality to get all items. Be sure to return the values.

### Get one item by id

Inside the `getItemBy Id` function:

Create the functionality to get one item by its id. Be sure to return the values.

### Update an item

Inside the `updateItem` function:

Create the functionality to update one item. Select the item to be updated by id. Be sure to return the updated item.

```js
{
 name: "Strawberry Lip balm",
 category: "personal",
 price: 200,
 average_shelf_life: "33 months",
 expiration_date: "2122-02-22",
 }
```

### Delete an item

Inside the `deleteItem` function:

Create the functionality to delete one item. Select the item to be updated by id. Be sure to return the deleted item.

### Bonus:

#### Write some error handling:

- When getting one item, return a `not found` if no item is found with the id provided
- When updating one item, don't allow an update to happen if a key is missing in the update object

#### Write some extra queries:

- Write a function that lets a user see a list of items by category

- Write a function that lets a user see a list of items that are all either expired or not expired

- Write a function that lets users select the category and whether or not the items have expired

- Write a function that takes the cost of all the expired items and gives the total amount of money lost

- Write a function that takes the cost of all the expired items and gives the average amount of money lost

- Write a function that breaks down the cost of items by category

- Write a function that calculates the average number of days for items to expire by category

#### Create a very simple user interface

Add console logs that are human-readable. For example, in `getItemById`, have the function console log something along the lines of:

```
The Band-aids have an average shelf life of 5 years. Your Band-aids are set to expire on February 2, 2022. Your Band-aids have already expired! Please replace this item promptly.
```

```
The sunscreen has an average shelf life of 1 year. Your sunscreen is set to expire on February 2, 2122. You have 99 years, 8 months, and 3 days to replace them! Please be sure to use up your supply before it expires.
```

Try to include this kind of logic:

- Convert the numeric date into a human-readable date.
- Give a specific message if the item has expired already
- Give the remaining time to replace an item that is not expired based on the current date.

#### Super bonus

Build an express app that incorporates the database queries following RESTful routes.
