import tech from "./tech"
import misc from "./Misc"
import social from "./social"

function sortObj(obj) {
    // code from https://www.w3docs.com/snippets/javascript/how-to-sort-javascript-object-by-key.html
    return Object.keys(obj).sort().reduce(function(result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}


function genrateMarkdown(state, stack, addon, socialName, project) {
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

`:""}

${addon.length > 0?"### My stat\n---\n":""}

${
addon.map(function(data){
    console.log(data)
    return `![${data}](${misc[data]}${socialName.github})\n\n`

}).join(" ")
}

`          
    var haveProject = false
    md += `\n  `
    for(const key in project){
        if(project[key][0] &&  project[key][1]){            
            haveProject = true
        }
    }
    if(haveProject){
        md += `\n### My project  \n`
    }

    for(const key in project){
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
        console.log(md)
        return md.trim()
}

export { sortObj,genrateMarkdown }