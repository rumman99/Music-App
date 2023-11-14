// Song Api Call Function
const songApi= async()=>{
    try{
    const songName= document.getElementById('song').value;
    let fetching= await fetch(`https://api.lyrics.ovh/suggest/${songName}`);
    let api= await fetching.json();
    songs(api.data);
    }
    catch(error){
        errorHandle(error);
    }
}

// Find Button Cick and call Api Function
document.getElementById('searchBtn').addEventListener('click', function(){
    songApi();
});

// Get Api data and Create Element for Song, Singer etc
let songs= (data)=>{
    const searchResult= document.getElementById('searchResult');
    searchResult.innerText='';
console.log(data);
    data.map(res => {
        const createElement= document.createElement('div');
        createElement.innerHTML= `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">Song Title: ${res.title}</h3>
                <p class="author lead">Artist: ${res.artist.name}</span></p>
                <img src=${res.album.cover} class="author lead"></span></img>
                <div class='mt-4'>
                <audio controls src="${res.preview}">
                </div>
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success">Get Lyrics</button>
                <a href="${res.preview}" download='test.mp3'>
                <input class="btn btn-warning" type="button" value="Download Now"></a>
            </div>
        </div>`;
        searchResult.appendChild(createElement);
    });
    
};

// Try-Catch Error Handle
const errorHandle= error=>{
    document.getElementById("searchResult").innerHTML= `
    <div class='text-center'>
    <h1 style=color:yellow >Can't Load Value, Try Again</h1>
    </div>` ;
};