import React from 'react'
//import getVideos from './services/videos'
import VideoLib from './containers/VideoLib'
import VideoPlayer from './containers/VideoPlayer'
import RecipeLib from './containers/RecipeLib'
import Home from './containers/Home'

import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import {
  HomeOutlined,
  PlayCircleOutlined,
  FileOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: true,
    selectedMenu: "Home"
  };

  setSelectedKey(key) {
    console.log("[App.setSelectedKey]", key)
    this.setState({
      selectedMenu: key
    });
  }

  onCollapse = collapsed => {
    console.log("[App.onCollapse]", collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { selectedMenu } = this.state;

    const videoJsOptions = {
      id: 1,
      autoplay: true,
      controls: true,
      sources: [{
        src: '/Users/vester/Movies/bobs.burgers/bobs.burgers.s06/bobs.burgers.s06e01.mp4',
        type: 'video/mp4'
      }]
    }

    const compnentToRender = () => {
      switch(selectedMenu) {
        case "VideoPlayer":
          return <VideoPlayer { ...videoJsOptions }/>;
        case "VideoLibDocumentaries":
          return <VideoLib />;
        case "VideoLibShows":
          return <VideoLib />;
        case "VideoLibMovies":
          return <VideoLib />;
        case "RecipeLib":
          return <RecipeLib />;
        default:
          return <Home />;
      }
    }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Header className="sider-background" style={{ padding: 0, minHeight: 64 }} />
          <Menu
            theme="dark"
            defaultSelectedKeys={[selectedMenu]}
            mode="inline"
            onSelect={ ({key}) => this.setSelectedKey(key) }
          >
            <Menu.Item key="Home" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="VideoPlayer" icon={<PlayCircleOutlined />}>
              Video Player
            </Menu.Item>
            <SubMenu key="VideoLib" icon={<FileOutlined />} title="Video Library">
              <Menu.Item key="VideoLibShows">Shows</Menu.Item>
              <Menu.Item key="VideoLibMovies">Movies</Menu.Item>
              <Menu.Item key="VideoLibDocumentaries">Documentaries</Menu.Item>
            </SubMenu>
            <Menu.Item key="RecipeLib" icon={<HeartOutlined />}>
              Recipe Library
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '16px 16px' }}>
            <div>
             {compnentToRender()}
            </div>
            <VideoPlayer { ...videoJsOptions }/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App