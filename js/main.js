//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', start)
document.getElementById('check').addEventListener('click', checkAnswer)

let url
let count = 0
let finished = 0

function start(){
  let opperator = document.getElementsByName('opp')
  for(i = 0; i < opperator.length; i++) {
    if(opperator[i].checked) {
      if (i === 3) {
        url = `https://x-math.herokuapp.com/api/${opperator[i].value}?maxFirst=144&minFirst=1`
      } else {
        url = `https://x-math.herokuapp.com/api/${opperator[i].value}?max=12&min=0`
      }
      
      if (i === 0) {
        document.querySelector('body').style.backgroundImage="url(img/lizard.jpg)"
      } else if (i === 1) {
        document.querySelector('body').style.backgroundImage="url(img/kitty.jpg)"
      } else if (i === 2) {
        document.querySelector('body').style.backgroundImage="url(img/husky.jpg)"
      } else if (i === 3) {
        document.querySelector('body').style.backgroundImage="url(img/eagle.jpg)"
      }
    }
  }
  finished = 0
  count = document.getElementById('numProbs').value
  
  if (count === '') {
    alert('enter and amount of facts to practice')
  } else {
    document.querySelector('h6').innerText = `${finished} / ${document.getElementById('numProbs').value}`
  
    //toggle elements on
    document.querySelector('h5').classList.add('hidden')
    document.getElementById('check').classList.remove('hidden')
    document.getElementById('answer').classList.remove('hidden')
    
    getAnother(url)
  }
  
  
}

function getAnother(url) {
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        answer = data.answer
        if (data.operation === '/') {
          if (answer > 12 || data.second > 12) {
            getAnother(url)
          } else {
            document.querySelector('h2').innerText = data.expression + ' ='
          }
        } else {
          document.querySelector('h2').innerText = data.expression + ' ='
        }
      
        //clear info
        nextProb()
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function nextProb() {
  //clear out text
  document.querySelector('h4').innerText = ''
  //focus cursor on answer box
  document.getElementById('answer').focus()
}

function checkAnswer () {
  if (answer === Number(document.getElementById('answer').value)) {
    document.querySelector('h4').innerText = 'correct!'
    document.getElementById('answer').value = ''
    count--
    finished++
    document.querySelector('h6').innerText = `${finished} / ${document.getElementById('numProbs').value}`
    console.log(count)
    if (count > 0) {
      getAnother(url)
    } else {
      document.querySelector('h5').classList.remove('hidden')
      document.querySelector('h4').innerText = ''
      document.getElementById('expression').innerText = ''
      document.getElementById('check').classList.add('hidden')
      document.getElementById('answer').classList.add('hidden')
      document.getElementById('numProbs').value = ''
    }
  } else {
    document.querySelector('h4').innerText = 'incorrect! try again'
    document.getElementById('answer').value = ''
    document.getElementById('answer').focus()
  }
  
}



