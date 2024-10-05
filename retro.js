const getLatestPost = async () =>{
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts'); 
    const data = await response.json();
    return showLatestPost(data);
}
const allPost = async (searchID='') =>{
  document.getElementById('allPost').innerHTML='';
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchID}`); 
    const data = await response.json();
    return showAllPost(data.posts);
}

const showLatestPost = (latestPost) =>{
    const latePost = document.getElementById('latestPost');
    latestPost.forEach(post => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card card-compact bg-base-100  shadow-xl';
        cardDiv.innerHTML=`
                <figure class="">
                    <img
                        src=${post.cover_image}
                        alt="Shoes" class="h-full w-full object-cover"/>
                </figure>
                <div class="card-body">
                <div class="flex gap-x-2">
                    <img src="images/date.png" alt="" class="size-5">
                    <p class="text-gray-700 text-sm font-semibold">${post.author.posted_date && post.author.posted_date.length > 0 ? post.author.posted_date : 'No Publish Date'}</p>
                </div>
                <h2 class="card-title font-bold ">${post.title}</h2>
                <p>${post.description}</p>
                <div class="flex gap-x-4">
                    <img src=${post.profile_image} alt=""  class="h-12 w-12 rounded-full object-cover shadow-lg">
                    <div>
                    <p class="text-lg font-bold">${post.author.name}</p>
                    <p>${post.author.designation && post.author.designation.length >0 ? post.author.designation: 'Unknown' }</p>
                    </div>
                </div>
                </div>
        `
        latePost.append(cardDiv);
    });
    
}

const showAllPost = (allPost) =>{
    const allPostContainer = document.getElementById('allPost');
    allPost.forEach(post => {
        const cardDiv = document.createElement('div');
        cardDiv.className = ' flex flex-col md:flex-row gap-4 bg-gray-100 p-8 rounded-3xl hover:border hover:border-blue-500 hover:bg-color-card';
        cardDiv.innerHTML=`
                <div class="w-1/12 ">
              <figure class="relative w-16">
                <img src="${post.isActive == true ? 'images/greendot.png' : 'images/reddot.png'}" alt="" class="absolute size-6 -top-2 -right-2">
                <img src=${post.image} alt="" class="h-16 w-16 object-cover shadow-lg rounded-lg bg-white border border-gray-300">
                
              </figure>
            </div>
            <div class="w-11/12">
              <div class="flex justify-between items-center font-semibold">
                <p class="font-medium text-lg text-gray-700">#${post.category}</p>
                <p class="font-medium text-lg text-gray-700">Author : ${post.author.name}</p>
              </div>
              <h1 class="text-2xl font-bold pt-3">${post.title}</h1>
              <p class="font-medium text-lg text-gray-500 py-3">${post.description}</p>
              <hr class="border border-gray-300">
              <div class="flex justify-between items-center py-4">
                <ul class="flex items-center gap-x-2">
                  <li class="flex items-center gap-x-2">
                    <img src="images/messge.png" alt="" class="size-6">
                    <p class="text-gray-500 text-sm font-semibold">${post.comment_count}</p>
                  </li>
                  <li class="flex items-center gap-x-2">
                    <img src="images/eye.png" alt="" class="size-6">
                    <p class="text-gray-500 text-sm font-semibold">${post.view_count}</p>
                  </li>
                  <li class="flex items-center gap-x-2">
                    <img src="images/time.png" alt="" class="size-6">
                    <p class="text-gray-500 text-sm font-semibold">${post.posted_time} Min</p>
                  </li>
                </ul>
                <button onclick="markPost('${post.title}','${post.view_count}')" class="bg-green-500 rounded-full p-2">
                  <img src="images/envelope.png" alt="" class="size-5 text-white">
                </button>
              </div>
            </div>
        `
        allPostContainer.append(cardDiv);
        
    });
    
}
document.getElementById('postSearch').addEventListener('click', () =>{
  const getValue =document.getElementById('searchValue').value;
  allPost(getValue);
});
const markPost = (title, viewCount) => {
  const markedPostContainer =  document.getElementById('markedPost');
  const markedPostCard = document.createElement('div');
  markedPostCard.classList =  'flex flex-col md:flex-row justify-between items-center gap-x-4 bg-white rounded-3xl p-4 my-3';
  markedPostCard.innerHTML = `
    <h1 class="text-xl font-bold pt-3 text-gray-700">${title}</h1>
    <div class="flex items-center gap-x-2">
      <img src="images/eye.png" alt="" class="size-6">
      <p class="text-gray-500 text-sm font-semibold">${viewCount}</p>
    </div>
  `
  markedPostContainer.appendChild(markedPostCard);
  totalMarked();
}

const totalMarked = () => {
  const markedPost = document.getElementById('markedCount').innerText;
  convertedMarkedPost =  parseInt(markedPost);
  const sum =  convertedMarkedPost  + 1;
  document.getElementById('markedCount').innerText= sum;



}
getLatestPost();
allPost();

