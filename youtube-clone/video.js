let cookieString=document.cookie;
let videoId=cookieString.split("=")[1]
const apiKey=localStorage.getItem("api_Key");

let firstScript=document.getElementsByTagName("script")[0];
firstScript.addEventListener("load",onLoadScript)
function onLoadScript(){
    if(YT){
    new YT.Player("aravind",{
        height:"400",
        width:"600",
        videoId,
        events:{
            onReady:(event)=>{
                document.title=event.target.videoTitle;
                extractVideoDetails(videoId);
                fetchStats(videoId);
            }
        }
    })
}
}
const statsContainer=document.getElementsByClassName("video-details")[0];
async function extractVideoDetails(videoId){
    let endPoint=`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`;
    try{
      let response=await fetch(endPoint);
      let result=await response.json();
      console.log(result);
    }catch(error){
        console.log(`error occured`,error);
    }
}

async function fetchStats(videoId){
    console.log("fetch fetchStats")
    let endPoint=` https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=${apiKey}&id=${videoId}`
    try{
        const response=await fetch(endPoint);
        const result=await response.json();
        console.log(result,"stats");
        
        const item=result.items[0];
        // <p>${item.title}</p>
         statsContainer.innerHTML=` <div class="profile">
         <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" class="channel-logo" alt="">
         <div class="owner-details">
             <span style="color:white">${item.snippet.channelTitle}</span>
             <span>20 subscribers</span>
         </div>
     </div>
     <div class="stats">
        <div class="like-container">
         <div class="like">
             <span class="material-icons">thumb_up</span>
             <span>${item.statistics.likeCount}</span>
         </div>
         <div class="like">
             <span class="material-icons">thumb_down</span>
             <span>0</span>
         </div>
        </div>
        <div class="comments-container">
         <span class="material-icons">comment</span>
         <span>${item.statistics.commentCount}</span>
        </div>
     </div>`
    }
    catch(error){

    }
}