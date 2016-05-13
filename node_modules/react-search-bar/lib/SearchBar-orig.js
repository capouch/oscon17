'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('es6-promise');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Suggestions = require('./Suggestions');

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var KEY_CODES = {
  up: 38,
  down: 40
};

var SearchBar = _react2['default'].createClass({
  displayName: 'SearchBar',

  propTypes: {
    autoFocus: _react2['default'].PropTypes.bool,
    debounceDelay: _react2['default'].PropTypes.number,
    inputName: _react2['default'].PropTypes.string,
    placeholder: _react2['default'].PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      autoFocus: true,
      debounceDelay: 100,
      inputName: 'query'
    };
  },
  getInitialState: function getInitialState() {
    return {
      highlightedItem: -1,
      searchTerm: '',
      suggestions: [],
      value: ''
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.autoFocus) {
      this.refs.input.focus();
    }
  },
  normalizeInput: function normalizeInput() {
    return this.state.value.toLowerCase().trim();
  },
  onChange: function onChange(e) {
    var _this = this;

    clearTimeout(this._timerId);
    var input = e.target.value;
    if (!input) return this.setState(this.getInitialState());
    this.setState({ value: input });

    this._timerId = setTimeout(function () {
      var searchTerm = _this.normalizeInput();
      if (!searchTerm) return;
      new Promise(function (resolve) {
        _this.props.onChange(input, resolve);
      }).then(function (suggestions) {
        if (!_this.state.value) return;
        _this.setState({
          highlightedItem: -1,
          searchTerm: searchTerm,
          suggestions: suggestions
        });
      });
    }, this.props.debounceDelay);
  },
  onKeyDown: function onKeyDown(e) {
    e.preventDefault();
    var _state = this.state;
    var item = _state.highlightedItem;
    var suggestions = _state.suggestions;

    var lastItem = suggestions.length - 1;

    if (e.which == KEY_CODES.up) {
      item = item <= 0 ? lastItem : item - 1;
    } else {
      item = item == lastItem ? 0 : item + 1;
    }

    this.setState({
      highlightedItem: item,
      value: suggestions[item]
    });
  },
  onSelection: function onSelection(suggestion) {
    this.setState({ value: suggestion });
    this.search(suggestion);
  },
  onSubmit: function onSubmit(e) {
    e.preventDefault();
    var input = this.normalizeInput();
    if (!input) return;
    this.search(input);
  },
  search: function search(value) {
    clearTimeout(this._timerId);
    this.refs.input.blur();

    var _getInitialState = this.getInitialState();

    var highlightedItem = _getInitialState.highlightedItem;
    var suggestions = _getInitialState.suggestions;

    this.setState({ highlightedItem: highlightedItem, suggestions: suggestions });
    this.props.onSubmit(value);
  },
  render: function render() {
    var _this2 = this;

    return _react2['default'].createElement(
      'div',
      { className: 'search-bar-wrapper' },
      _react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])("search-bar-field", { "is-focused": this.state.isFocused }) },
        _react2['default'].createElement('input', {
          className: 'search-bar-input',
          name: this.props.inputName,
          type: 'text',
          maxLength: '100',
          autoCapitalize: 'none',
          autoComplete: 'off',
          autoCorrect: 'off',
          ref: 'input',
          value: this.state.value,
          placeholder: this.props.placeholder,
          onChange: this.onChange,
          onKeyDown: function (e) {
            (e.which == KEY_CODES.up || e.which == KEY_CODES.down) && _this2.state.suggestions.length != 0 && _this2.onKeyDown(e);
          },
          onBlur: function () {
            return _this2.setState({ isFocused: false, suggestions: [] });
          },
          onFocus: function () {
            return _this2.setState({ isFocused: true });
          } }),
        this.state.value && _react2['default'].createElement('span', {
          className: 'icon search-bar-cancel',
          onClick: function () {
            return _this2.setState(_this2.getInitialState());
          } }),
        _react2['default'].createElement('input', {
          className: 'icon search-bar-submit',
          type: 'submit',
          onClick: this.props.onSubmit && this.onSubmit })
      ),
      this.state.suggestions.length > 0 && _react2['default'].createElement(_Suggestions2['default'], {
        searchTerm: this.state.searchTerm,
        suggestions: this.state.suggestions,
        highlightedItem: this.state.highlightedItem,
        onSelection: this.onSelection })
    );
  }
});

exports['default'] = SearchBar;
module.exports = exports['default'];