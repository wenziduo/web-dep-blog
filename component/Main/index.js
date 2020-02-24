import React from 'react'
import Link from 'next/link'
import { Image } from 'react-bootstrap'
import moment from 'moment'
import './index.less'
class MyContainer extends React.Component {
  render() {
    const { classifyList, postList } = this.props
    return (
      <div className="layout-container">
        <div className="layout-container-left">{this.props.children}</div>
        <div className="layout-container-right">
          <div>
            <h4 className="layout-container-right-title">最新文章</h4>
            <ul className="layout-container-right-ul">
              {postList.map(item => (
                <li key={item._id}>
                  <div style={{ minWidth: 125 }}>
                    <Image
                      width={110}
                      height={110}
                      rounded
                      // roundedCircle
                      thumbnail
                      style={{ float: 'left' }}
                      alt="171x180"
                      src={item.imgUrl}
                    />
                  </div>
                  <div className="layout-container-right-ul-li-content">
                    <Link
                      passHref
                      href={{
                        pathname: '/post/detail',
                        query: { id: item._id }
                      }}
                    >
                      <h4>{item.title}</h4>
                    </Link>
                    <p
                      style={{
                        color: '#888',
                        fontSize: 10,
                        margin: 0,
                        minHeight: 30
                      }}
                    >
                      <span>{(item.text || '').slice(0, 40)}</span>
                    </p>
                    <p style={{ textAlign: 'right', margin: 0 }}>
                      <span>
                        {moment(item.createTime).format('YYYY-MM-DD HH:mm')}
                      </span>
                      <span style={{ marginLeft: 10 }}>
                        <i className="iconfont icon-eye" />
                        &nbsp;
                        {item.watch}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="layout-container-right-title">分类</h4>
            <ul className="layout-container-right-ul">
              {classifyList.map((item, index) => (
                <li key={index}>
                  <Link
                    href={{
                      pathname: '/post/list',
                      query: { classifyId: item._id }
                    }}
                  >
                    <a style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="layout-container-right-ul-li-round">
                        <div
                          className="layout-container-right-ul-li-round-img"
                          style={{
                            background: `url(${item.imgUrl}) no-repeat center center`,
                            backgroundSize: '40px 40px'
                          }}
                        ></div>
                      </div>
                      <strong
                        style={{
                          marginLeft: 10
                        }}
                      >
                        {item.title}&nbsp;({item.count})
                      </strong>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MyContainer
