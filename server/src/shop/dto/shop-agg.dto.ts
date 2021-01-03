export class ShopAgg {
  minPrice: number;
  maxPrice: number;
  totalShop: number;

  static of(minPrice: number, maxPrice: number, totalShop: number) {
    const agg = new ShopAgg();
    agg.minPrice = minPrice;
    agg.maxPrice = maxPrice;
    agg.totalShop = totalShop;
    return agg;
  }
}
