import { el } from '../node_modules/modern-helpers/el/index.js';
import { Store } from './store.js';
import { getParentId } from './utils.js';

//#region types
/**
 * @typedef {import('./types').DataRowElement} DataRowElement
 * @typedef {import('./types').Data} Data
 */
//#endregion types

//#region DataRow
/**
 * @param {Data} data
 *
 * @returns {DataRowElement}
 */
const DataRow = (data) => {
  let anchor;

  /**
   * @type {DataRowElement}
   */
  const tr = el('tr', {}, [
    el('td', { className: 'col-md-1' }, [data.id]),
    el('td', { className: 'col-md-4' }, [
      (anchor = el('a', { className: 'lbl' }, [data.label]))
    ]),
    el('td', { className: 'col-md-1' }, [
      el('a', { className: 'remove' }, [
        el('span', {
          className: 'remove glyphicon glyphicon-remove',
          attributes: [['aria-hidden', 'true']],
        }),
      ]),
    ]),
    el('td', { className: 'col-md-6' }),
  ]);

  tr.setLabel = (label) => {
    anchor.innerText = label;
  };

  tr.data_id = data.id;
  return tr;
};
//#endregion DataRow

class Main {

  constructor() {
    this.store = new Store();
    this.select = this.select.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.run = this.run.bind(this);
    this.update = this.update.bind(this);
    this.start = 0;

    /** @type {Data[]} */
    this.data = [];

    this.selectedRow = null;

    document.getElementById('main').addEventListener('click', (e) => {
      const target = /** @type {Element} **/ (e.target);
      if (target.matches('#add')) {
        e.preventDefault();
        this.add();
      } else if (target.matches('#run')) {
        e.preventDefault();
        this.run();
      } else if (target.matches('#update')) {
        e.preventDefault();
        this.update();
      } else if (target.matches('#runlots')) {
        e.preventDefault();
        this.runLots();
      } else if (target.matches('#clear')) {
        e.preventDefault();
        this.clear();
      } else if (target.matches('#swaprows')) {
        e.preventDefault();
        this.swapRows();
      } else if (target.matches('.remove')) {
        e.preventDefault();
        let id = getParentId(target);
        let idx = this.findIdx(id);
        this.delete(idx);
      } else if (target.matches('.lbl')) {
        e.preventDefault();
        let id = getParentId(target);
        let idx = this.findIdx(id);
        this.select(idx);
      }
    });
    this.tbody = document.getElementById('tbody');
  }

  /**
   * @param {number} id
   */
  findIdx(id) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) return i;
    }
    return undefined;
  }

  run() {
    this.removeAllRows();
    this.store.clear();
    this.data = [];
    this.store.run();
    this.appendRows();
    this.unselect();
  }

  add() {
    this.store.add();
    this.appendRows();
  }

  //#region update
  update() {
    this.store.update();
    for (let i = 0; i < this.data.length; i += 10) {
      this.tbody.children[i].setLabel(this.store.data[i].label);
    }
  }
  //#endregion update

  unselect() {
    if (this.selectedRow !== null) {
      console.log(this.selectedRow);
      const row = this.tbody.children[this.selectedRow];
      if (row) {
        row.className = '';
      }
      this.selectedRow = null;
    }
  }

  /**
   * @param {number} idx
   */
  select(idx) {
    this.unselect();
    this.store.select(this.data[idx].id);
    this.selectedRow = idx;
    this.tbody.children[idx].className = 'danger';
  }

  recreateSelection() {
    let old_selection = this.store.selected;
    let sel_idx = this.store.data.findIndex((d) => d.id === old_selection);
    if (sel_idx >= 0) {
      this.store.select(this.data[sel_idx].id);
      this.selectedRow = sel_idx;
      this.tbody.children[sel_idx].className = 'danger';
    }
  }

  /**
   * @param {number} idx
   */
  delete(idx) {
    this.store.delete(this.data[idx].id);
    this.tbody.children[idx].remove();
    this.data.splice(idx, 1);
    this.unselect();
    this.recreateSelection();
  }

  removeAllRows() {
    this.tbody.textContent = '';
  }

  runLots() {
    this.removeAllRows();
    this.store.clear();
    this.data = [];
    this.store.runLots();
    this.appendRows();
    this.unselect();
  }

  clear() {
    this.store.clear();
    this.data = [];
    this.removeAllRows();
    this.unselect();
  }

  //#region swapRows
  swapRows() {
    if (this.data.length > 10) {
      this.store.swapRows();
      this.data[1] = this.store.data[1];
      this.data[998] = this.store.data[998];

      this.tbody.insertBefore(this.tbody.children[998], this.tbody.children[2]);
      this.tbody.insertBefore(this.tbody.children[1], this.tbody.children[999]);
    }
  }
  //#endregion swapRows

  //#region appendRows
  appendRows() {
    const newRows = [];
    for (let i = this.tbody.childElementCount; i < this.store.data.length; i++) {
      let row = this.createRow(this.store.data[i]);
      this.data[i] = this.store.data[i];
      newRows.push(row);
    }
    this.tbody.append(...newRows);
  }
  //#endregion appendRows

  //#region create-row
  /**
   * @param {Data} data
   */
  createRow(data) {
    return DataRow(data);
  }
  //#endregion create-row
}

new Main();
