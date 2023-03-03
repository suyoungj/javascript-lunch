import { $, dispatchCustomEvent } from '../utils/dom';

customElements.define(
  'restaurant-filter',
  class RestaurantFilter extends HTMLElement {
    constructor() {
      super();

      this.innerHTML = /* html */ `
        <select name="category" id="category-filter" class="restaurant-filter">
          <option value="전체">전체</option>
          <option value="한식">한식</option>
          <option value="중식">중식</option>
          <option value="일식">일식</option>
          <option value="양식">양식</option>
          <option value="아시안">아시안</option>
          <option value="기타">기타</option>
        </select>

        <!-- 정렬 셀렉트 박스 -->
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          <option value="register">등록순</option>
          <option value="name">이름순</option>
          <option value="distance">거리순</option>
        </select>
      `;
    }

    connectedCallback() {
      this.addEventListener('change', () => this.handleChange());
    }

    handleChange() {
      const category = $('#category-filter').value;
      const sortingType = $('#sorting-filter').value;

      dispatchCustomEvent(this, {
        eventType: 'filterRestaurant',
        data: {
          category,
          sortingType,
        },
      });
    }
  }
);