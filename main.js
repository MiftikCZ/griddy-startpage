// TODO: presunout všechny configy do jednoho config variablu
// TODO: přidat themy: evaforest, winter, warm, B&W

let themes = {
    "default": "",
    "glass": "./themes/glass.css",
    "catppuccin": "./themes/catppuccin.css",
    "gruvbox": "./themes/gruvbox.css",
    "dracula": "./themes/dracula.css",
    "onedark": "./themes/onedark.css",
    ...JSON.parse(localStorage.getItem("customThemes") || "{}")
}

function getJSON(key, _else = {}) {
    let r = {}
    try {
        r = JSON.parse(localStorage.getItem(key) || "") || _else
    } catch (error) {
        console.warn(error)
    }
    return r
}

function getTheme() {
    if (!localStorage.getItem("griddyTheme") || !Object.keys(themes).includes(localStorage.getItem("griddyTheme"))) localStorage.setItem("griddyTheme", "default")
    return localStorage.getItem("griddyTheme") || "default"
}

function setTheme(x = "default") {
    localStorage.setItem("griddyTheme", x)
    reload()
}

function styleSelector() {
    let fullCont = document.createElement("div")
    fullCont.classList.add("themeSelector")
    let themeTitle = document.createElement("span")
    themeTitle.innerText = "select theme"
    themeTitle.classList.add("title")
    fullCont.appendChild(themeTitle)

    Object.entries(themes).forEach(e => {
        let el = document.createElement("div")
        el.innerText = e[0]
        el.classList.add("selection")

        if (e[0] == getTheme()) {
            el.classList.add("selected")
        }

        el.onclick = () => {
            setTheme(e[0])
            fullCont.remove()
            reload()
        }
        fullCont.appendChild(el)
    })

    document.body.appendChild(fullCont)
}

function editLocalstorageVariable(key,com) {
    let fullCont = document.createElement("div")
    fullCont.classList.add("themeSelector")
    let themeTitle = document.createElement("span")
    themeTitle.innerText = "edit "+key
    themeTitle.classList.add("title")
    fullCont.appendChild(themeTitle)
    let comment = document.createElement("span")
    comment.innerText = com || ""

    let ask = document.createElement("textarea")
    ask.classList.add("textarea")
    ask.value = localStorage.getItem(key)

    let el = document.createElement("div") ; el.innerText = "close" ; el.classList.add("selection")
    let el2 = document.createElement("div") ; el2.innerText = "save" ; el2.classList.add("selection")

    el.onclick = () => { fullCont.remove() }
    el2.onclick = () => { 
        localStorage.setItem(key, ask.value || "")
        fullCont.remove() 
    }

    fullCont.appendChild(comment)
    fullCont.appendChild(ask)
    fullCont.appendChild(el)
    fullCont.appendChild(el2)

    document.body.appendChild(fullCont)
}
function showEdit() {
    let fullCont = document.createElement("div")
    fullCont.classList.add("themeSelector")
    let themeTitle = document.createElement("span")
    themeTitle.innerText = "edit..."
    themeTitle.classList.add("title")
    fullCont.appendChild(themeTitle)
    let options = {
        "custom css":()=>{
            editLocalstorageVariable("customCss", "css")
        }, "onload script":()=>{
            editLocalstorageVariable("onloadScript", "javascript")
        }, "shortcuts":()=>{
            editLocalstorageVariable("shortcuts", "JSON object {label:fullLink}")
        }, "notes":()=>{
            editLocalstorageVariable("notes", "plain text")
        }, "imported themes":()=>{
            editLocalstorageVariable("customThemes", "JSON object {theme:link}")
        }, "bigFrameText":()=>{
            editLocalstorageVariable("bigFrameText", "Array [title, description]")
        }, "close":()=>{fullCont.remove()}
    }

    Object.entries(options).forEach(e => {
        let el = document.createElement("div")
        el.innerText = e[0]
        el.classList.add("selection")
        if(e[0] == "close") el.classList.add("selected")
        el.onclick = () => {
            e[1]()
            fullCont.remove()
        }
        fullCont.appendChild(el)
    })

    document.body.appendChild(fullCont)
}

function customizeFrameBig() {
    let e = JSON.parse(localStorage.getItem("bigFrameText") || "[]") || []
    
    if(e[0]) document.getElementById("bigFrame1Title").innerText = e[0]
    if(e[1]) document.getElementById("bigFrame1Desc").innerText = e[1]
}

function customizeShortcuts() {
    let e = JSON.parse(localStorage.getItem("shortcuts") || "{}") || {}
    
    if(e) {
        Object.entries(e).forEach(y => {
            let el = document.createElement("a")
            el.href = y[1]
            el.innerText = y[0]
            el.classList.add("link")
            document.getElementById("shortcuts").appendChild(el)
        })
    }
}

function reload() {
    document.getElementById("importThemeLink").setAttribute("href", themes[getTheme()])
}

function loadTime() {
    let lastSavedMinute = 61
    function setTime() {
        let date = new Date()
        if (date.getMinutes() == lastSavedMinute) return
        lastSavedMinute = date.getMinutes()
        let hours = (date.getHours()).toString()
        let minutes = (date.getMinutes()).toString()

        if (minutes.length < 1.1) {
            minutes = `0${minutes}`
        }


        let ret = "%h:%m"
            .replace(/\%h/gi, hours)
            .replace(/\%m/gi, minutes)

        document.getElementById("clocks").innerHTML = ret
    }

    setInterval(() => {
        setTime()
    }, 2000)
    setTime()
}

function dayOfTheWeek() {
    let e = new Date().getDay()
    let dny = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturdayc"]
    document.getElementById("dayOfTheWeek").innerText = dny[e]
}

function loadCustomCss() {
    let el = document.createElement("style")
    el.innerText = localStorage.getItem("customCss") || ""
    document.head.appendChild(el)
}

function loadCustomScript() {
    try {
        eval(localStorage.getItem("onloadScript"))
    } catch(error) {
        console.error(error)
    }
}

window.onload = () => {
    reload()
    loadTime()
    dayOfTheWeek()
    loadCustomCss()
    loadCustomScript()
    customizeFrameBig()
    customizeShortcuts()
}