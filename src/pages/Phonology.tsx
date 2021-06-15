import models from './models.json'
import styled from 'styled-components';
import {useState} from 'react';
import Generic from './Generic';
import {Tensor, InferenceSession} from "onnxjs";

// Globals
var was_init = false;
var audioCtx;
var analyser;
var microphone;
var FSAMP;
var session = null;
var proc_loop = null;
var pred_set = null;
var prob_set = null;
var model_idx = 0;

// implement linear interpolation to get 200 dim vect
function downsize(arr, dim) {
  var out = new Float32Array(dim);
  for (var i=0; i < dim; i++) {
      var ind = arr.length * (i / dim);
      var bot = Math.floor(ind);
      var top = Math.ceil(ind);
      var dif = arr[top] - arr[bot];
      var val = arr[bot] + dif*(ind-bot);
      out[i] = val;
  }
  return out;
}

// return argmax of arr
function arg_max(arr) {
  var x = -1;
  var top = -1;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > top) {
        top = arr[i];
        x = i;
    }
  }
  return x;
}

async function init() {
  navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream){
      var win = window as any;
      var AudioContext = win.AudioContext || win.webkitAudioContext;
      audioCtx = new AudioContext();
      microphone = audioCtx.createMediaStreamSource(stream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048*2;
      microphone.connect(analyser);
      FSAMP = audioCtx.sampleRate;
      load_model(model_idx);
  }).catch(function(error){
    alert("init error");
    alert(error)
  });
}

function load_model(idx) {
  var model_name = models[idx].model_name;
  console.log(model_name)
  if (proc_loop !== null) {
    clearInterval(proc_loop);
  }
  session = new InferenceSession()
  session.loadModel('models/' + model_name).then(()=>{
    console.log("model loaded");
    proc_loop = setInterval(process, 200);
  })
}

const process = () => {

  //get fft
  var raw = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(raw);
  var vol = Math.max(...raw)

  if (vol < 200) {
      pred_set(-1);
      prob_set([2,2,2]);
  } else {

    //nomalize fft data
    var f_step = (FSAMP / 2.0) / raw.length;
    var max_ind = Math.floor(5000.0/f_step);
    var data = new Float32Array(raw.slice(0, max_ind));
    var d_min = Math.min(...data);
    for (var i=0; i<data.length; i++) {
        data[i] = data[i] - d_min;
    }
    var d_max = Math.max(...data);
    for (var j=0; j<data.length; j++) {
        data[j] = data[j] / d_max;
    }
    //resample fft data
    var vector = downsize(data, 300);

    //input vector to model
    var input = new Tensor(vector, "float32", [1, 300]);
    session.run([input]).then((output_map) => {
      var output_tensor = output_map.values().next().value;
      var predictions = output_tensor.data;
      var x = arg_max(predictions);
      console.log(x);
      prob_set(predictions);
      pred_set(x);
})}}

var Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 2%;`

var Graph = styled.div`
  height: 400px;
  width: 400px;
  border-radius: 8px;
  max-width: 95%;
  background-color:gray;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.6);`

var Labels = styled.div`
  width: 100%
  height: 20px;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: lightgray;`

var Label = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;`

var Bars = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;`

var Bar = styled.div`
  width: 30%;
  background-color: #e38100;
  transition: height 0.1s ease;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;`
  
const Dropdown = styled.select`
  background-color: white;
  text-align-last:center;
  width: 110px;
  height: 25px;
  border-radius: 8px;
  border: solid gray 1px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);`

const Phonology = () => {

  //state vars
  var [pred, set_pred] = useState(-1);
  var [prob, set_prob] = useState([2,2,2]);

  //initial loading
  if (!was_init) {
    pred_set = set_pred
    prob_set = set_prob
    init();
    was_init = true;
  }

  //render probabilities
  var heights = [2,2,2];
  if (pred !== -1) {
    heights = prob;
    var base = 1.35
    var sum = Math.pow(base, prob[0]) + Math.pow(base, prob[1]) + Math.pow(base, prob[2]) //softmax
    for (var i in [0,1,2]) {
      heights[i] = 100 * Math.pow(base, prob[i]) / sum;
    }
  }

  //on_select change handler
  const sel_change = () => {
    var dropdown = document.getElementById("drop") as HTMLSelectElement;
    var idx = dropdown.selectedIndex;
    model_idx = idx;
    load_model(idx);
  }

  return (
    <Generic>
      <Container>
      <br/>
      <Dropdown onChange={sel_change} id="drop">
        <option>FEET-FIT</option>
        <option>LOOK-LUCK</option>
        <option>SAT-SET</option>
        <option>SET-SIT</option>
        <option>NOT-NUT</option>
        <option>FULL-FOOL</option>
      </Dropdown>
      <br/>
      <div>Test your pronunciation: <strong>{models[model_idx].desc}</strong></div>
      <br/>
      <Graph>
        <Bars>
          <Bar id={0} style={{height:heights[0]+'%'}}/>
          <Bar id={1} style={{height:heights[1]+'%'}}/>
          <Bar id={2} style={{height:heights[2]+'%'}}/>
        </Bars>
        <Labels>
          <Label>{models[model_idx]['0']}</Label>
          <Label>{models[model_idx]['1']}</Label>
          <Label>Other</Label>
        </Labels>
      </Graph>
    </Container>
    </Generic>
  );
}

export default Phonology;