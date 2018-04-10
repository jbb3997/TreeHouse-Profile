

const sectionOne = document.querySelector('#section-one');

const sectionTwo = document.querySelector('#section-two');


const profileXhr = new XMLHttpRequest;


profileXhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const profileInfo = JSON.parse(this.responseText);
    const name = profileInfo.name;
    const gravatar = profileInfo.gravatar_url;
    const profileUrl = profileInfo.profile_url;
    const points = profileInfo.points
    const badges = profileInfo.badges;

    sectionOne.innerHTML = `
      <img src='${gravatar}'>
      <h1>${name}</h1>
    `;

    const colThree = document.createElement('div');
    colThree.classList.add('col-three', 'points-div');
    sectionOne.appendChild(colThree);

    const languagesPoints = [points.HTML, points.CSS, points.JavaScript];
    const languages = ['HTML', 'CSS', 'JavaScript'];

    for (let i = 0; i < 3; i++) {
      let pointsBoxes = document.createElement('div');
      pointsBoxes.classList.add('points-boxes');
      colThree.appendChild(pointsBoxes);

      pointsBoxes.innerHTML = `<span class='languages-points'>${languagesPoints[i]}</span><p>${languages[i]}</p>`;
    }

    let seeMore = document.createElement('button');
    seeMore.classList.add('see-more');
    seeMore.textContent = 'See More';

    const colThreeTwo = document.createElement('div');
    colThreeTwo.classList.add('col-three');
    sectionTwo.appendChild(colThreeTwo);


    for (let i = 0; i < badges.length; i++) {
      let badgesBoxes = document.createElement('div');
      badgesBoxes.classList.add('badges-boxes');
      badgesBoxes.innerHTML = `
        <a href='${profileUrl}' target='_blank'>
          <img src='${badges[i].icon_url}'>
          <h3>${badges[i].name}</h3>
        </a>
      `;

      let coursesTitle = document.createElement('p');

      if (i > 0) {
        coursesTitle.innerHTML = `<a href='${profileUrl}' target='_blank'>${badges[i].courses[0].title}, ${badges[i].courses[1].title}</a>`;
        badgesBoxes.appendChild(coursesTitle);
      }

      if (i > 5) {
        badgesBoxes.style.display = 'none';
      }
      colThreeTwo.appendChild(badgesBoxes);


      seeMore.addEventListener('click', function () {
        this.style.display = 'none';
        let badgesBoxesDiv = document.querySelectorAll('.badges-boxes');
        badgesBoxesDiv[i].style.display = 'block';
      });

    }

    sectionTwo.appendChild(seeMore);

    

  }
}

profileXhr.open('GET', 'https://teamtreehouse.com/johnbastianbolhano.json', true);

profileXhr.send();