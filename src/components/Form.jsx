import { useState } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import remarkGfm from "remark-gfm"
import {Tab,Tabs,TabList,TabPanel} from "react-tabs"
import "react-tabs/style/react-tabs.css"
import tech from "../utils/tech"
import social from "../utils/social"
import misc from "../utils/Misc"
import { sortObj } from "../utils/utils"
import rehypeRaw from "rehype-raw"

function Form(){
    document.title = "Github readme profile generator"
    const [state,setState] = useState({
        name: "",
        greet: "Hello my name ",
        subtitle: "Description about yourself",
        bio: "tell about yourself...",
        tech: "Technology i use",
        social: "My social media"        
    })

    const [stack,setStack] = useState([])

    const [markdown,setMarkdown] = useState(null)
    const [store,setStore] = useState({})

    const [socialName,setSocial] = useState({
        github: "",
        twitter: ""
    })

    const [project,setProject] = useState({
        "project1": ["project name","link_to_project"],
        "project2": ["project name","link_to_project"],
    })

    const [addon,setAddon] = useState([])
    
    function handle(e){
        setState({...state,[e.target.name]: e.target.value})
    }
    
    function handleSocial(e){
        setSocial({...socialName,[e.target.name]: e.target.value})
    }

    function handleProject(e){
        setProject({...project,
            [e.target.id]:[e.target.name === "projectName"?e.target.value:project[e.target.id][0],e.target.name === "projectLink"?e.target.value:project[e.target.id][1]]
        })
    }

    function handleAddon(e){        
        if (e.target.checked) {
            setAddon(arr => [...arr,e.target.name])
            setStore({...store,[e.target.name]: true})        
        }else{
            var index = addon.indexOf(e.target.name)
            if(index >= 0 ){
                addon.splice(index,1)
                setStore({...store,[e.target.name]: false})
            }
        }
    }

    function handleCheck(e){
        // yeah,i dont why this happen but somehow stack.includes(key) start act dynamicly when i add store state
        if (e.target.checked) {
            setStack(arr => [...arr,e.target.name])
            setStore({...store,[e.target.name]: true})        
        }else{
            var index = stack.indexOf(e.target.name)
            if(index >= 0 ){
                stack.splice(index,1)
                setStore({...store,[e.target.name]: false})
            }
        }
    }


    function genrateMarkdown(){
        var md = 
`
## ${state.greet} ${state.name}
${state.subtitle?`##### ${state.subtitle}`:""}
${state.bio?`### About me \n --- \n ${state.bio}`:""}

${stack.length > 0?
`
 ${state.tech?`### ${state.tech}`:"### Technology i use"}\n
---
${
    stack.map(function(data){
        console.log(data)
        if(data.length > 0){            
                return `<a href="${tech[data][0]}" title="${data}"><img src="${tech[data][1]}" style="height: 50px;width: 50px;"/> </a>`
        }
    }).join(" ")
}

### My stat
---
${
    addon.map(function(data){
        console.log(data)
        return `![${data}](${misc[data]}${socialName.github})\n\n`

    }).join(" ")
}
`:""}

`          

    md += `\n  `
    md += `\n### My project  \n`
    for(const [key,value] of Object.entries(project)){
        if(project[key][0] && project[key][1]){
            md += ` - [${project[key][0]}](${project[key][1]}) \n`
        }
    }
    md += `\n`
    
    if (Object.values(socialName).filter(el => el === "").length < Object.keys(social).length) {
        md += `### ${state.social}\n---\n`
    }
    for(const key in social){
        if(socialName[key]){
            md += `<a href=${social[key][0] + socialName[key]} title="${socialName[key]} ${key}"><img height="50" width="50" src="${social[key][1]}" style="margin-left: 5px"/><a/> `

        }
    }
    setMarkdown(md.trim())
}

    function submit(e){
        e.preventDefault()
        if(state.name){
            genrateMarkdown()
        }
    }

    return (
        <form onSubmit={submit}>
            <Tabs>
                <TabList>
                    <Tab>
                        General
                    </Tab>
                    <Tab>
                        Tech stack
                    </Tab>
                    <Tab>
                        Project
                    </Tab>
                    <Tab>
                        Social
                    </Tab>
                    <Tab>
                        Misc
                    </Tab>
                </TabList>        
                <TabPanel>
                    <div>
                        <h3>General</h3>
                        <hr/>
                        <label htmlFor="name">Your name
                            <div className="grid">
                                <input
                                name="greet"
                                type={"text"}
                                placeholder="greeting"
                                onChange={handle}
                                value={state.greet}
                                className="input"
                                />
                                <input 
                                name="name"
                                type={"text"}
                                required={true}
                                placeholder="your name"
                                onChange={handle}
                                value={state.name}                
                                className="input"
                                />
                            </div>
                        </label>
                        <label htmlFor="subtitle">Subtitle</label>
                        <input
                        name="subtitle"
                        type={"text"}
                        placeholder="subtitle"
                        onChange={handle}
                        value={state.subtitle}
                        className="input"
                        />

                        <label htmlFor="bio">Bio</label>
                        <textarea
                        name="bio"
                        placeholder="your bio"
                        onChange={handle}
                        value={state.bio}
                        style={{resize: "vertical",minHeight: "250px"}}
                        />
                    </div>
                </TabPanel>    
                <TabPanel>
                    <h3>Technologies</h3>
                    <hr/>
                    <input
                    name="tech"
                    placeholder="Technology i use"
                    onChange={handle}
                    value={state.tech}
                    className="input"
                    />
                    <div className="pure-g">                
                        {
                            Object.keys(sortObj(tech)).map(key => (
                                <div className="pure-u-1-3 pure-u-md-1-5" key={key}>
                                    <label className="checkbox" title={key}>
                                        <input
                                        name={key}
                                        type={"checkbox"}
                                        onChange={handleCheck}
                                        defaultChecked={stack.includes(key)}
                                        />
                                        <span style={{paddingBottom: "10px"}}>
                                            <img src={tech[key][1]}/>
                                            <span style={{paddingLeft: "15px"}}>{key}</span>
                                        </span>
                                    </label>
                                </div>
                            ))                
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <h3>Project</h3>
                    <hr/>
                    {
                        Object.keys(project).map(key => (
                            <div className="grid">
                                <input
                                id={key}
                                name="projectName"
                                className="input"
                                value={project[key][0]}
                                onChange={handleProject}
                                />
                                <input
                                id={key}
                                name="projectLink"
                                className="input"
                                value={project[key][1]}
                                onChange={handleProject}
                                />
                            </div>
                        ))
                    }
                </TabPanel>
                <TabPanel>
                    <h3>Social</h3>
                    <hr/>
                    <input
                    name="social"
                    className="input"
                    onChange={handle}
                    value={state.social}
                    />
                    {
                        Object.keys(social).map(key => (
                            <>
                                <label style={{display: "flex"}}>
                                    <img height="32" width="32" src={`${social[key][1]}`}/>
                                    <input
                                    name={key}
                                    placeholder={`your ${key} username`}
                                    onChange={handleSocial}
                                    value={socialName[key]}
                                    className="input"
                                    />
                                </label>
                            </>
                        ))
                    }
                </TabPanel>
                <TabPanel>
                    <h3>Misc</h3>
                    <hr/>
                    {
                        socialName.github?
                        <span/>
                        :
                        <p>
                            Github username field in social section is required to enable theese checkbox
                        </p>                
                    }
                    {
                        Object.keys(sortObj(misc)).map(key => (
                            <div className="pure-u-1-2" key={key}>
                                <label className="checkbox" title={key}>
                                    <input
                                    name={key}
                                    type={"checkbox"}
                                    disabled={socialName.github?false:true}
                                    onChange={handleAddon}
                                    defaultChecked={addon.includes(key)}
                                    />
                                    <span style={{marginBottom: "50px"}}>                                
                                        <span style={{paddingLeft: "15px"}}>{key}</span>
                                    </span>
                                </label>
                            </div>
                        ))                
                    }
                </TabPanel>
            </Tabs>

        <button type="submit" style={{marginTop: "25px",marginBottom: "25px"}}>Generate readme</button>
        {
            markdown?
            <>
                <h2>Preview</h2>
                <hr/>
                <Tabs>
                    <TabList>
                        <Tab>
                            Preview
                        </Tab>
                        <Tab>
                            Raw
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
            </>
            :
            <span/>
        }
    </form>
        
    )
}

export default Form