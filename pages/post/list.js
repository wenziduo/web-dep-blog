import React from 'react'
import moment from 'moment'
import Link from 'next/link'
// import Main from '../../component/Main'
import { ListGroup, Image, Row, Col, Pagination, Spinner, Alert } from 'react-bootstrap'
import { fetchPostList } from '../../api'
import { isServer, getUrlParam } from '../../utils/utils'

class PostList extends React.Component {
  state = {
    page: 0,
    pageSize: 50,
    total: 0,
    data: [],
    loadingMore: false
  }
  componentDidMount() {
    this.getList()
  }
  static async getInitialProps({ ctx: { pathname, query } }) {
    const res = await fetchPostList({ classifyId: query.classifyId, textLength: 200, page: 1, pageSize: 50 })
    return {
      page: res.data ? res.data.page : 1,
      pageSize: res.data ? res.data.pageSize : 50,
      total: res.data ? res.data.total : 0,
      data: res.data ? res.data.data : [],
    }
  }
  getList = async () => {
    const { page, pageSize } = this.state
    this.setState({ loadingMore: true })
    const res = await fetchPostList({ classifyId: getUrlParam('classifyId'), textLength: 200, page: page + 1, pageSize })
    this.setState({ loadingMore: false })
    const params = {
      page: res.data ? res.data.page : 1,
      pageSize: res.data ? res.data.pageSize : 50,
      total: res.data ? res.data.total : 0,
      data: res.data ? [...this.state.data, ...res.data.data] : [],
    }
    this.setState(params)
    return params
  }
  handleLoadMore = () => {
    this.getList()
  }
  render() {
    const { loadingMore } = this.state
    const params = isServer() ? {
      page: this.props.page,
      pageSize: this.props.pageSize,
      total: this.props.total,
      data: this.props.data,
    } : {
      page: this.state.page,
      pageSize: this.state.pageSize,
      total: this.state.total,
      data: this.state.data,
    }
    const { page, pageSize, total, data } = params
    console.log('params', params)
    return (
      <div>
        <div>
          <ListGroup variant="flush">
            {data.map(item => (
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
                          style={{ cursor: 'pointer', width: 70, height: 70 }}
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
          {
            (page * pageSize) < total &&
              <Alert variant="success">
                <div style={{ textAlign: 'center' }}>
                  {
                    loadingMore && <Spinner animation="grow" variant="success" />
                  }
                  {
                    !loadingMore && <a onClick={this.handleLoadMore}>加载更多（剩{total - (page * pageSize)}）</a>
                  }
                </div>
              </Alert>
          }
        </div>
      </div>
    )
  }
}

export default PostList
