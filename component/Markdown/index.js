import React from 'react'
import AppMarkdown from '../../public/test.md'
import CodeBlock from '../CodeBlock'
import HeadingBlock from '../HeadingBlock'
import ReactMarkdown from 'react-markdown'
import htmlParser from 'react-markdown/plugins/html-parser'
import './index.less'
// import Aaa from 'react-markdown'
// console.log('Aaa', Aaa)
// See https://github.com/aknuds1/html-to-react#with-custom-processing-instructions
// for more info on the processing instructions
// const parseHtml = htmlParser({
//   isValidNode: node => node.type !== 'script',
//   processingInstructions: [
//     /* ... */
//   ]
// })

class MarkdownComponent extends React.Component {
  render() {
    return (
      <div className="markdown-layout-outer">
        <ReactMarkdown
          className="md-editor-markdown"
          source={this.props.dataSouce || null}
          escapeHtml={false}
          renderers={{
            code: CodeBlock,
            heading: HeadingBlock
          }}
        />
      </div>
    )
  }
}
export default MarkdownComponent
