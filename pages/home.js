import React from 'react'
import Link from 'next/link'

class Index extends React.Component {
  render() {
    console.log('process.env.NODE_ENV2', process.env.NODE_ENV)
    return (
      <div>
        <div>我是首页模块页面</div>
        <Link
          href={{
            pathname: '/post/detail',
            query: { id: '5de266a045fffe3b4c69fdcf' }
          }}
        >
          前往任务页面
        </Link>
      </div>
    )
  }
}

export default Index
