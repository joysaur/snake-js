// @flow

import Snake from '../Snake';

type Position = {
  x: number,
  y: number,
};

const generateApple = (position: Position): Position => {
  return position;
};

const CELL_TYPES = {
  APPLE: 'apple',
  SNAKE: 'snake',
  EMPTY: 'empty',
};

type CellType = 'apple' | 'snake' | 'empty';

class Grid {
  // size: number;
  // grid: Array<Array<CellType>>;
  // snake: typeof Snake;
  // apple: Position;

  constructor(size: number) {
    this.size = size;
    this.grid = new Array(size).fill(
      new Array(size).fill(CELL_TYPES.EMPTY),
    );
    this.gridEl = this.createGrid();
    document.getElementById('root').appendChild(this.gridEl);

    this.snake = new Snake({
      x: Math.floor(size / 2),
      y: Math.floor(size / 2),
    });
    this.apple = generateApple({
      // x: Math.floor(size / 2) + 2,
      // y: Math.floor(size / 2),

      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
    });
  }

  isOutOfBounds(nextHead) {
    return (nextHead.x < 0 || nextHead.x > this.size - 1 || nextHead.y < 0 || nextHead.y > this.size - 1);
  }

  hasEatenApple(nextHead) {
    return (nextHead.x === this.apple.x && nextHead.y === this.apple.y);
  }

  initializeUpdateInterval() {
    this.updateInterval = setInterval(() => {
      const [ head ] = this.snake.body;
      const nextHead = { x: head.x + 1, y: head.y };

      if (this.isOutOfBounds(nextHead)) {
        clearInterval(this.updateInterval);
        console.log('you lose');
      }

      if (this.hasEatenApple(nextHead)) {
        this.apple = generateApple({
          x: Math.floor(Math.random() * this.size),
          y: Math.floor(Math.random() * this.size),
        });
      }

      this.snake.body[0] = nextHead;

      this.render();
    }, 500);
  }

  createGrid() {
    const gridEl = document.createElement('div');
    gridEl.classList.add('grid');

    for (let row of this.grid) {
      let rowEl = document.createElement('div');
      rowEl.classList.add('row');

      for (let position of row) {
        let cellEl = document.createElement('div');
        cellEl.classList.add('cell');
        rowEl.appendChild(cellEl);
      }

      gridEl.appendChild(rowEl);
    }

    return gridEl;
  }

  render() {
    this.gridEl.innerHTML = '';

    for (let row of this.grid) {
      let rowEl = document.createElement('div');
      rowEl.classList.add('row');

      for (let position of row) {
        let cellEl = document.createElement('div');
        cellEl.classList.add('cell');
        rowEl.appendChild(cellEl);
      }

      this.gridEl.appendChild(rowEl);
    }

    for (let position of this.snake.body) {
      const snakeCell = this.gridEl
        .childNodes[position.x]
        .childNodes[position.y];
      snakeCell && snakeCell.classList.add('snake');
    }

    const appleCell = this.gridEl
      .childNodes[this.apple.x]
      .childNodes[this.apple.y];
    appleCell && appleCell.classList.add('apple');
  }

  start() {
    this.render();
    this.initializeUpdateInterval();
  }
}

export default Grid;
