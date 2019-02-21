console.log('hello  饥人谷sss')
import './icons.js'


const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

class Player {
  constructor(node) {
    this.root = typeof node === 'string' ? $(node) : node
    this.songList = []
    this.currentIndex = 0
    this.audio = new Audio()
    this.start()
    this.bind()
    //https://jirengu.github.io/data-mock/huawei-music/music-list.json

  }
  start() {
    fetch('https://jirengu.github.io/data-mock/huawei-music/music-list.json')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.songList = data
        this.audio.src = this.songList[this.currentIndex].url
      })
  }

  bind() {
    let self = this
    this.root.querySelector('.btn-play-pause').onclick = function() {
      if(this.classList.contains('playing')) {
        self.audio.pause()
        this.classList.remove('playing')
        this.classList.add('pause')
        this.querySelector('use').setAttribute('xlink:href', '#icon-play')
      } else if(this.classList.contains('pause')) {
        self.audio.play()
        this.classList.remove('pause')
        this.classList.add('playing')
        this.querySelector('use').setAttribute('xlink:href', '#icon-pause')
      }
    }

    this.root.querySelector('.btn-pre').onclick = function() {
      console.log('pre')
      self.playPrevSong()
      
    }
    this.root.querySelector('.btn-next').onclick = function() {
      self.playNextSong()
    }
  }

  playPrevSong() {
    this.currentIndex = (this.songList.length + this.currentIndex - 1) % this.songList.length
    this.audio.src = this.songList[this.currentIndex].url
    this.audio.oncanplaythrough = () => this.audio.play()

    
  }

  playNextSong() {
    this.currentIndex = (this.songList.length + this.currentIndex + 1) % this.songList.length
    this.audio.src = this.songList[this.currentIndex].url
    this.audio.oncanplaythrough = () => this.audio.play()
  }

}


new Player('#player')

