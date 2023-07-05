import React from 'react'
import PropTypes from 'prop-types'
import styled, { css }  from 'styled-components'

const ImgContainer = styled.div `
  width: ${props => (props.size === "auto" ? "auto" : `${props.size}px`)};
  height: ${props => (props.size === "auto" ? "auto" : `${props.size}px`)};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: ${props => (props.format === 'rond' ? '50%' : '5px')};
  border: solid 1px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.3);
  background-color: black;
  transition: 200ms;  
  ${(props) =>
    !props.disabled && 
    props.onClick &&
    css`
      &:hover {
        transform: scale(1.05);
        cursor: pointer;
        box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
      }      
    `
  }
  ${(props) =>
    props.disabled && 
    css`
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.5);      
    `
  }
`

const ImageStyle = styled.img `
  max-width: ${props => (props.size === "auto" ? "100%" : `${props.size}px`)};
  max-height: ${props => (props.size === "auto" ? "100%" : `${props.size}px`)};
  object-fit: cover;
`

const DisplayImage = (props) => {
  const {id, src, alt, size, format, onClick, disabled} = props

  return (
    <ImgContainer 
      id={id}
      size={size} 
      format={format} 
      disabled={disabled}
      onClick={onClick}
    >
    <ImageStyle         
      src={src} 
      alt={alt}        
      size={size}
    />
    </ImgContainer>
  )
}

DisplayImage.defaultProps = {
  alt: 'Image sans description',
  size: "auto",
  format: '',
  disabled: false,
}

DisplayImage.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  format: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default DisplayImage