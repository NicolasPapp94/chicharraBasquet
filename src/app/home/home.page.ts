import { Component } from '@angular/core';
import * as moment from 'moment';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lapso = 4;
  horaInicio;
  horaActual;
  horaDeFin;
  tiempoRestante;
  intervalo;
  intervaloIniciado = false;
  private audioPlayer: HTMLAudioElement = new Audio();

  constructor(private nativeAudio: NativeAudio) {

  }


  ngOnInit(){
   
    
  }

  crearIntervalo(){
    // this.nativeAudio.preloadSimple('Chicharra', 'assets/chicharra.mp3').then(()=>{
    //     console.log("Cargado con exito");
    //     this.nativeAudio.play('Chicharra').then(()=>{
    //       console.log("Reproducido con exito");
          
    //     },(err)=>{
    //       console.log("Error al reproducir",err);
    //     });
    // }, (err) =>{
    //     console.log("Problema",err);
    // });
    this.intervaloIniciado = !this.intervaloIniciado;
    this.horaDeFin = moment().add(this.lapso,'m');
    this.intervalo = setInterval(()=>{
      this.horaActual = moment();

      let tiempoRestanteEnMS= this.horaDeFin.diff(this.horaActual);
      var d = moment.duration(tiempoRestanteEnMS).add(1,'s');
      this.tiempoRestante = `${d.minutes()}:${d.seconds()}`;

      if (this.horaActual.format("HH:mm:ss") == this.horaDeFin.format("HH:mm:ss")){
        this.audioPlayer.src = "assets/chicharra.mp3";
        this.audioPlayer.play();
        clearInterval(this.intervalo);
        this.intervaloIniciado = !this.intervaloIniciado;
      }
    },1000)
  }

  stop(){
    clearInterval(this.intervalo);
    this.intervaloIniciado = !this.intervaloIniciado;
  }

}
