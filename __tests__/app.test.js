const items = require("../models/items.model.js");

const testItems = [
  {
    name: "WD-40",
    category: "household",
    price: 700,
    average_shelf_life: "70 years",
    expiration_date: "20220222",
  },
  {
    name: "Ice cream",
    category: "food",
    price: 900,
    average_shelf_life: "6 months",
    expiration_date: "21220222",
  },
  {
    name: "Hand cream",
    category: "personal",
    price: 800,
    average_shelf_life: "11 months",
    expiration_date: "21220222",
  },
];
const {
  knex,
  createItemsTable,
  dropItemsTable,
  getAllItems,
  getItemById,
  insertManyItems,
  newItem,
  updateItem,
  deleteItem,
} = require("../app.js");

describe("Items", () => {
  beforeAll(async () => {
    const tableExists = await knex.schema.hasTable("items");
    if (tableExists) {
      await dropItemsTable();
    }
    await createItemsTable();
  });

  afterAll(() => knex.destroy());

  describe("Table", () => {
    it("should exist", async () => {
      await knex.schema.hasTable("items");
    });

    it("should have an `id` column that is an INTEGER field and auto increments", async () => {
      const columns = await knex.table("items").columnInfo();
      expect(columns.id).toBeTruthy();
      expect(columns.id.type).toEqual("integer");
      expect(columns.id.defaultValue).toEqual(expect.stringMatching(/nextval/));
    });

    it("should have a `name` column that is a TEXT field and cannot be nullable", async () => {
      const columns = await knex.table("items").columnInfo();
      expect(columns.name).toBeTruthy();
      expect(columns.name.type).toEqual("text");
      expect(columns.name.nullable).toBeFalsy();
    });

    it("should have a `category` column that is a TEXT field", async () => {
      const columns = await knex.table("items").columnInfo();
      expect(columns.category).toBeTruthy();
      expect(columns.category.type).toEqual("text");
      expect(columns.category.nullable).toBeTruthy();
    });

    it("should have a `price` column that is an INTEGER field", async () => {
      const columns = await knex.table("items").columnInfo();
      expect(columns.price).toBeTruthy();
      expect(columns.price.type).toEqual("integer");
      expect(columns.price.nullable).toBeTruthy();
    });

    it("should have a `average_shelf_life` column that is a TEXT field", async () => {
      const columns = await knex.table("items").columnInfo();
      expect(columns.average_shelf_life).toBeTruthy();
      expect(columns.average_shelf_life.type).toEqual("text");
      expect(columns.average_shelf_life.nullable).toBeTruthy();
    });

    it("should have a `expiration_date` column that is a DATE field", async () => {
      const columns = await knex.table("items").columnInfo();
      expect(columns.expiration_date).toBeTruthy();
      expect(columns.expiration_date.type).toEqual("date");
      expect(columns.expiration_date.nullable).toBeTruthy();
    });
  });

  describe("Create", () => {
    it("should be able to create items", async () => {
      const items = await insertManyItems(testItems);
      expect(items.rowCount).toBe(3);
    });

    it("should be able to create one item", async () => {
      const item = await newItem({
        name: "Hydrogen Peroxide",
        category: "first-aid",
        price: 100,
        average_shelf_life: "12 months",
        expiration_date: "20220222",
      });
      expect(item).toEqual(
        expect.objectContaining({ name: "Hydrogen Peroxide" })
      );
    });
  });

  describe("Read", () => {
    it("should be able to get all items", async () => {
      const allItems = await getAllItems();
      expect(allItems).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: "Hand cream", category: "personal" }),
          expect.objectContaining({ name: "Ice cream", price: 900 }),
          expect.objectContaining({
            name: "WD-40",
            average_shelf_life: "70 years",
          }),
        ])
      );
    });

    it("should be able to get one item", async () => {
      const item = await getItemById(2);
      expect(item).toEqual(
        expect.objectContaining({ id: 2, name: "Ice cream" })
      );
    });
  });

  describe("Update", () => {
    it("should be able to update an item", async () => {
      const updatedItem = await updateItem(3, {
        name: "Hand cream",
        category: "personal",
        price: 8000,
        average_shelf_life: "1 months",
        expiration_date: "21220222",
      });
      expect(updatedItem).toEqual(
        expect.objectContaining({
          name: "Hand cream",
          category: "personal",
          price: 8000,
          average_shelf_life: "1 months",
        })
      );
    });
  });

  describe("Delete", () => {
    it("should be able to delete an item", async () => {
      const deletedItem = await deleteItem(3);
      expect(deletedItem).toEqual(
        expect.objectContaining({
          name: "Hand cream",
          category: "personal",
          price: 8000,
          average_shelf_life: "1 months",
        })
      );
    });
  });

  describe("Drop Table", () => {
    it("should be able to drop items table", async () => {
      await dropItemsTable();
      const tableExists = await knex.schema.hasTable("items");
      expect(tableExists).toBeFalsy;
    });
  });
});
