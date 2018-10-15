// WITH CALLBACKS and AJAX:

// function processForm(evt) {
//   evt.preventDefault();
//   $('#num_facts_container').text('');
//   let num1 = $('#favorite_num1').val();
//   let num2 = $('#favorite_num2').val();
//   let num3 = $('#favorite_num3').val();
//   let num4 = $('#favorite_num4').val();
//   let realFavNum = $('#real_favorite_num').val();

//   $.get(`http://numbersapi.com/${num1}/trivia`, function(resp) {
//     let num_fact1 = resp;
//     $('#num_facts_container').append(num_fact1);
//   });

//   $.get(`http://numbersapi.com/${num2}/trivia`, function(resp) {
//     let num_fact2 = resp;
//     $('#num_facts_container').append(num_fact2);
//   });

//   $.get(`http://numbersapi.com/${num3}/trivia`, function(resp) {
//     let num_fact3 = resp;
//     $('#num_facts_container').append(num_fact3);
//   });

//   $.get(`http://numbersapi.com/${num4}/trivia`, function(resp) {
//     let num_fact4 = resp;
//     $('#num_facts_container').append(num_fact4);
//   });

//   $.get(`http://numbersapi.com/${realFavNum}/trivia`, function(resp) {
//     let real_num_fact1 = resp;
//     $.get(`http://numbersapi.com/${realFavNum}/trivia`, function(resp) {
//       let real_num_fact2 = resp;
//       $.get(`http://numbersapi.com/${realFavNum}/trivia`, function(resp) {
//         let real_num_fact3 = resp;
//         $.get(`http://numbersapi.com/${realFavNum}/trivia`, function(resp) {
//           let real_num_fact4 = resp;
//           $('#num_facts_container').append(
//             `<br> Four facts about your REAL favorite number: <br>`
//           );
//           $('#num_facts_container').append(real_num_fact1);
//           $('#num_facts_container').append(real_num_fact2);
//           $('#num_facts_container').append(real_num_fact3);
//           $('#num_facts_container').append(real_num_fact4);
//         });
//       });
//     });
//   });
// }

// $(document).ready(function() {
//   $('#favorite_numbers').on('submit', processForm);
// });

// WITH PROMISES

// function processForm(evt) {
//   evt.preventDefault();
//   $('#num_facts_container').text('');
//   let num1 = $('#favorite_num1').val();
//   let num2 = $('#favorite_num2').val();
//   let num3 = $('#favorite_num3').val();
//   let num4 = $('#favorite_num4').val();
//   let realFavNum = $('#real_favorite_num').val();

//   $.get(`http://numbersapi.com/${num1}/trivia`)
//     .then(fact => $('#num_facts_container').append(fact))
//     .catch(error => console.log(error));
//   $.get(`http://numbersapi.com/${num2}/trivia`)
//     .then(fact => $('#num_facts_container').append(fact))
//     .catch(error => console.log(error));
//   $.get(`http://numbersapi.com/${num3}/trivia`)
//     .then(fact => $('#num_facts_container').append(fact))
//     .catch(error => console.log(error));
//   $.get(`http://numbersapi.com/${num4}/trivia`)
//     .then(fact => $('#num_facts_container').append(fact))
//     .catch(error => console.log(error));

//   let fourNumPromises = [];

//   for (let i = 0; i < 4; i++) {
//     fourNumPromises.push($.get(`http://numbersapi.com/${realFavNum}/trivia`));
//   }

//   Promise.all(fourNumPromises)
//     .then(fact => {
//       console.log(fact);
//       $('#num_facts_container').append(fact);
//     })
//     .catch(error => console.log(error));
// }

// $(document).ready(function() {
//   $('#favorite_numbers').on('submit', processForm);
// });

// WITH AYSNC and AWAIT

async function processForm(evt) {
  evt.preventDefault();
  $('#num_facts_container').text('');
  let num1 = $('#favorite_num1').val();
  let num2 = $('#favorite_num2').val();
  let num3 = $('#favorite_num3').val();
  let num4 = $('#favorite_num4').val();
  let realFavNum = $('#real_favorite_num').val();

  try {
    let numFact1 = await $.get(`http://numbersapi.com/${num1}/trivia`);
    let numFact2 = await $.get(`http://numbersapi.com/${num2}/trivia`);
    let numFact3 = await $.get(`http://numbersapi.com/${num3}/trivia`);
    let numFact4 = await $.get(`http://numbersapi.com/${num4}/trivia`);
    $('#num_facts_container').append(numFact1);
    $('#num_facts_container').append(numFact2);
    $('#num_facts_container').append(numFact3);
    $('#num_facts_container').append(numFact4);
  } catch (e) {
    console.log(e);
  }

  (async function getFourNumFacts() {
    let numFacts = await Promise.all([
      $.get(`http://numbersapi.com/${realFavNum}/trivia`),
      $.get(`http://numbersapi.com/${realFavNum}/trivia`),
      $.get(`http://numbersapi.com/${realFavNum}/trivia`),
      $.get(`http://numbersapi.com/${realFavNum}/trivia`)
    ]);

    $('#num_facts_container').append(numFacts[0]);
    $('#num_facts_container').append(numFacts[1]);
    $('#num_facts_container').append(numFacts[2]);
    $('#num_facts_container').append(numFacts[3]);
  })();
}

$(document).ready(function() {
  $('#favorite_numbers').on('submit', processForm);
});
