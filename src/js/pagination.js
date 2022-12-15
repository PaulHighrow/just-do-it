import Pagination from 'tui-pagination';

const container = document.getElementById('tui-pagination-container');

export const paginationOptions = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,

  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">:::</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">:::</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">...' +
      '<span class="tui-ico-ellip"></span>' +
      '</a>',
  },
};
//export let pagination = new Pagination('pagination', paginationOptions);
