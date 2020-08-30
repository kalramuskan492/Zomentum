/**
 *@type HTMLInputElement
 */ 
let textboxEl = document.getElementById('textbox')
let sendBtn = document.getElementById('send-btn')
let msgList = document.getElementById('chat-message-list')
let conversationsEl = document.getElementById('conversation-list').children

let selectedChatIndex = 0;

function updateScroll(){
    msgList.scrollTop = msgList.scrollHeight;
}

function sendMsg(){
    // Your Msg
    let msg = textboxEl.value
    textboxEl.value = ''
    
    let chatEl = document.createElement("div")
    chatEl.classList.add("message-row","you-message")
    chatEl.innerHTML = `<div class="message-content">
        <div class="message-text">${msg}</div>
        <div class="message-time">Aug 31</div>
        </div>`
    
    msgList.appendChild(chatEl)

    //Change Sidebar Msg
    let lastMsgEl = (conversationsEl[selectedChatIndex].getElementsByClassName('conversation-message'))[0]
    lastMsgEl.innerText = msg

    updateScroll()

    setTimeout(()=>{
        // Reply Msg
        msg = faker.lorem.sentence()
        
        chatEl = document.createElement("div")
        chatEl.classList.add("message-row","other-message")
        chatEl.innerHTML = `<div class="message-content">
            <div class="message-text">${msg}</div>
            <div class="message-time">Aug 31</div>
            </div>`
        
        msgList.appendChild(chatEl)

        //Change Sidebar Msg
        let lastMsgEl = (conversationsEl[selectedChatIndex].getElementsByClassName('conversation-message'))[0]
        lastMsgEl.innerText = msg

        updateScroll()
    },400)

        
}

sendBtn.addEventListener("click",sendMsg)

function changeCoversation(i){
    selectedChatIndex = i;

    // Change Chat Title
    let name = (conversationsEl[i].getElementsByClassName('title-text'))[0].innerText
    let chatTitleEl = document.getElementById('person-name')
    chatTitleEl.innerText = name

    // Change Active
    for (let index = 0; index < conversationsEl.length; index++) {
        const element = conversationsEl[index]
        element.classList.remove('active')
        if(index === i){
            element.classList.add('active')
        }
    }

    //Change Chats
    msgList.innerHTML = '' 
}

for (let index = 0; index < conversationsEl.length; index++) {
    const element = conversationsEl[index]
    element.addEventListener("click",()=>changeCoversation(index))
}


