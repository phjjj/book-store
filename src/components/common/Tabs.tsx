import React, { useState } from "react";
import styled from "styled-components";

interface TabProps {
  children: React.ReactNode;
  title: string;
}

function Tab({ children, title }: TabProps) {
  return <>{children}</>;
}

interface TabsProps {
  children: React.ReactNode;
}

function Tabs({ children }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // chidren을 배열로 변환
  const tabs = React.Children.toArray(
    children
  ) as React.ReactElement<TabProps>[];

  return (
    <TabsStyle>
      <div className="tabs">
        <div className="tab-header">
          {tabs.map((tab, index) => (
            <button
              onClick={() => setActiveIndex(index)}
              className={
                activeIndex === index ? "active" : ""
              }>
              {tab.props.title}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {tabs[activeIndex].props.children}
        </div>
      </div>
    </TabsStyle>
  );
}
const TabsStyle = styled.div`
  .tab-header {
    display: flex;
    gap: 2px;
    border-bottom: 1px solid #ddd;

    button {
      border: none;
      background: #ddd;
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({ theme }) => theme.color.text};
      border-radius: ${({ theme }) =>
          theme.borderRadius.default}
        ${({ theme }) => theme.borderRadius.default} 0 0;
      padding: 12px 12px;

      &.active {
        color: #fff;
        background-color: ${({ theme }) =>
          theme.color.primary};
      }
    }
  }
  .tab-content {
    padding: 24px;
  }
`;

export { Tabs, Tab };
