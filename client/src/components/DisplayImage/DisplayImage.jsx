import React from 'react'
import PropTypes from 'prop-types'
import styled, { css }  from 'styled-components'

const IcnContainer = styled.div `
  width: ${props => (props.size)}px;
  height: ${props => (props.size)}px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: ${props => (props.format === 'rond' ? '50%' : '5px')};
  border: solid 1px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.3);
  transition: 200ms;  
  ${(props) =>
    !props.disabled && 
    props.clickable &&
    css`
      &:hover {
        transform: scale(1.05);
        cursor: pointer;
        box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
      }      
    `
  }${(props) =>
    props.disabled && 
    css`
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.5);      
    `
  }
`

const ImageStyle = styled.img `
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  object-fit: cover;
`

const DisplayImage = (props) => {
  const {id, src, alt, size, format, onClick, disabled} = props
  const clickable = onClick ? true : false

  return (
    <IcnContainer 
      id={id}
      size={size} 
      format={format} 
      onClick={onClick}
      clickable={clickable}
      disabled={disabled}
    >
      <ImageStyle         
        src={src} 
        alt={alt}        
        size={size}
      />
    </IcnContainer>
  )
}

DisplayImage.defaultProps = {
  alt: 'Image sans description',
  format: '',
  disabled: false,
}

DisplayImage.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.object.isRequired,
  alt: PropTypes.string,
  size: PropTypes.number,
  format: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default DisplayImage