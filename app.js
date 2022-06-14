// Select the correct environment that the app is running in
// By default, select "development"
const env = process.env.NODE_ENV || "development";
// Require the configuration set in the knexfile, access
// the correct configuration for the environment selected
const config = require("./knexfile")[env];

// Create a connection called knex
const knex = require("knex")(config);

const items = require("./models/items.model");

const run = async () => {
  // call your functions in here
};

const createItemsTable = async () => {};

const dropItemsTable = async () => {};

const getAllItems = async () => {};

const insertManyItems = async (manyItems) => {};

const newItem = async (newItem) => {};

const getItemById = async (id) => {};

const updateItem = async (id, item) => {};

const deleteItem = async (id) => {};

// keep the function invocation at the bottom of the file, below all other function expressions
if (env === "development") {
  run();
}

module.exports = {
  knex,
  createItemsTable,
  deleteItem,
  dropItemsTable,
  getAllItems,
  getItemById,
  insertManyItems,
  newItem,
  updateItem,
};
