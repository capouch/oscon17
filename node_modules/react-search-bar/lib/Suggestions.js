'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Suggestions = _react2['default'].createClass({
  displayName: 'Suggestions',

  propTypes: {
    suggestions: _react2['default'].PropTypes.array.isRequired,
    highlightedItem: _react2['default'].PropTypes.number.isRequired,
    searchTerm: _react2['default'].PropTypes.string.isRequired
  },
  getDefaultProps: function getDefaultProps() {
    return {
      highlightedItem: -1,
      searchTerm: '',
      suggestions: []
    };
  },
  getInitialState: function getInitialState() {
    return {
      activeItem: -1
    };
  },
  onTouchStart: function onTouchStart(index) {
    var _this = this;

    this._timerId = setTimeout(function () {
      _this.setState({ activeItem: index });
    }, 200);
  },
  onTouchMove: function onTouchMove(e) {
    clearTimeout(this._timerId);
    this._touchMoved = true;
    this.setState({ activeItem: -1 });
  },
  onTouchEnd: function onTouchEnd(suggestion, e) {
    var _this2 = this;

    if (!this._touchMoved) {
      setTimeout(function () {
        _this2.props.onSelection(suggestion);
      }, 220);
    }
    this._touchMoved = false;
  },
  render: function render() {
    var _this3 = this;

    var _props = this.props;
    var highlightedItem = _props.highlightedItem;
    var searchTerm = _props.searchTerm;
    var suggestions = _props.suggestions;
    var activeItem = this.state.activeItem;

    return _react2['default'].createElement(
      'ul',
      {
        className: 'search-bar-suggestions',
        onMouseLeave: function () {
          return _this3.setState(_this3.getInitialState());
        } },
      suggestions.map(function (suggestion, index) {
        return _react2['default'].createElement(
          'li',
          {
            className: (0, _classnames2['default'])({
              highlighted: highlightedItem == index || activeItem == index
            }),
            key: index,
            onClick: function () {
              return _this3.props.onSelection(suggestion);
            },
            onMouseEnter: function () {
              return _this3.setState({ activeItem: index });
            },
            onMouseDown: function (e) {
              return e.preventDefault();
            },
            onTouchStart: function () {
              return _this3.onTouchStart(index);
            },
            onTouchMove: _this3.onTouchMove,
            onTouchEnd: function (e) {
              return _this3.onTouchEnd(suggestion, e);
            } },
          _react2['default'].createElement(
            'span',
            null,
            searchTerm,
            _react2['default'].createElement(
              'strong',
              null,
              suggestion.substr(searchTerm.length)
            )
          )
        );
      })
    );
  }
});

exports['default'] = Suggestions;
module.exports = exports['default'];