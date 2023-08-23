const {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  it("Quality should increase by 3 when 5 days or less left (Backstage passes)", () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)];
    const gildedRose = new Shop(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(23); // 20 + 3
  });

  it("Quality of Sulfuras should not change", () => {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
    const gildedRose = new Shop(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(80);
  });

  it("Quality of Aged Brie should increase with age", () => {
    const items = [new Item("Aged Brie", 2, 0)];
    const gildedRose = new Shop(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(1);
  });

  it("Quality of ordinary items should decrease by 1 normally", () => {
    const items = [new Item("Ordinary Item", 5, 10)];
    const gildedRose = new Shop(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(9);
  });

  it("Quality of ordinary items should decrease by 2 after expiration", () => {
    const items = [new Item("Ordinary Item", 0, 10)];
    const gildedRose = new Shop(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(8);
  });

  it("Quality of Backstage passes should drop to 0 after concert", () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)];
    const gildedRose = new Shop(items);
  
    const updatedItems = gildedRose.updateQuality();
  
    expect(updatedItems[0].quality).toBe(0);
  });  

  it("Quality of items should not become negative (except Sulfuras)", () => {
    const items = [new Item("Ordinary Item", 5, 0)];
    const gildedRose = new Shop(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(0);
  });

  it("Quality of items should not exceed 50 (except Sulfuras and Backstage passes)", () => {
    const items = [new Item("Elixir of the Mongoose", 5, 50)];
    const gildedRose = new Shop(items);
  
    const updatedItems = gildedRose.updateQuality();
  
    expect(updatedItems[0].quality).toBe(49);
  });

  it("Quality degrades twice as fast after sellIn date passes", () => {
    const items = [new Item("Ordinary Item", -1, 10)];
    const gildedRose = new Shop(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(8);
  });

  it("Quality of an item is never negative", () => {
    const items = [new Item("Ordinary Item", 5, 0)];
    const gildedRose = new Shop(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(0);
  });

  it("Aged Brie increases in quality over time, but drops to 0 after the concert", () => {
    const items = [new Item("Aged Brie", 0, 10)];
    const gildedRose = new Shop(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(12);
  });

  it("Quality of an item is never more than 50", () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50)];
    const gildedRose = new Shop(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(50);
  });

  it("Sulfuras never decreases in quality", () => {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 5, 80)];
    const gildedRose = new Shop(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(80);
  });

  it("Backstage passes increase in quality as concert approaches and drop to 0 after the concert", () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30)];
    const gildedRose = new Shop(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(0);
  });
});
