import React, { useEffect, useState } from 'react';
import { Button, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import navbardata from './navbarData';

interface navBarType {
  role: string[];
}

const Navbar: React.FC<navBarType> = (props) => {
  const { role } = props;
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [dataItems, setDataItems] = useState(navbardata);

  useEffect(() => {
    if (role.includes('Student')) {
      setDataItems(
        navbardata.filter((item) => item.name !== 'Tasks List' && item.name !== 'Check Session')
      );
    } else if (role.includes('Author')) {
      setDataItems(navbardata.filter((item) => item.name !== 'Check Session'));
    }
  }, [role]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="navbar">
      <div>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          theme="light"
          inlineCollapsed={collapsed}
        >
          {dataItems.map((item, index) => {
            return (
              <Menu.Item
                key={`item_${String(index)}`}
                icon={item.icon}
                onClick={() => history.push(item.path)}
              >
                {item.name}
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    </div>
  );
};

const mapStatetoProps = (state: { user: { role: any } }) => {
  return {
    role: state.user.role,
  };
};

export default connect(mapStatetoProps)(Navbar);
