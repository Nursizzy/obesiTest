import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div ({
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
width: '100vw'
})


export const StyledLink = styled(Link)({

        textAlign: 'start'
    })


export const Square = styled.div`
  width: 100px;         /* Width of the house */
  height: 200px;         /* Height of the house */
  background-color: blue; /* Color of the house */
  position: relative;   /* Required for positioning the roof */
  transform: rotate(90deg); /* Rotate to turn the house to the right */

  &::before {
    content: '';            /* Necessary for a pseudo-element */
    position: absolute;     /* Position relative to the house */
    top: 0;             /* Position the roof on top of the house */
    left: 0;
    width: 100%;            /* Full width of the house */
    height: 40px;           /* Height of the roof */
    background-color: blue; /* Color of the roof */
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  }
`;