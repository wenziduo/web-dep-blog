// import Main from '../../component/Main'
import Link from 'next/link'
import MarkDown from '../../component/Markdown'
import { Row, Col, Image } from 'react-bootstrap'
import { fetchPostDetail } from '../../api'
import moment from 'moment'

class Post extends React.Component {
  static async getInitialProps({ ctx: { pathname, query } }) {
    const _id = query.id
    const resDetail = await fetchPostDetail({
      _id
    })
    return {
      postDetail: resDetail.data
    }
  }
  render() {
    const { postDetail } = this.props
    return (
      <div>
        <div style={{ paddingTop: 20 }}>
          <h3 style={{ textAlign: 'center', fontSize: 16, fontWeight: 700 }}>
            {postDetail.title}
          </h3>
          <h4
            style={{
              fontSize: 12,
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span>
              <i className="iconfont icon-user" />
              &nbsp;
              {postDetail.author}
            </span>
            <span style={{ marginLeft: 15 }}>
              <i className="iconfont icon-riqi2" />
              &nbsp;
              {moment(postDetail.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </span>
            <span style={{ marginLeft: 15 }}>
              <i className="iconfont icon-eye" />
              &nbsp;
              {postDetail.watch}
            </span>
          </h4>
        </div>
        <MarkDown dataSouce={postDetail.content} />
        <div>
          {postDetail.prevData.length > 0 && (
            <div style={{ marginTop: 20, padding: '0 10px' }}>
              <span>上一篇：</span>
              <Link
                href={{
                  pathname: '/post/detail',
                  query: { id: postDetail.prevData[0]._id }
                }}
              >
                <span style={{ color: '#09b597', cursor: 'pointer' }}>
                  {postDetail.prevData[0].title}
                </span>
              </Link>
            </div>
          )}
        </div>
        <div style={{ marginTop: 20, padding: '0 10px' }}>
          {postDetail.nextData.length > 0 && (
            <div>
              <span>下一篇：</span>
              <Link
                href={{
                  pathname: '/post/detail',
                  query: { id: postDetail.nextData[0]._id }
                }}
              >
                <span style={{ color: '#09b597', cursor: 'pointer' }}>
                  {postDetail.nextData[0].title}
                </span>
              </Link>
            </div>
          )}
        </div>
        {postDetail.guessData.length > 0 && (
          <div style={{ marginTop: 20, padding: '0 10px' }}>
            <h3 style={{ color: '#09b597', fontWeight: 700, marginBottom: 6 }}>猜你喜欢</h3>
            <hr />
            <div style={{ marginTop: 20, padding: '0 15px' }}>
              {postDetail.guessData.map(item => (
                <div key={item._id} style={{ marginTop: 10 }}>
                  <div style={{ flex: 1, display: 'flex' }}>
                    <Link
                      href={{
                        pathname: '/post/detail',
                        query: { id: item._id }
                      }}
                      style={{ cursor: 'pointer', }}
                    >
                      <Image
                        src={item.imgUrl}
                        thumbnail
                        style={{ cursor: 'pointer', flexShrink: 0, width: 80, height: 80 }}
                      />
                    </Link>
                    <div style={{ flexShrink: 1, paddingLeft: 8 }}>
                      <div>
                        <Link
                          href={{
                            pathname: '/post/detail',
                            query: { id: item._id }
                          }}
                        >
                          <strong
                            style={{
                              fontSize: 14,
                              color: '#09b597',
                              cursor: 'pointer',
                              // lineHeight: '15px !import',
                              display: 'inline'
                            }}
                          >
                            {item.title}
                          </strong>
                        </Link>
                      </div>
                      <div>
                        <Link
                          href={{
                            pathname: '/post/detail',
                            query: { id: item._id }
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              color: '#999',
                              lineHeight: '12px !import',
                              display: 'inline',
                              cursor: 'pointer',
                            }}
                          >{(item.text || '').slice(0, 60)}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Post
