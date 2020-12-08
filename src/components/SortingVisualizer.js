import React, { Component } from 'react';
import './SortingVisualizer.css';
import * as sortingAlgos from '../algos/sortingAlgos.js'

// animation speed in ms
const ANIMATION_SPEED = 10;

// bar colors 
const PRIMARY_COLOR = 'blue';
const SECONDARY_COLOR = 'red';

// bar heights in pixels
const LOWER_BOUND = 10;
const UPPER_BOUND = 750;
const NUM_OF_BARS = 100;

class SortingVisualizer extends Component {
   constructor(props) {
       super(props);

       this.state = {
           array: []
       };
   }

   // when component mounts, reset the array
   componentDidMount() {
       this.resetArray();
   }

   // Method used to re-initialize a random array
   resetArray = () => {
       const array = [];
       for (let i = 0; i < NUM_OF_BARS; i++) {
           array.push(this.randomIntFromInterval(LOWER_BOUND, UPPER_BOUND));
       }
       // test array for debugging
       // const array = [100,20,30,70,10,80,60,55];
       this.setState({array: array});
   }

   // MergeSort method
   mergeSort = () => {
       
       const currentArray = [...this.state.array];
       const results = sortingAlgos.mergeSort(currentArray);
       const animations = results.animations;

       // go through animations and perform them
       for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            // animation logic: all members of animations array are triplets.
            // i mod 3 ==  0 => select them
            // i mod 3 == 1 => unselect them
            // i mod 3 == 2 => overwrite index as new height
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [firstBarIndex, secondBarIndex] = animations[i];
                const firstBarStyle = arrayBars[firstBarIndex].style;
                const secondBarStyle = arrayBars[secondBarIndex].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    firstBarStyle.backgroundColor = color;
                    secondBarStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } else {
                setTimeout(() => {
                    const [firstBarIndex, newHeight] = animations[i];
                    const firstBarStyle = arrayBars[firstBarIndex].style;
                    firstBarStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }
       }
   }

   // get integer from random provided interval
   randomIntFromInterval = (start, end) => {
       return Math.floor(Math.random() * (end - start) + start);
   }

   render() {
       const array = [...this.state.array];
        return (
            <div className="array-container">
                {array.map((value, index) => (
                    <div 
                        className="array-bar" 
                        key={index}
                        style={{height: `${value}px`}}
                    >
                    </div>
                ))}
                <br></br>
                <button onClick={this.resetArray}>Reset The Array!</button>
                <button onClick={this.mergeSort}>Merge Sort</button>  
            </div>
        );
   }
}

export default SortingVisualizer;
