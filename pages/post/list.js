import React from 'react'
import moment from 'moment'
import Link from 'next/link'
// import Main from '../../component/Main'
import { ListGroup, Image, Row, Col } from 'react-bootstrap'
import { fetchPostList } from '../../api'

class PostList extends React.Component {
  static async getInitialProps({ ctx: { pathname, query } }) {
    const res = await fetchPostList({ classifyId: query.classifyId, textLength: 200 })
    return {
      dataList: res.data || []
    }
  }
  render() {
    const { dataList = [] } = this.props
    return (
      <div>
        <div>
          <ListGroup variant="flush">
            {dataList.map(item => (
              <ListGroup.Item key={item._id}>
                <div style={{ display: 'flex' }}>
                  <div>
                    <Link
                      href={{
                        pathname: '/post/detail',
                        query: { id: item._id }
                      }}
                    >
                      <div style={{ overflow: 'hidden', padding: 3, border: '1px solid #EEE', borderRadius: '50%' }}>
                        <Image
                          src={item.imgUrl}
                          roundedCircle
                          alt="图片加载失败"
                          style={{ cursor: 'pointer', width: 83, height: 83 }}
                        />
                      </div>
                    </Link>
                  </div>
                  <div style={{ flex: 1, marginLeft: 15 }}>
                    <h3>
                      <Link
                        href={{
                          pathname: '/post/detail',
                          query: { id: item._id }
                        }}
                      >
                        <span
                          style={{
                            color: '#09b597',
                            fontSize: 16,
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </h3>
                    <p style={{ minHeight: 40, fontSize: 13 }}>
                      <Link
                        href={{
                          pathname: '/post/detail',
                          query: { id: item._id }
                        }}
                      >
                        <span
                          style={{
                            cursor: 'pointer',
                            letterSpacing: 0,
                            overflow: 'hidden', /*超出部分隐藏*/
                            textOverflow: 'ellipsis', /*文字超出部分以省略号显示*/
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                          }}
                        >{item.text}</span>
                      </Link>
                    </p>
                    <p style={{ textAlign: 'right', color: '#777' }}>
                      <span>
                        {moment(item.createTime).format('YYYY-MM-DD HH:mm')}
                      </span>
                      <span style={{ marginLeft: 15 }}>
                        <i className="iconfont icon-eye" />
                        &nbsp;
                        {item.watch}
                      </span>
                    </p>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    )
  }
}

export default PostList
