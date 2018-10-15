// WITH CALLBACKS and AJAX:

// $(document).ready(function() {
//   //draw 1 card
//   $.get(
//     'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
//     resp => {
//       $.get(
//         `https://deckofcardsapi.com/api/deck/${resp.deck_id}/draw/?count=1`,
//         resp => {
//           console.log(resp.cards[0].value);
//           console.log(resp.cards[0].suit);
//         }
//       );
//     }
//   );

//   //draw 2 cards
//   $.get(
//     'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
//     resp => {
//       $.get(
//         `https://deckofcardsapi.com/api/deck/${resp.deck_id}/draw/?count=1`,
//         resp => {
//           let card1Val = resp.cards[0].value;
//           let card1Suit = resp.cards[0].suit;
//           $.get(
//             `https://deckofcardsapi.com/api/deck/${resp.deck_id}/draw/?count=1`,
//             resp => {
//               let card2Val = resp.cards[0].value;
//               let card2Suit = resp.cards[0].suit;
//               console.log(
//                 `Card1: ${card1Val}, ${card1Suit}. Card2: ${card2Val}, ${card2Suit}. `
//               );
//             }
//           );
//         }
//       );
//     }
//   );

//   //display card in DOM
//   let deckID = '';
//   $.get(
//     'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
//     resp => {
//       deckID = resp.deck_id;
//       $('#button-container').append(
//         `<button id="drawCard">Draw a card!</button>`
//       );
//       $('#drawCard').on('click', function() {
//         $.get(
//           `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`,
//           resp => {
//             $('#card-container').append(
//               `<img src="${resp.cards[0].image}"></img>`
//             );
//           }
//         );
//       });
//     }
//   );
// });

//WITH PROMISES

// $(document).ready(function() {
//   //draw 1 card and console.log
//   $.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(
//     resp => {
//       $.get(
//         `https://deckofcardsapi.com/api/deck/${resp.deck_id}/draw/?count=1`
//       ).then(resp => {
//         console.log(resp.cards[0].value);
//         console.log(resp.cards[0].suit);
//       });
//     }
//   );

//   //draw 2 cards and console.log
//   let deckID = -1;
//   let card1Val = 0;
//   let card1Suit = '';
//   let card2Val = 0;
//   let card2Suit = '';

//   $.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//     .then(resp => {
//       deckID = resp.deck_id;
//       return $.get(
//         `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
//       );
//     })
//     .then(resp => {
//       card1Val = resp.cards[0].value;
//       card1Suit = resp.cards[0].suit;
//       return $.get(
//         `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
//       );
//     })
//     .then(resp => {
//       card2Val = resp.cards[0].value;
//       card2Suit = resp.cards[0].suit;
//       console.log(
//         `Card1: ${card1Val}, ${card1Suit}. Card2: ${card2Val}, ${card2Suit}. `
//       );
//     });

//   //draw card and display in DOM
//   let domDeckID = -1;

//   $.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(
//     resp => {
//       deckID = resp.deck_id;
//       $('#button-container').append(
//         `<button id="drawCard">Draw a card!</button>`
//       );
//       $('#drawCard').on('click', function() {
//         $.get(
//           `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
//         ).then(resp => {
//           $('#card-container').append(
//             `<img src="${resp.cards[0].image}"></img>`
//           );
//         });
//       });
//     }
//   );
// });

//WITH ASYNC AND AWAIT

//log one card
async function logOneCard() {
  let deck_resp = await $.get(
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  );
  let deck_id = deck_resp.deck_id;
  let card = await $.get(
    `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
  );
  console.log(card.cards[0].value);
  console.log(card.cards[0].suit);
}

//log 2 cards
async function logTwoCards() {
  let deck_resp = await $.get(
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  );
  let deck_id = deck_resp.deck_id;
  let card = await $.get(
    `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
  );
  let card2 = await $.get(
    `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
  );
  console.log(card.cards[0].value);
  console.log(card.cards[0].suit);
  console.log(card2.cards[0].value);
  console.log(card2.cards[0].suit);
}

//draw card in DOM
async function drawCard() {
  let deck_resp = await $.get(
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  );
  let deck_id = deck_resp.deck_id;

  $('#button-container').append(`<button id="drawCard">Draw a card!</button>`);
  $('#drawCard').on('click', async function() {
    let card = await $.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );
    $('#card-container').append(`<img src="${card.cards[0].image}"></img>`);
  });
}

$(document).ready(function() {
  logOneCard();
  logTwoCards();
  drawCard();
});
