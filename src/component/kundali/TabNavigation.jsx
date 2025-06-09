import React from 'react';
import { Tabs } from 'antd';

const TabNavigation = ({ 
  items, 
  defaultActiveKey = '1', 
  onChange, 
  activeKey, 
  centered = false,
  tabBarExtraContent,
  destroyInactiveTabPane = false,
  className = '', // Add className prop
  tabBarClassName = '', // Add tabBarClassName prop
  contentClassName = '' // Add contentClassName prop
}) => {
  const handleChange = (key) => {
    if (onChange) {
      onChange(key);
    }
  };
 
  return (
    <div className={`custom-tabs-container ${className}`}>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        activeKey={activeKey}
        items={items}
        onChange={handleChange}
        className={`custom-tabs ${tabBarClassName}`}
        tabBarGutter={0}
        centered={centered}
        tabBarExtraContent={tabBarExtraContent}
        destroyInactiveTabPane={destroyInactiveTabPane}
      />
      <div className={`custom-tabs-content ${contentClassName}`}>
        {/* {items.find(item => item.key === (activeKey || defaultActiveKey))?.children} */}
      </div>
    </div>
  );
};

export default TabNavigation;