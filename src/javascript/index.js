console.log('hello  饥人谷sss')
import './icons.js'
import Swiper from './swiper.js'


class Player {
  constructor(node) {
    this.root = typeof node === 'string' ? document.querySelector(node) : node
    this.$ = selector => this.root.querySelector(selector)
    this.$$ = selector => this.root.querySelectorAll(selector)
    this.songList = []
    this.currentIndex = 0
    this.audio = new Audio()
    this.lyricsArr = []
    this.lyricIndex = -1

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
        this.loadLyric()
        //this.playSong()
      })
  }

  bind() {
    let self = this
    this.$('.btn-play-pause').onclick = function() {
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

    this.$('.btn-pre').onclick = function() {
      console.log('pre')
      self.playPrevSong()
    }

    this.$('.btn-next').onclick = function() {
      self.playNextSong()
    }

    this.audio.ontimeupdate = function() {
      self.locateLyric(this.currentTime)
    }

    let swiper = new Swiper(this.$('.panels'))
    swiper.on('swipLeft', function(){
      this.classList.remove('panel1')
      this.classList.add('panel2')
      console.log('left')
    })

    swiper.on('swipRight', function(){
      this.classList.remove('panel2')
      this.classList.add('panel1')
      console.log('right')
    })
  }

  playSong() {
    this.audio.src = this.songList[this.currentIndex].url
    this.audio.oncanplaythrough = () => this.audio.play()
    this.loadLyric()
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

  loadLyric() {
    fetch(this.songList[this.currentIndex].lyric)
      .then(res => res.json())
      .then(data => {
        console.log(data.lrc.lyric)
        this.setLyrics(data.lrc.lyric)
        window.lyrics = data.lrc.lyric
      })
  }

  formatTime(currentTime) {
    let totalSeconds = parseInt(currentTime)
    let milliseconds = currentTime - totalSeconds
    let millisecondsStr = milliseconds.toFixed(3).substr(1)
    let minutes = parseInt(totalSeconds/60)
    let minutesStr = minutes > 10 ?  '' + minutes : '0' + minutes
    let seconds = totalSeconds%60
    let secondsStr = seconds > 10 ? '' + seconds : '0' + seconds
    return minutesStr + ':' + secondsStr + millisecondsStr
  }

  locateLyric(currentTime) {
    let formatedTime = this.formatTime(currentTime)
    let nextLineTime = this.lyricsArr[this.lyricIndex+1][0]
    if(formatedTime > nextLineTime) {
      this.lyricIndex++
      let node = this.$('[data-time="'+this.lyricsArr[this.lyricIndex][0]+'"]')
      this.setLyricToCenter(node)

      this.$$('.panel-effect .lyric p')[0].innerText = this.lyricsArr[this.lyricIndex][1]
      this.$$('.panel-effect .lyric p')[1].innerText = this.lyricsArr[this.lyricIndex+1][1]
      console.log(node)
    }

    console.log(formatedTime)
  }

  setLyrics(lyrics) {
    let fragment = document.createDocumentFragment()
    this.lyricsArr = lyrics.split(/\n/)
      .filter(str => str.match(/\[.+?\]/))
      .map(line => [ 
        line.match(/\[.+?\]/)[0].replace(/[\[\]]/g,''), 
        line.replace(/\[.+?\]/, '')
      ])

      this.lyricsArr.forEach(line => {
        let node = document.createElement('p')
        node.setAttribute('data-time', line[0])
        node.innerText = line[1]
        fragment.appendChild(node)
      })
      this.$('.panel-lyrics .container').appendChild(fragment)
  }

  setLyricToCenter(node) {
    console.log(node)
    let translateY = node.offsetTop - this.$('.panel-lyrics').offsetHeight / 2
    translateY = translateY > 0 ? translateY : 0
    this.$('.panel-lyrics .container').style.transform = `translateY(-${translateY}px)`
    this.$$('.panel-lyrics p').forEach(node => node.classList.remove('current'))
    node.classList.add('current')
  }

}


window.p = new Player('#player')

