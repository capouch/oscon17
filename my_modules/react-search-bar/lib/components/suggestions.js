'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

var _suggestion = require('./suggestion');

var _suggestion2 = _interopRequireDefault(_suggestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Suggestions = function (_Component) {
  _inherits(Suggestions, _Component);

  function Suggestions(props) {
    _classCallCheck(this, Suggestions);

    var _this = _possibleConstructorReturn(this, (Suggestions.__proto__ || Object.getPrototypeOf(Suggestions)).call(this, props));

    (0, _reactAutobind2.default)(_this);
    return _this;
  }

  _createClass(Suggestions, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.focusedSuggestion) {
        var listNode = (0, _reactDom.findDOMNode)(this.list);
        var suggestionNode = (0, _reactDom.findDOMNode)(this.focusedSuggestion);

        var listRect = listNode.getBoundingClientRect();
        var suggestionRect = suggestionNode.getBoundingClientRect();

        if (suggestionRect.bottom > listRect.bottom) {
          listNode.scrollTop = suggestionNode.offsetTop + suggestionNode.clientHeight - listNode.clientHeight;
        } else if (suggestionRect.top < listRect.top) {
          listNode.scrollTop = suggestionNode.offsetTop;
        }
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event, index) {
      var _event$nativeEvent = event.nativeEvent,
          movementX = _event$nativeEvent.movementX,
          movementY = _event$nativeEvent.movementY;


      if (movementX || movementY) {
        this.props.onSuggestionHover(index);
      }
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      this.props.onSuggestionHover(-1);
    }
  }, {
    key: 'renderSuggestion',
    value: function renderSuggestion(suggestion, index) {
      var _classNames,
          _this2 = this;

      var props = this.props;
      var styles = props.styles;

      var isFocused = props.focusedSuggestion === index;

      return _react2.default.createElement(_suggestion2.default, {
        className: (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, styles.suggestion, true), _defineProperty(_classNames, styles.suggestionFocused, isFocused), _classNames)),
        index: index,
        key: suggestion,
        onClick: props.onSelection,
        onMouseMove: this.onMouseMove,
        ref: function ref(_ref) {
          return isFocused && (_this2.focusedSuggestion = _ref);
        },
        searchTerm: props.searchTerm,
        suggestion: suggestion,
        suggestionRenderer: props.suggestionRenderer
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'ul',
        {
          className: this.props.styles.suggestions,
          ref: function ref(_ref2) {
            return _this3.list = _ref2;
          },
          onMouseLeave: this.onMouseLeave
        },
        this.props.suggestions.map(this.renderSuggestion)
      );
    }
  }]);

  return Suggestions;
}(_react.Component);

Suggestions.defaultProps = {
  styles: {
    suggestions: 'react-search-bar__suggestions',
    suggestion: 'react-search-bar__suggestion',
    focusedSuggestion: 'react-search-bar__suggestion--focused'
  }
};

Suggestions.propTypes = {
  focusedSuggestion: _react.PropTypes.number,
  onSelection: _react.PropTypes.func.isRequired,
  onSuggestionHover: _react.PropTypes.func.isRequired,
  searchTerm: _react.PropTypes.string.isRequired,
  styles: _react.PropTypes.object,
  suggestions: _react.PropTypes.array.isRequired
};

exports.default = Suggestions;