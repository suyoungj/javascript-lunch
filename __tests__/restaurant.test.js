import { restaurantManager } from '../src/domain/restaurantManager';
import { sampleRestaurants } from '../src/domain/sampleRestaurants';

describe('restaurantManager 도메인 기능 테스트', () => {
  test('새로운 음식점을 추가한다.', () => {
    const newRestaurant = {
      category: '일식',
      name: '돈카라',
      distance: 5,
      description: '상세 설명',
      link: 'link',
    };

    restaurantManager.add(newRestaurant);

    expect(restaurantManager.list).toEqual([newRestaurant]);
  });

  test('음식점들을 카테고리별로 필터링한다.', () => {
    const category = '일식';
    const filteredRestaurants = restaurantManager.filterByCategory(category, sampleRestaurants);
    const isFiltered = filteredRestaurants.every((restaurant) => restaurant.category === category);

    expect(isFiltered).toBe(true);
  });

  test('음식점을 이름순으로 정렬한다.', () => {
    const sortedRestaurants = restaurantManager.sortByName(sampleRestaurants);
    const names = sortedRestaurants.map((restaurant) => restaurant.name);

    expect(names).toEqual([
      '도스타코스 선릉점',
      '이태리키친',
      '잇쇼우',
      '친친',
      '피양콩할머니',
      '호아빈 삼성점',
    ]);
  });

  test('음식점을 거리순으로 정렬하고, 거리가 같은 경우 이름 순으로 정렬한다.', () => {
    const sortedRestaurants = restaurantManager.sortByDistance(sampleRestaurants);
    const names = sortedRestaurants.map((restaurant) => restaurant.name);

    expect(names).toEqual([
      '도스타코스 선릉점',
      '친친',
      '잇쇼우',
      '피양콩할머니',
      '호아빈 삼성점',
      '이태리키친',
    ]);
  });
});
