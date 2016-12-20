//global variables
var animalList=[];
var petLoaded=false;
var counter;

$(document).ready(function() {
   	//runs when a user submits a search
	$("#runSearch").on("click", function(e){
		e.preventDefault();
		//variabels for searchObj object
		var type = $("#type").val().trim();
		var age = $("#age").val().trim();
		var size = $("#size").val().trim();
		var gender = $("#gender").val().trim();
		
		//ajax call for given search inputs
		$.ajax({
	        type: "GET",
	        url: "/search/"+type+"/"+age+"/"+size+"/"+gender,
	    }).then(function(res){
	    	animalList=[];
	    	for(var i =0 ; i< res.length ; i++){
	    		animalList.push(res[i]);
	    	}
	    	//reset counter
	    	counter = 0;
	    	petCardCreator();
	    	petLoaded = true;
	    });
	});

	//clears users inputs
	$("#clearAll").on("click", function(e){
		e.preventDefault();
	});

	$(".arrow").on("click", function(e){
		e.preventDefault();
		if(counter < animalList.length){
			if(petLoaded){
				petCardCreator();
			}	
		} else{
			endOfList();
		}
		

	});




//update this to have card generator in a function since Im repeating the same code twice



});


function petCardCreator(){
	var petName = animalList[counter].pet_name;
	var petBreed = animalList[counter].pet_breed;
	var petAge = animalList[counter].pet_age;
	var petPhoto = animalList[counter].pet_photo;
	var petGender = animalList[counter].pet_gender;
	var petSize = animalList[counter].pet_size;
	//var petDesription = animalList[counter].pet_description;
	    	
	$(".card-title").html(petName);
	$("#petPhoto").attr("src", petPhoto);
	var cardDescription = $("<div>");
	//cardDescription.html(petDesription);
	cardDescription.append("<ul></ul>");
	cardDescription.find("ul").append("<li> &#9829 Breed: "+ petBreed + "</li>");
	cardDescription.find("ul").append("<li> &#9829 Age: "+ petAge + "</li>");
	cardDescription.find("ul").append("<li> &#9829 Gender: "+ petGender + "</li>");
	cardDescription.find("ul").append("<li> &#9829 Size: "+ petSize + "</li>");
	$(".card-content").html(cardDescription);
	counter++;
}

function endOfList(){
	var petName = "No More Pets!";
	//var petPhoto = animalList[counter].pet_photo;
	var petDesription = "Uh oh you have searched all available pets! Please refine your search and try again.";
	    	
	$(".card-title").html(petName);
	//$("#petPhoto").attr("src", petPhoto);
	var cardDescription = $("<div>");
	cardDescription.html(petDesription);
	$(".card-content").html(cardDescription);
	counter++;
}