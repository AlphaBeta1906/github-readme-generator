import { useState,useEffect } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import {Tab,Tabs,TabList,TabPanel} from "react-tabs"
import "react-tabs/style/react-tabs.css"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import CopyToClipboard from "react-copy-to-clipboard"

function Result(props){
    const [markdown,setMarkdown] = useState(props.markdown)
    const [copy,setCopy] = useState(false)

    useEffect(function(){
        setMarkdown(props.markdown)
    },[props.markdown])

    return (
            <main>
            <h2>Preview</h2>
            <hr/>
            <CopyToClipboard text={markdown}>
                <button data-tooltip="copy markdown" onClick={function(){setCopy(true)}} >Copy</button>
            </CopyToClipboard>
                {
                    copy?
                    <p>Copied</p>
                    :
                    <span/>
                }

            <Tabs>
                <TabList>
                    <Tab>
                        Preview
                    </Tab>
                    <Tab>
                        Markdown
                    </Tab>
                </TabList>
                <TabPanel>
                    <ReactMarkdown 
                    className="markdown"
                    children={markdown} 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeRaw]}
                    />
                </TabPanel>
                <TabPanel>
                    <textarea
                    value={markdown}
                    onChange={function(e){setMarkdown(e.target.value)}}
                    />
                </TabPanel>
            </Tabs>
        </main>
    )
}

export default Result