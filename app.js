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
  console.log("app is running");
  await dropItemsTable();
  await createItemsTable();
  await insertManyItems(items);
  await newItem({
    name: "Lip balm",
    category: "personal",
    price: 100,
    average_shelf_life: "13 months",
    expiration_date: "21220222",
  });
  await updateItem(12, {
    name: "Strawberry Lip balm",
    category: "personal",
    price: 200,
    average_shelf_life: "33 months",
    expiration_date: "2122-02-22",
  });
  await deleteItem(4);
  await getAllItems();
  await getItem(3);
  knex.destroy(() => {
    console.log("the connection is closed");
  });
};

const createItemsTable = async () => {
  try {
    await knex.schema.createTable("items", (table) => {
      table.increments("id").primary;
      table.text("name").notNullable();
      table.text("category");
      table.integer("price");
      table.text("average_shelf_life");
      table.date("expiration_date");
    });
    console.log("Table created");
  } catch (error) {
    console.log("There was an error", error);
  }
};

const dropItemsTable = async () => {
  return knex.schema.dropTable("items");
};

const getAllItems = async () => {
  const query = await knex.raw("SELECT * FROM items");
  console.log(query.rows);
  return query.rows;
};

const insertManyItems = async (manyItems) => {
  const insertedItems = await knex("items").insert(manyItems);
  return insertedItems;
};

const newItem = async (newItem) => {
  const query = await knex.raw(
    "INSERT INTO items (name, category, price, average_shelf_life, expiration_date) VALUES(:name, :category, :price, :average_shelf_life, :expiration_date) RETURNING *",
    newItem
  );
  return query.rows[0];
};

const getItemById = async (id) => {
  const query = await knex.raw("SELECT * FROM items WHERE id=?", [id]);
  console.log(`A reminder with an id of ${id}`, query.rows[0]);
  return query.rows[0];
};

const updateItem = async (id, item) => {
  const query = await knex.raw(
    "UPDATE items SET name=:name, category=:category, price=:price, average_shelf_life=:average_shelf_life, expiration_date=:expiration_date where id=:id RETURNING *",
    { id, ...item }
  );
  console.log(`Updated reminder with id of ${id}`, query.rows[0]);
  return query.rows[0];
};

const deleteItem = async (id) => {
  const query = await knex.raw("DELETE FROM items WHERE id = ? RETURNING *", [
    id,
  ]);
  console.log("This item was deleted", query.rows[0]);
  return query.rows[0];
};

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
