

import React from 'react'
import PropTypes from 'prop-types'
import { Spring, config, animated } from 'react-spring'
import styled from 'styled-components';
import * as Icons from './icons'
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const styles = {
  tree: {
    position: 'relative',
    padding: '4px 0px 0px 0px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    verticalAlign: 'middle',
  },
  toggle: {
    width: '1em',
    height: '1em',
    marginRight: 10,
    cursor: 'pointer',
    verticalAlign: 'middle',
  },
  type: {
    textTransform: 'uppercase',
    fontFamily: 'monospace',
    fontSize: '0.6em',
    verticalAlign: 'middle',
  },
  contents: {
    willChange: 'transform, opacity, height',
    marginLeft: 6,
    marginTop: 4,
    padding: '4px 0px 0px 14px',
    borderLeft: '1px dashed black'
  },
}

const ContentWrapper = styled.span`

    background-color: ${props => props.selected ? "lightgray" : "white"};
    vertical-align: 'middle';
    border-radius: 5px;
    padding: 5px;
    border: 1px solid #ccc;

`;

export default class Tree extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = { open: props.open, visible: props.visible, immediate: false }
  }

  toggle = () =>
    this.props.children &&
    this.setState(state => ({ open: !state.open, immediate: false }))

  toggleVisibility = () => {
    this.setState(
      state => ({ visible: !state.visible, immediate: true }),
      () => this.props.onClick && this.props.onClick(this.state.visible)
    )
  }

  componentWillReceiveProps(props) {
    this.setState(state => {
      return ['open', 'visible'].reduce(
        (acc, val) =>
          this.props[val] !== props[val] ? { ...acc, [val]: props[val] } : acc,
        {}
      )
    })
  }

  render() {
    const { open, visible, immediate } = this.state
    const { uniqueId, children, content, type, style, canHide, springConfig } = this.props

    const Icon =
      Icons[`${children ? (open ? 'Minus' : 'Plus') : 'Close'}SquareO`]

    return (
      <div style={{ ...styles.tree, ...style }} className="treeview">
        <Icon
          className="toggle"
          style={{ ...styles.toggle, opacity: children ? 1 : 0.3 }}
          onClick={this.toggle}
        />
        <span style={{ ...styles.type, marginRight: type ? 10 : 0 }}>
          {type}
        </span>
        {canHide && (
          <Icons.EyeO
            className="toggle"
            style={{ ...styles.toggle, opacity: visible ? 1 : 0.4 }}
            onClick={this.toggleVisibility}
          />
        )}
        <ContentWrapper 
                        onClick={() => this.props.onSelect(uniqueId)} 
                        selected={this.props.selected == uniqueId}
        >
          {content}
        
          <IconButton color="inherit" size="small">
            <HighlightOffIcon />
          </IconButton>
        
        </ContentWrapper>
        <Spring
          native
          immediate={immediate}
          config={{ ...config.default, precision: 0.1 }}
          from={{ height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' }}
          to={{
            height: open ? 'auto' : 0,
            opacity: open ? 1 : 0,
            transform: open ? 'translate3d(0px,0,0)' : 'translate3d(20px,0,0)',
          }}
          {...springConfig && springConfig(open)}>
          {style => (
            <animated.div style={{ ...style, ...styles.contents }}>
              {children}
            </animated.div>
          )}
        </Spring>
      </div>
    )
  }
}
