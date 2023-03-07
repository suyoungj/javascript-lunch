import { sampleRestaurants } from './sampleRestaurants';

import { getLocalStorage } from '../utils/localStorage';

type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type Distance = 5 | 10 | 15 | 20 | 30;

interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

interface RestaurantManager {
  list: Restaurant[];
  init(): void;
  add(restaurant: Restaurant): void;
  filterByCategory(category: Category | '전체', restaurants: Restaurant[]): Restaurant[];
  sortByName(restaurants: Restaurant[]): Restaurant[];
  sortByDistance(restaurants: Restaurant[]): Restaurant[];
  compareByName(a: Restaurant, b: Restaurant): number;
}

export const restaurantManager: RestaurantManager = {
  list: [],

  init() {
    this.list = getLocalStorage('restaurants') ?? sampleRestaurants;
  },

  add(restaurant) {
    this.list = [restaurant, ...this.list];
  },

  filterByCategory(category, restaurants) {
    if (category === '전체') return restaurants;

    return restaurants.filter((restaurant) => restaurant.category === category);
  },

  sortByName(restaurants) {
    return [...restaurants].sort(this.compareByName);
  },

  sortByDistance(restaurants) {
    return [...restaurants].sort((a: Restaurant, b: Restaurant) => {
      if (a.distance === b.distance) {
        // 같은 거리일 경우 이름 순으로 정렬
        return this.compareByName(a, b);
      }

      return a.distance - b.distance;
    });
  },

  compareByName(a: Restaurant, b: Restaurant) {
    return a.name.localeCompare(b.name);
  },
};
