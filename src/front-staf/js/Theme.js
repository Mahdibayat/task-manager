export class Theme {
  // Private fields
  _isDark = false;
  _btnElement = null;

  constructor() {
    this._btnElement = document.getElementById('themeToggle');
    this.onMount();
  }

  onMount() {
    if (!this._btnElement) {
      console.error('Theme toggle button not found!');
      return;
    }

    this._btnElement.addEventListener('click', this.toggleTheme.bind(this));
  }

  toggleTheme() {
    this._isDark = !this._isDark;
    document.documentElement.style.setProperty(
      '--bg-color',
      this._isDark ? '#252525' : '#ededed'
    );
    document.documentElement.style.setProperty(
      '--text-color',
      this._isDark ? '#ffffff' : '#000000'
    );
  }

  [Symbol.dispose]() {
    if (this._btnElement) {
      this._btnElement.removeEventListener(
        'click',
        this.toggleTheme.bind(this)
      );
      console.log('Theme toggle cleanup complete.');
    }
  }
}
