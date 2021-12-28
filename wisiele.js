
// tablica z hasłami
var words;
words = ['mucha', 'krowa', 'pies', 'krokodyl', 'osioł', 'tygrys', 'wielbłąd', 'kaczka', 'motyl', 'małpa',
	'bawół', 'orzeł', 'sarna', 'kogut', 'pawian', 'koza', 'antylopa', 'alpaka', 'zebra', 'żubr'];


//zmienne globalne
var wordNumber;
var picture = document.getElementById('foto');
var notgood=0;
var good=0;



// funkcja generująca losowa liczbę
function randomNumber(max){
    var max = parseInt(max, 10);
    return Math.floor(Math.random()*max);
}

// funkcja opracowująca odpowiednia ilość podkreślników
function Underlines() {
	var msg = "";
	var el = document.getElementById('word');
	var numberOfLetters = words[wordNumber].length;

	for (var i =0; i < numberOfLetters; i++) {
	msg = msg + "_ ";
	}
	el.innerHTML = msg; 
}


// Tablica z buttonami
var button = document.getElementsByTagName('button');

// obserwator zdażeń do buttonów
for (var i = 0; i < button.length ; i++) {
	if (button.item(i).id != 'random') 		 
		button.item(i).addEventListener('click', function CheckTheLetter2(msg) { CheckTheLetter(msg); } , false);
	
}


String.prototype.changeLetter = function(place, letter) {
	if (place>this.length-1)return this.toString();
	else return this.substr(0, place) + letter +this.substr(place+1);
}

// funkcja sprawdzająca literki
function CheckTheLetter(msg) {

	var letter = (msg.target.textContent.toLowerCase());
	var numberOfLetters = words[wordNumber].length;
	var bylaLiterka=0;
	var LETTER = letter.toUpperCase();
	var j;

		for (var i =0; i < numberOfLetters ; i++) {
			
			if (words[wordNumber].charAt(i)==letter ) {
				
			 	// console.log(LETTER + i);//wypisuje do konsoli literke i jej pozycje
			
				j=2*i;//dla ominięcia spacji
				document.getElementById('word').innerHTML = document.getElementById('word').innerHTML.changeLetter(j,LETTER);
				bylaLiterka +=1;
			}
		}
			if(bylaLiterka==0) {
				notgood += 1;

				if(notgood==14){
					showMeUnderlines();
				}
			}
//tu liczy liczbe trafien i sprawdza czy zgadnieto juz całość
			for(var z =0; z<bylaLiterka; z++) {
				good+=1;

				if(good==numberOfLetters){
					console.log(good);
					console.log("koniec");
					// document.write("KONIEC")
					picture.src='img/wisielecwygrana.png';
					buttonRandom.classList.remove('invisible');

					}
				
			}



// tu dorysowuje kawałki trupka		
			if(good!=numberOfLetters){
			picture.src= 'img/wisielec'+notgood+'.png';
			// var buttonRandom = document.getElementById('random');
			buttonRandom.classList.add('invisible');
			}

		msg.target.disabled=true; 
		
} 

// funkcja losująca hasło z tablicy i wywołująca jego podkreslniki
function showMeUnderlines() {
	 wordNumber = (randomNumber(words.length)); //words.length to nasz max
	 notgood=0;
	 good=0;
	 Underlines();
	 console.log(words[wordNumber]); //wypisuje w konsoli słowo
	 
	 //pokazuje przyciski po wyszukaniu nowego hasła
	 for (var i=0; i< button.length; i++) {
	 	button.item(i).disabled=false;

	 }


	 picture.src = 'img/wisielec0.png';//pokazuje instrukcje

}



// wywołanie funkcji podkreślników przy odświeżeniu strony
showMeUnderlines();

// wywołanie funkcji podkreślników przy kliknięciu buttona
var buttonRandom = document.getElementById('random');
buttonRandom.onclick = showMeUnderlines;




