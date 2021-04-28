import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import Generic from './Generic';
import {Tensor, InferenceSession} from "onnxjs";

// Globals
var audioCtx;
var analyser;
var microphone;
var FSAMP;

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

//initalize model and audio context
const session = new InferenceSession();
var was_init = false;
async function init() {
  await session.loadModel("models/i_ih.onnx");
  console.log("model loaded");
  if (navigator.mediaDevices) {
    console.log('getUserMedia supported.');
    navigator.getUserMedia({audio: true}, function(stream){ //prompts user
        audioCtx = new AudioContext();
        microphone = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048*2;
        microphone.connect(analyser);
        FSAMP = audioCtx.sampleRate;
        process();
    }, function(){console.log('error')})};
}

var pred_set = null;
var prob_set = null;
function process(){
  setInterval(async function(){

  //get fft
  var raw = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(raw);
  var vol = Math.max(...raw)
  if (vol < 200) {
      pred_set('-');
      prob_set([1,1]);
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
    for (var i=0; i<data.length; i++) {
        data[i] = data[i] / d_max;
    }
    //resample fft data
    var vector = downsize(data, 300);

    //input vector to model
    var input = new Tensor(vector, "float32", [1, 300]);
    var outputMap = await session.run([input]);
    var outputTensor = outputMap.values().next().value;
    var predictions = outputTensor.data;
    var x = arg_max(predictions);
    prob_set(predictions);
    if (x==0) {
        pred_set("ee");
    } else {
        pred_set('ih');
    }
  }},200);
}

var Graph = styled.div`
  height: 400px;
  width: 300px;
  background-color:gray;
  display: flex;
  flex-direction: column;
  border: 1px solid black;`

var Labels = styled.div`
  width: 100%
  height: 20px;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: lightgray;`

var Bars = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;`

var Bar = styled.div`
  width: 45%;
  height: ${(props) => props.height}%;
  background-color: #e38100;`

const Phonology = () => {
  var [pred, set_pred] = useState("-");
  var [prob, set_prob] = useState([1,1]);
  //initial loading
  if (!was_init) {
    pred_set = set_pred
    prob_set = set_prob
    init();
    was_init = true;
  }
  var heights = [2,2];
  if (pred != "-") {
    heights = prob;
    var base = 1.35
    var sum = Math.pow(base, prob[0]) + Math.pow(base, prob[1])
    heights[0] = 100 * Math.pow(base, prob[0]) / sum;
    heights[1] = 100 * Math.pow(base, prob[1]) / sum;
  }
  return (
    <Generic>
      <br/>
      <br/>
      <br/>
      <div>Test your pronunciation: <strong>ee vs. ih</strong></div>
      <br/>
      <Graph>
        <Bars>
          <Bar height={heights[0]}/>
          <Bar height={heights[1]}/>
        </Bars>
        <Labels>
          <div>ee</div>
          <div>ih</div>
        </Labels>
      </Graph>
    </Generic>
  );
}

export default Phonology;