import styled from 'styled-components'
import { Link } from "react-router-dom"

export const Container = styled.header`
    grid-area: header;
    height: 10.5rem;
    width: 100%;
    border-bottom: .1rem solid ${({ theme }) => theme.COLORS.BACKGROUND_700}; 
    display: flex;
    justify-content: space-between;

    padding: 0 8rem;


`

export const Profile = styled(Link)`
    display: flex;
    align-items: center;
    > img {
        border-radius: 50%;
        width: 5.6rem;
        height: 5%.6;
    }
    > div {
        display: flex;
        flex-direction: column;
        line-height: 2.4rem;
        margin-left: 1.6rem;
        span {
            font-size: 1.4rem;
            color: ${({ theme }) => theme.COLORS.GRAY_100}
        }
        strong {
            font-size: 1.8rem;
            color: ${({ theme }) => theme.COLORS.WHITE}
        }
    }
`;

export const Logout = styled.button`
    border: 0;
    background: none;
    > svg {
        color: ${({ theme }) => theme.COLORS.GRAY_100};
        font-size: 3.6rem;
    }
`;