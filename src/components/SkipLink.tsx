import React from 'react';
import styled from 'styled-components';

const SkipLinkContainer = styled.div`
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    font-size: 14px;
    font-weight: 500;
    transition: top 0.3s;

    &:focus {
      top: 6px;
    }
  }
`;

const SkipLink: React.FC = () => {
  return (
    <SkipLinkContainer>
      <a
        href="#main-content"
        className="skip-link"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
    </SkipLinkContainer>
  );
};

export default SkipLink;
