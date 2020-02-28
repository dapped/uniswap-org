import { Link } from 'gatsby'
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext
} from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { ThemeManagerContext } from '../styles/themeManager'
import Uni from '../images/uni.inline.svg'

function Dropdown(props) {
  const items = props.links.map(node => {
    const title = node.name
    return (
      <StyledFooterLink key={node.name}>
        {node.link.split('/')[0] === '' ? (
          <Link to={node.link}>{title}</Link>
        ) : (
          <a href={node.link}>{title}</a>
        )}
      </StyledFooterLink>
    )
  })
  return <StyledFooterLinkSection>{items}</StyledFooterLinkSection>
}

const StyledFooter = styled.footer`
  padding: 4rem 2rem;
  /* margin-bottom: 2rem; */
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
  /* background-color: ${({ theme }) => theme.colors.grey9}; */
  color: ${({ theme }) => theme.textColor};
  @media  (max-width: 960px) {
    flex-direction: column;
    padding: 2rem 1rem;
  }
`

const StyledSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  @media (max-width: 960px) {
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 2rem;
  }
`

const StyledFooterSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  @media (max-width: 960px) {
    padding-left: 0rem;
    margin-bottom: 2rem;
  }
`

const StyledFooterSectionNav = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding-left: 5rem;
  @media (max-width: 960px) {
    padding-left: 0rem;
    margin-bottom: 2rem;
    display: none;
  }
`

const StyledFooterLinkSection = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
`

const StyledFooterLink = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  text-decoration: none;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.textColor};
  }
`

const StyledUni = styled(Uni)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  margin-bottom: 3rem;
  transform: rotate(0deg);
  transition: transform 0.2s linear;
  :hover {
    transform: rotate(-10deg);
  }
`

const StyledEmailForm = styled.form`
  width: 300px;
`

const Commit = styled.div``

const Footer = props => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          commit
          repository
          menulinks {
            name
            sublinks {
              description
              name
              link
            }
          }
          title
        }
      }
    }
  `)

  const themeContext = useContext(ThemeManagerContext)

  return (
    <StyledFooter>
      <StyledSection>
        <StyledFooterSection>
          <StyledUni />
          <Commit>
            Deployed commit:{' '}
            <code>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${data.site.siteMetadata.repository}/commit/${data.site.siteMetadata.commit}`}
              >
                {data.site.siteMetadata.commit.substring(0, 7)}
              </a>
            </code>
          </Commit>

          <div>
            <label>
              <input
                type="checkbox"
                onChange={() => themeContext.toggleDark()}
                checked={themeContext.isDark}
              />{' '}
              Dark mode
            </label>
          </div>
          <p>© 2020 Uniswap</p>
        </StyledFooterSection>
      </StyledSection>
      <StyledSection>
        {data.site.siteMetadata.menulinks.map(item => {
          return (
            <StyledFooterSectionNav key={item.name}>
              <h4>{item.name}</h4>
              <Dropdown links={item.sublinks} />
            </StyledFooterSectionNav>
          )
        })}
      </StyledSection>
    </StyledFooter>
  )
}
export default Footer
