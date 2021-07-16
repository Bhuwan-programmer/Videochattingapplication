

const PRE = "Bhuwan"
const SUF = "Prasai"
var room_id;
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var local_stream;
function createRoom(){
  
    let room = document.getElementById("room-input").value;
    if(room == " " || room == "")   {
        alert("You have to enter a room id")
        return;
    }
    room_id = PRE+room+SUF;
    let peer = new Peer(room_id)
    peer.on('open', (id)=>{
      
        console.log("Creating Room")
          console.log("You are connected with ID : "+ id)
        hideModal()
        getUserMedia({video: true, audio: true}, (stream)=>{
            local_stream = stream;
            setLocalStream(local_stream)
        },(err)=>{
            console.log(err)
        })
        notify("Waiting......")
    })
    peer.on('call',(call)=>{
        call.answer(local_stream);
        call.on('stream',(stream)=>{
        
       
           
          
            setRemoteStream(stream)
           
        })
    })
}

function setLocalStream(stream){
    
    let video = document.getElementById("local-video");

    video.srcObject = stream;
    video.muted = false;
    video.play();
   
}
function setRemoteStream(stream){
   
    let video = document.getElementById("remote-video");
    
    video.srcObject = stream;
    video.muted = false;
    video.play();
   
}

function hideModal(){
    document.getElementById("entry-modal").hidden = true;
}

function notify(msg){
    let notification = document.getElementById("notification")
    notification.innerHTML = msg
    notification.hidden = false
    setTimeout(()=>{
        notification.hidden = true;
    }, 5000)
}

function joinRoom(){
    
    console.log("Joining Room")
    let room = document.getElementById("room-input").value;
    if(room == " " || room == "")   {
        alert("Please enter room number")
        return;
    }
    room_id = PRE+room+SUF;
    hideModal()
    let peer = new Peer()
    peer.on('open', (id)=>{
       
        console.log("Connected with Id: "+id)
       
        getUserMedia({video: true, audio: true}, (stream)=>{
            local_stream = stream;
            setLocalStream(local_stream)
            notify("Connected With Bhuwan Application")
            let call = peer.call(room_id, stream)
            call.on('stream', (stream)=>{
            
        
            
                setRemoteStream(stream);
             
              
            })
        }, (err)=>{
            console.log(err)
        })

    })
}


   


   
