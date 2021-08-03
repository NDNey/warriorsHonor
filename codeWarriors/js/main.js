// ranktable data
const rankTable = {
  '8 kyu': 0,
  '7 kyu': 20,
  '6 kyu': 76,
  '5 kyu': 229,
  '4 kyu': 643,
  '3 kyu': 1768,
  '2 kyu': 4829,
  '1 kyu': 13147,
  '1 dan': 35759,
  '2 dan': 97225
}
// progres table data
const progressRankTable = {
  '7 kyu': 20,
  '6 kyu': 30,
  '5 kyu': 45,
  '4 kyu': 70,
  '3 kyu': 100,
  '2 kyu': 150,
  '1 kyu': 225,
  '1 dan': 450,
  '2 dan': 900,
  '3 dan': 1800,
  '4 dan': 3600,
}
// scoreAwarded points for kata
const scoreAwarded = [2, 3, 8, 21, 55, 149, 404, 1097]

// New warrior button and reloader
document.getElementById('reload').addEventListener('click', reload => location.reload()
)
// event for fetching and calling main function 
document.getElementById('button').addEventListener('click', getPicture)

// mainfunction / fetching
function getPicture() {
  //  hidden and showing elements when the function is call

  document.querySelector('input').classList.add("hidden")
  document.querySelector('h1').classList.add("hidden")
  document.getElementById('button').classList.add("hidden")
  document.querySelector('button').classList.remove('hidden')
  document.getElementById('reload').classList.remove("hidden")


  // input value and Url to search
  const inputVal = document.querySelector('input').value
  const url = 'https://www.codewars.com/api/v1/users/' + inputVal

  // fetching and playing with the data
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      const lengua = data.ranks.languages //lenguages that user has code in.
      const honor = data.honor     //user's honor
      const warriorName = data.username
      const katasCompleted = data.codeChallenges.totalCompleted
      const totalRank = data.ranks.overall.score  //user's rank score
      const rank = data.ranks.overall.name  // rank name ex: 4kyu
      const nextRank = (Number(rank[0]) - 1).toString() + rank.slice(1) // next rank ex; 3yu
      const rankDiference = rankTable[nextRank] - totalRank // the diference to get to next rank

      // changing inertext with user's data
      document.getElementById('warriorName').innerText = `Welcome ${warriorName}`
      document.getElementById('usersMesage').innerHTML = `Congratulations, you are a strong warrior! You have completed <strong>${katasCompleted}</strong> katas and have gained so much knowledge in your quest. Reflect on how much you have learned from starting at kata <strong>0</strong> to your possition now at kata <strong>${katasCompleted}</strong>. As the saying goes, you make your code better one challenge at a time. Take a moment to see your progress below and create new goals for your coding journey.`
      document.getElementById('honor').innerText = honor
      document.getElementById('rank').innerText = totalRank
      document.getElementById('next').innerText = rankTable[nextRank]
      document.getElementById('plusHonor').innerText = `+${progressRankTable[nextRank]} Honor pts when reach ${nextRank}`

      // pasing the data as parameters to call functions.
      scores(lengua)
      howManyOf(rankDiference)
      grafic(totalRank, rankTable[nextRank], rank, Number(rank[0]))

    })
    // catching herrors
    .catch(err => {
      console.log(`error ${err}`)
      alert('Provide a valid warrior Name')
      location.reload()

    })
}
// How many kyu do I need for the next rank function
function howManyOf(rankDiference) {

  let result = scoreAwarded.map(e => Math.ceil(rankDiference / e)) //getting the amound of kyu needed
  // making the list of kyu needed to reach the next level
  for (let i = 0; i < result.length; i++) {
    let kyuList = document.createElement("li"); //creating single li
    kyuList.className = "howMany"  //giving every list a class to identifi that set of li
    kyuList.innerHTML = `<small>${result[i]}</small> ${8 - i} KYU To Reach next level` //innerHtml to stile the numbers difernt than the text.
    document.getElementById("nextLevel").appendChild(kyuList);
  }

  // styling the list height
  let listStyle = document.querySelectorAll('.howMany')
  Array.from(listStyle).forEach(li => li.style.height = `3em`)
  // Showing the information 
  document.getElementById('info').classList.remove("hidden")
}


// Rank score on each trained lenguage function.
function scores(s) {
  let count = 0 //counting trained lenguages
  for (l in s) {
    count++
    let scori = s[l].score  //score number
    // creating list of train lenguages.
    let li = document.createElement("li");
    li.innerText = l;
    document.getElementById("honorList").appendChild(li);
    // creating list of scores per lenguage
    if (scori >= 0) {
      let la = document.createElement("li");
      let text2 = document.createTextNode(scori)
      la.appendChild(text2);
      document.getElementById("rankScore").appendChild(la);
    }

  }
  // styling score list 
  let styleScore = document.querySelectorAll('li')
  Array.from(styleScore).forEach(lista => lista.style.height = `${24 / count}em`)

}

// grafic function rank porcentage and colors.
function grafic(currentKyu, nextKyu, kyu, color) {

  // picking color by KYU 
  let kyuColor = color >= 7 ? 'rgb(230,230,230)'
    : color >= 5
      ? 'rgb(236,182,26)'
      : color >= 3
        ? 'rgb(60,126,187)' : 'rgb(134,108,199)'
  document.getElementById('standard').style.background = `${kyuColor}` //Ranktablecolor

  let porcentage = Math.round((currentKyu * 100) / nextKyu) //getting porcentage.

  // grafic innerText
  document.getElementById('kyuGraf').innerHTML = `${kyu}<br><span>${porcentage}%</span>`;

  // first half of the circle
  if (porcentage <= 50) {
    document.getElementById('firstHalf').style.transform = `rotate(${(porcentage / 100) * 360}deg)`
    document.getElementById('firstHalf').style.background = `${kyuColor}`

  } else { //second half
    document.getElementById('firstHalf').style.transform = `rotate(180deg)`;
    document.getElementById('firstHalf').style.background = `${kyuColor}`
    document.getElementById('secondHalf').style.transform = `rotate(${((porcentage - 50) / 100) * 360}deg)`;
    document.getElementById('secondHalf').style.background = `${kyuColor}`
  }

}

// calculator event listeners and function
const inputNumber = document.getElementById('number');
document.getElementById("validate").addEventListener("click", honorCalc)

function honorCalc() {
  document.getElementById('wholeCalc').classList.remove('hidden') //show result

  let ul = document.getElementById("kyuCalculator")
  let lo = document.querySelectorAll('.honorClass')
  Array.from(lo).forEach(lista => lista.remove())
  //  condition to not make more than 4 li
  while (ul.childNodes.length <= 4) {
    for (let i = 4; i >= 1; i--) {

      let kyuCalc = document.createElement("li");
      kyuCalc.className = "honorClass" //adding class to lis

      // calculating
      let honorKata = i >= 4 ? Math.ceil(inputNumber.value / 2)
        : i >= 3
          ? Math.ceil(inputNumber.value / 8)
          : i >= 2
            ? Math.ceil(inputNumber.value / 32) : Math.ceil(inputNumber.value / 128
            )
      kyuCalc.innerText = `[${honorKata}] ${i * 2} KYU - ${(i * 2) - 1} KYU To reach your goal`
      document.getElementById("kyuCalculator").appendChild(kyuCalc);
      document.getElementById('honorGoal').innerText = `${inputNumber.value} Honor pts`
    }
  }

}
//////////////////////////////////////////////////
// MODALJS calculator display
/////////////////////////////////////////////////////
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}