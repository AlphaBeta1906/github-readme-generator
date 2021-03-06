import { useState,useEffect } from "react"
import {Tab,Tabs,TabList,TabPanel} from "react-tabs"
import "react-tabs/style/react-tabs.css"
import tech from "../utils/tech"
import social from "../utils/social"
import misc from "../utils/Misc"
import { sortObj,genrateMarkdown } from "../utils/utils"
import Result from "./Result"

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
        "project3": ["",""]
    })

    const [addon,setAddon] = useState([])
    const [error,setError] = useState(false)

    function handle(e){
        setError(false)
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


    function submit(e){
        e.preventDefault()
        if(state.name){
            setMarkdown(genrateMarkdown(state,stack,addon,socialName,project))
            console.log(markdown);
        }else{
            setError(true)
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
                                    <label className="checkbox">
                                        <input
                                        name={key}
                                        type={"checkbox"}
                                        onChange={handleCheck}
                                        defaultChecked={stack.includes(key)}
                                        data-tooltip={key}
                                        />
                                        <span style={{paddingBottom: "30px"}}>
                                            <img src={tech[key][1]}/>
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
                    <div className="pure-g">
                        {
                            Object.keys(project).map(key => (
                                <div className="pure-u-1" style={{display: "flex"}}>
                                    <span>{key} </span>
                                    <input
                                    id={key}
                                    name="projectName"
                                    className="input"
                                    value={project[key][0]}
                                    onChange={handleProject}
                                    placeholder="project name"
                                    style={{marginLeft: "15px",marginRight: "15px"}}
                                    />
                                    <input
                                    id={key}
                                    name="projectLink"
                                    className="input"
                                    value={project[key][1]}
                                    onChange={handleProject}
                                    placeholder="project link"
                                    />
                                </div>
                            ))
                        }
                    </div>

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
            <br/>
            <br/>
            <br/>
        {
                !state.name && error?
                <p style={{color: "#e53935"}}>
                    Name is required
                </p>
                :
            <span/>
        }
        <button type="submit" style={{marginTop: "25px",marginBottom: "25px"}}>Generate readme</button>
        {
            markdown?
            <Result markdown={markdown}/>
            :
            <span/>
        }
        
    </form>
        
    )
}

export default Form