//jshint esversion:6

let entries = [];
let random = [];
let number;
let max_num = 42;
let min_num = 1;
let max_num_count = 5;
const btn_gen = document.getElementById('gen-btn');
const btn_start = document.getElementById('start-btn');
const information = document.getElementById('info');
const counterField = document.getElementById('count_field');
const parent_input = document.getElementById('input-container');
const inputs = parent_input.children;

//===============================creating fields================================

// crerating number containers
const createDigits = () => {
    //creating input fields
    for (let i = 0; i < max_num_count; i++) {
        let parent = document.getElementById("input-container");

        let input = document.createElement("input");
        let input_att_1 = document.createAttribute("class");
        input_att_1.value = "input";
        let input_att_2 = document.createAttribute("type");
        input_att_2.value = "tel";

        input.setAttributeNode(input_att_1);
        input.setAttributeNode(input_att_2);

        parent.appendChild(input);
    }
    //creating random fields digits
    for (let i = 0; i < max_num_count; i++) {

        let parent = document.getElementById("random-container");

        let div = document.createElement("div");
        let div_att = document.createAttribute("class");
        div_att.value = "main_container_digit";
        div.setAttributeNode(div_att);

        let paragraph = document.createElement("p");
        let par_att = document.createAttribute("class");
        par_att.value = "number";
        paragraph.setAttributeNode(par_att);

        parent.appendChild(div);
        div.appendChild(paragraph);
    }
};

//================================randoms======================================

//generating  and returning a random number between 1 and 49
const randNumberGen = () => {
    number = Math.floor(Math.random() * (max_num - min_num + 1) + min_num);
    return number;
};

//returnirng an array of 5 random numbers between max and min
const randArrayGen = () => {
    random = [];
    for (let i = 0; i < max_num_count; i++) {
        //generating a new random number
        randNumberGen();
        //checking if the generated number is allredy in the array
        while (random.includes(number)) {
            randNumberGen();
        }
        //if the random number i uniqe push it to the array
        random.push(number);
    }
    //sorting the numbers in the array form smallest to bilargest
    random.sort((a, b) => {
        return a - b;
    });
};

//Clearing the content of the container with the random number
const clearRandom = () => {
    let paragrafContent = document.querySelectorAll('.number');
    paragrafContent.forEach((par) => {
        par.textContent = '';
    });
};

// adding random numbers from array to the random fields
const addRandoms = () => {
    let randPar = document.querySelectorAll('.number');
    for (let i = 0; random.length > i; i++) {
        randPar[i].textContent = random[i];
    }
};

//==================================inputs======================================

// creating the input containers that the user enetrs ther numbers
const inputFieldsValues = () => {
    entries = [];
    for (let i = 0; inputs.length > i; i++) {
        if (isNaN(parseInt(inputs[i].value)) ||
            parseInt(inputs[i].value) === '' ||
            parseInt(inputs[i].value) <= 0 ||
            parseInt(inputs[i].value) > max_num) {
            information.textContent = `Number not correct (forbiden: not a number,
                    empty , 0 ,greater than 42)`;
            return;
        } else {
            if (entries.includes(inputs[i].value) && entries.length > 0) {
                information.textContent = 'Number not unique';
                return;

            } else {
                entries.push(parseInt(inputs[i].value));
                entries.sort((a, b) => {
                    return a - b;
                });

                information.textContent = '';
            }
        }
    }
    return;
};

//================================Comparing=====================================

const comparing = () => {
    let count = 0;
    console.log(JSON.stringify(random));
    console.log(JSON.stringify(entries));

    if (random.length === entries.length) {
        while (JSON.stringify(random) !== JSON.stringify(entries)) {
            count++;
            console.log(count);
            randArrayGen();
        }
        information.textContent = 'You have won in ' + count + ' attemption';
    } else {
        information.textContent = `Number not correct (forbiden: not a number,
            empty , 0 ,greater than 42)`;
    }

};

//==================================DOM=========================================

document.addEventListener("DOMContentLoaded", function() {

    window.onload = () => {
        //creating digits
        createDigits();
    };
    //generating a random batch of numbers
    btn_gen.addEventListener("click", (event) => {
        //resting the random fields
        clearRandom();
        //genereting a new random array
        randArrayGen();
        //adding random numbers to fields
        addRandoms();
        //reading input values
        inputFieldsValues();
    });

    //checking for the resolution of the lottery
    //in witch drwa i will win
    btn_start.addEventListener("click", (event) => {
        //reading input values
        inputFieldsValues();
        //compering random and inputs
        comparing();
    });

});
