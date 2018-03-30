const User = document.querySelector('#username');
const uiMessage = document.querySelector('#error');
const Left = document.querySelector('#L');
const Right = document.querySelector('#R');
const regex = /[^A-Za-z0-9]/;

function fetchData() {
 uiMessage.innerHTML ='<p>SEARCHING.... this may take a moment</p>';
 if (regex.exec(User.value)) {
   return uiMessage.innerHTML ='<p class="error">Please enter a valid student username.</p>';
 }
 fetch(`https://teamtreehouse.com/${User.value}.json`).then(function(response, err) {
     if (response.status !== 200 || !response) {
       uiMessage.innerHTML = '<p class="error">Sorry! There was no student profile found by that name.</p>';
     }
     response.json().then(function(data) {
       uiMessage.innerHTML ='<p class="error">Student Profile Found!</p>';
       let firstEarned = shortDateStr(data.badges[0].earned_date);
       let recentEarned = shortDateStr(data.badges[data.badges.length - 1].earned_date);
       data.badges.forEach(badge => Right.innerHTML += `<li><p>${badge.name} <img class="Icons" src="${badge.icon_url}" width="30"></p></li><hr>`);
        Left.innerHTML = `
        <div class="bord-3">
          <img src="${data.gravatar_url}" id="Avatar" width="250" alt="Treehouse Avatar">
          <h2 id="Username">${data.name}</h2>
          <p class="ctr">No. of badges:<b> ${data.badges.length} | ${data.points.total}</b> pts</p>
          <p><b>First Badge Earned</b>: ${firstEarned}</p>
          <p><b>Most Recent Badge Earned</b>: ${recentEarned}</p>
        </div>
       `;
       User.value = '';
     }).catch(function(err) {
       Err.innerHTML = '<p>Fetch parsing error: '+ err +'.</p>';
     });
   });
};

function shortDateStr(str){
  return str.substr(0, 10);
}
